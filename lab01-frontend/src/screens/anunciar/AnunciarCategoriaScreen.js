import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../../components/stylesCommon'
import ButtonTransparent from '../../components/ButtonTransparent';

const AnunciarCategoriaScreen = ({ route, navigation }) => {
    const { anuncio } = route.params;
    const { colors } = useTheme();

    const continuar = (val) => {
        console.log("continuar:", val)
        anuncio.categoria = val;
        navigation.navigate('AnunciarTipo', { anuncio: anuncio, });
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
                }]}>Qual a categoria do seu anúncio?</Text>

                <ButtonTransparent
                    text={'Uniforme'}
                    onClick={continuar}
                    top={30}
                    value='UNIFORME'
                />

                <ButtonTransparent
                    text={'Livro'}
                    onClick={continuar}
                    top={10}
                    value='LIVRO'
                />

                <ButtonTransparent
                    text={'Material escolar'}
                    onClick={continuar}
                    top={10}
                    value='MATERIAL_ESCOLAR'
                />


            </Animatable.View>
        </View>
    );
};

export default AnunciarCategoriaScreen;