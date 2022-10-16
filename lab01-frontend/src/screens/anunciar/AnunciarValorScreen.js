import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

import { formatValor } from '../../services/utils';
import stylesCommon from '../../components/stylesCommon'
import Button from '../../components/Button';
import ButtonDisable from '../../components/ButtonDisable';

const AnunciarValorScreen = ({ route, navigation }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const [isMessageWarning, setIsMessageWarning] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const { anuncio } = route.params;

    const { colors } = useTheme();

    useEffect(() => {
        if (anuncio.id) {
            var val = formatValor(anuncio.valor)
            console.log(val)
            setInput(val)
            setIsMessageWarning(false)
            setEnableButton(true)
        }
    }, [])

    const handleInputChange = (val) => {
        setInput(val);
        setIsMessageWarning(false)

        if (val.length > 0) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }

    const continuar = () => {
        console.log("continuar")
        anuncio.valor = input;

        console.log(input.length)
        console.log(anuncio.id)

        if (input.length > 0 || anuncio.id) {
            navigation.navigate('AnunciarCep', { anuncio: anuncio, });
        } else {
            setIsMessageWarning(true)
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
                }]}>Qual valor pretende vender?</Text>

                <View style={stylesCommon.action}>
                    <TextInputMask
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                        keyboardType="numeric"
                        onFocus={() => setIsFocused(true)}
                        selectionColor="#009387"
                        underlineColorAndroid={isFocused ? "#009387" : "#D3D3D3"}
                        placeholder="digite aqui"
                        placeholderTextColor="#666666"
                        style={[stylesCommon.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        value={input}
                        onChangeText={(val) => handleInputChange(val)}
                    />
                </View>

                {isMessageWarning &&
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={stylesCommon.errorMsg}>digite um valor válido</Text>
                    </Animatable.View>
                }

                {enableButton ?
                    <Button
                        text={'Continuar'}
                        onClick={continuar}
                        top={40}
                    />
                    :
                    <ButtonDisable
                        text={'Continuar'}
                        onClick={continuar}
                        top={40}
                    />
                }

            </Animatable.View>
        </View>
    );
};

export default AnunciarValorScreen;