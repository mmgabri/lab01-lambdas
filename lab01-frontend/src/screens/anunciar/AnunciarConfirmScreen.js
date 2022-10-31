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
import { formatvalorNumeric } from '../../services/utils';

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

        const formdata = new FormData();

        console.log("imagens-lenght:" , anuncio.imagens.length)
        if (anuncio.imagens.length > 0 && anuncio.imagens[0].uri) {
            console.log("Há files", anuncio.imagens)
            anuncio.imagens.forEach(imagem =>
                formdata.append('file', imagem)
            );
            anuncio.imagens = [] 
        }
       

        let anuncioObj = {
            id: anuncio.id,
            userId: user.id,
            tipo: anuncio.tipo,
            categoria: anuncio.categoria,
            status: 'ATIVO',
            titulo: anuncio.titulo,
            descricao: anuncio.descricao,
            cep: anuncio.cep,
            valor: formatvalorNumeric(anuncio.valor),
          valor: 0,
            imagens: anuncio.imagens
        }

        formdata.append('anuncio', JSON.stringify(anuncioObj))
        
        setIsLoading(true);

        if (isUpdating) {
            console.log('Update Anuncio', formdata)
            apiAnuncio.put('', formdata)
                .then((response) => {
                    console.info("Anuncio atualizado com sucesso", response.data)
                    setIsLoading(false);
                    _showAlert('success', "Obaa", 'Anúncio alterado com sucesso!', 3000);
                    navigation.dispatch(CommonActions.reset({
                        index: 1, routes: [
                            { name: 'MeusAnuncios' },
                            { name: 'MeusAnuncios' },
                        ],
                    }));
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Erro ao atualizar anuncio:', error)
                    _showAlert('danger', 'Ooops!', "Algo deu errado.", 7000);
                });
        } else {
            console.log('Create Anuncio', formdata)
            apiAnuncio.post('', formdata)
                .then((response) => {
                    console.info("Anuncio publicado com sucesso", response.data)
                    setIsLoading(false);
                    _showAlert('success', "Obaa", 'Anúncio publicado com sucesso!', 3000);
                    navigation.dispatch(CommonActions.reset({
                        index: 1, routes: [
                            { name: 'Anunciar' },
                            { name: 'MeusAnuncios' },
                        ],
                    }));
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Erro ao criar anuncio:', error)
                    _showAlert('danger', 'Ooops!', "Algo deu errado.", 7000);
                });
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
}

export default AnunciarConfirmScreen;