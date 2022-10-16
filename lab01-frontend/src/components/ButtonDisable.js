import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import stylesCommon from './stylesCommon';

const ButtonDisable = ({ anuncio, text, onClick, top }) => {

    return (
        <View style={[stylesCommon.button, {marginTop: top}]} >
            <TouchableOpacity
                style={stylesCommon.button_styte}
                onPress={() => { onClick(anuncio) }}
            >
                <LinearGradient
                    colors={['#86d6cc', '#86d6cc']}
                    style={stylesCommon.button_styte}
                >
                    <Text style={[stylesCommon.button_text, {
                        color: '#fff'
                    }]}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonDisable;