import React, { useState } from 'react';
import { View, Alert, StatusBar, ScrollView  } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AwesomeLoading from 'react-native-awesome-loading';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Button from '../components/Button';
import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';
import { decodeMessage } from '../services/decodeMessage'


import stylesCommon from '../components/stylesCommon';
import ItemAnuncio from './ItemAnuncioScreen';

const AnuncioScreen = ({ route, navigation }) => {
    const { user, _showAlert } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { anuncio } = route.params;
    const { routeMeusAnuncios } = route.params;
    const { colors } = useTheme();

    console.log('AnuncioScreen - ANUNCIO:', anuncio)

    function onError(error) {
        console.log("onError")
        const statusCode = error.response?.status;

        if (statusCode == 401) {
            _showAlert('info', 'Ooops!', decodeMessage(statusCode), 4000);
            navigation.dispatch(CommonActions.reset({
                index: 1, routes: [
                    { name: 'Home' },
                    { name: 'SignInTab' },
                ],
            }));
        }
        _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 7000);
    }

    const sendMessage = () => {
        navigation.navigate('Chat', { anuncio: anuncio, routeChats: false })
    }

    function editarAnuncio(anuncio) {
        navigation.navigate('AnunciarTitulo', { anuncio: anuncio, routeMeusAnuncios: true})
    }

    function excluirAnuncio(anuncio) {
        console.log('excluir - ', anuncio)

        Alert.alert(
            "Confirma esclusão ?", "",
            [
                {
                    text: "Sim",
                    onPress: () => excluirAnuncioConfirm(anuncio),
                    style: "cancel"
                },
                {
                    text: "Não"
                }
            ],
            { cancelable: false }
        );
    }

    function excluirAnuncioConfirm(anuncio) {
        setIsLoading(true);

        apiAnuncio.delete('', { data: anuncio })
            .then((response) => {
                console.info('Retorno api delete:', response)
                _showAlert('success', 'Anúncio excluido com sucesso', '', 3000);
                setIsLoading(false);
                //navigation.popToTop()
                navigation.navigate('MeusAnuncios')
            })
            .catch((error) => {
                console.error("Erro na api delete: ", error)
                onError(error)
                setIsLoading(false);
            });
    }


    const encerrarAnuncio = () => {
        console.log('encerrar')

    }

    return (


        isLoading ?
            < View >
                <AwesomeLoading indicatorId={8} size={50} isActive={true} text="" />
            </View >

            :
            <View style={stylesCommon.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <ScrollView>
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={[stylesCommon.footer, {
                            backgroundColor: colors.background
                        }]}
                    >
                        <ItemAnuncio anuncio={anuncio} images={anuncio.imagens} />

                        {anuncio.userId != user.id &&
                            <Button
                                anuncio={anuncio}
                                text={'Enviar mensagem ao anunciante'}
                                onClick={sendMessage}
                                top={20}
                            />}
                        {routeMeusAnuncios &&
                            <View>
                                <Button
                                    anuncio={anuncio}
                                    text={'Encerrar'}
                                    onClick={encerrarAnuncio}
                                    top={20}
                                />
                                <Button
                                    anuncio={anuncio}
                                    text={'Editar'}
                                    onClick={editarAnuncio}
                                    top={10}
                                />
                                <Button
                                    anuncio={anuncio}
                                    text={'Excluir'}
                                    onClick={excluirAnuncio}
                                    top={10}
                                />
                            </View>}

                    </Animatable.View>
                </ScrollView>
            </View>
    )
};

export default AnuncioScreen;