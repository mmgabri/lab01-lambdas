import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import AwesomeLoading from 'react-native-awesome-loading';

import { useAuth } from '../../contexts/auth';
import { apiAnuncio } from '../../services/api';
import stylesCommon from '../../components/stylesCommon'
import ItemAnuncio from '../ItemAnuncioScreen';
import Button from '../../components/Button';
import ButtonTransparent from '../../components/ButtonTransparent';

const AnunciarConfirmScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUPudating] = useState(false);
    const { user, _showAlert } = useAuth();
    const { anuncio } = route.params;
    const { colors } = useTheme();

    useEffect(() => {
        console.log('---- useEffect - confirm ----')

        if (anuncio.id) {
            setIsUPudating(true)
        }

    }, [])

    const publicarAnuncio = async () => {
        setIsLoading(true);

        const formdata = new FormData();
        formdata.append("id", anuncio.id)
        formdata.append("userId", user.id)
        formdata.append("tipo", anuncio.tipo)
        formdata.append("categoria", anuncio.categoria)
        formdata.append("status", 'ATIVO')
        formdata.append("titulo", anuncio.titulo)
        formdata.append("descricao", anuncio.descricao)
        formdata.append("cep", anuncio.cep)
        anuncio.imagens.forEach(imagem =>
            formdata.append('file', imagem)
        );

        anuncio.userId = user.id;

        if (anuncio.valor == 0) {
            formdata.append("valor", anuncio.valor)
        } else {
            anuncio.valor = anuncio.valor.replace(/[^0-9,]*/g, '').replace(',', '.')
            formdata.append("valor", anuncio.valor.replace(/[^0-9,]*/g, '').replace(',', '.'))
        }

        if (isUpdating) {
            if (anuncio.imagens.length > 0 && anuncio.imagens[0].uri) {
                apiAnuncio.put('/anuncios/with-image', formdata)
                    .then((response) => {
                        setIsLoading(false);
                        _showAlert('success', 'Anúncio alterado com sucesso!', '', 3000);
                        navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [
                                { name: 'MeusAnuncios' },
                                { name: 'MeusAnuncios' },
                            ],
                        }));
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.error('Erro na api anuncio/create/with/image:', error)
                        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                    });
            } else {
                apiAnuncio.put('/anuncios/without-image', anuncio)
                    .then((response) => {
                        setIsLoading(false);
                        _showAlert('success', 'Anúncio alterado com sucesso!', '', 3000);
                        navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [
                                { name: 'MeusAnuncios' },
                                { name: 'MeusAnuncios' },
                            ],
                        }));
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.error('Erro na api anuncio/create/without/image:', error)
                        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                    });
            }
        } else {
            if (anuncio.imagens.length > 0 && anuncio.imagens[0].uri) {
                console.log('Criando no anuncio com imagem:', formdata)
                console.log('anuncio.imagens.length:', anuncio.imagens.length)
                console.log('anuncio.imagens[0].uri:', anuncio.imagens[0].uri)
                console.log('Chamando api com imagem...')
                apiAnuncio.post('/anuncios', formdata)
                    .then((response) => {
                        console.log('==========> 001')
                        setIsLoading(false);
                        _showAlert('success', 'Anúncio publicado com sucesso!', '', 3000);
                        navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [
                                { name: 'Anunciar' },
                                { name: 'MeusAnuncios' },
                            ],
                        }));
                    })
                    .catch((error) => {
                        console.log('==========> 002')
                        setIsLoading(false);
                        console.error('Erro na api anuncio/create/with/image:', error)
                        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                    });
            } else {
                console.log('Criando no anuncio sem imagem:', anuncio)
                apiAnuncio.post('/anuncios/without-image', anuncio)
                    .then((response) => {
                        console.log('==========> 003')
                        setIsLoading(false);
                        _showAlert('success', 'Anúncio publicado com sucesso!', '', 3000);
                        navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [
                                { name: 'Anunciar' },
                                { name: 'MeusAnuncios' },
                            ],
                        }));
                    })
                    .catch((error) => {
                        console.log('==========> 004')
                        setIsLoading(false);
                        console.error('Erro na api anuncio/create/without/image:', error)
                        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                    });
            }
        }
    }


    return (

        isLoading ?
            < View >
                <AwesomeLoading indicatorId={11} size={80} isActive={true} text="" />
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
                        <Text style={[stylesCommon.text_footer, {
                            color: colors.text
                        }]}>Confirme os dados do seu anúncio</Text>

                        <ItemAnuncio anuncio={anuncio} />

                        {
                            isUpdating ?
                                <Button
                                    text={'Alterar'}
                                    onClick={publicarAnuncio}
                                    top={40}
                                />
                                :
                                <Button
                                    text={'Publicar'}
                                    onClick={publicarAnuncio}
                                    top={40}
                                />
                        }
                        <ButtonTransparent
                            text={'Cancelar'}
                            onClick={() => navigation.push('Home')}
                            top={10}
                        />

                    </Animatable.View>

                </ScrollView>
            </View>
    )
};

export default AnunciarConfirmScreen;