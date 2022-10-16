import React, { useState } from 'react';
import { View, Alert, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Button from '../components/Button';
import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';


import stylesCommon from '../components/stylesCommon';
import ItemAnuncio from './ItemAnuncioScreen';

const AnuncioScreen = ({ route, navigation }) => {
    const { user, _showAlert, setLoading } = useAuth();
    const { anuncio } = route.params;
    const { routeMeusAnuncios } = route.params;
    const { colors } = useTheme();

    const sendMessage = () => {
        navigation.navigate('Chat', { anuncio: anuncio, routeChats: false } )
    }

    function editarAnuncio(anuncio) {
        navigation.navigate('AnunciarTitulo', { anuncio: anuncio, })
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
        console.log('deleteItem')

        setLoading(true);

        apiAnuncio.delete(`/anuncios/${anuncio.id}`)
            .then((response) => {
                console.log('Retorno api delete:', response)
                _showAlert('success', 'Anúncio excluido com sucesso', '', 3000);
                setLoading(false);
                navigation.dispatch(CommonActions.reset({
                    index: 0, routes: [
                        { name: 'MeusAnuncios' }
                    ],
                }));
            })
            .catch((error) => {
                _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                setLoading(false);
            });
    }


    const encerrarAnuncio = () => {
        console.log('encerrar')

    }

    return (
        <View style={stylesCommon.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <ScrollView>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[stylesCommon.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <ItemAnuncio anuncio={anuncio} />

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