import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../../components/stylesCommon'
import ButtonTransparent from '../../components/ButtonTransparent';

const AnunciarTipoScreen = ({ route, navigation }) => {
    const { anuncio } = route.params;
    const { colors } = useTheme();

    const continuar = (val) => {
        console.log("continuar:", val)
        anuncio.tipo = val;
        console.log(anuncio.tipo)
        if (anuncio.tipo == 'VENDA') {
            navigation.navigate('AnunciarValor', { anuncio: anuncio, });
        } else {
            anuncio.valor = 0;
            navigation.navigate('AnunciarCep', { anuncio: anuncio, });
        }
    }

    return (

        <View style={stylesCommon.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                animation="fadeInUpBig"
                style={[stylesCommon.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[stylesCommon.text_footer, {
                    color: colors.text
                }]}>Qual a finalidade do seu anúncio?</Text>

                <ButtonTransparent
                    text={'Venda'}
                    onClick={continuar}
                    top={30}
                    value='VENDA'
                />

                <ButtonTransparent
                    text={'Doação'}
                    onClick={continuar}
                    top={10}
                    value='DOACAO'
                />

            </Animatable.View>
        </View>
    );
};

export default AnunciarTipoScreen;