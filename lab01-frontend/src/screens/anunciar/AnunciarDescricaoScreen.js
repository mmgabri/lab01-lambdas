import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Button from '../../components/Button';
import ButtonDisable from '../../components/ButtonDisable';
import FieldForm from '../../components/FieldForm';
import stylesCommon from '../../components/stylesCommon'

const AnunciarDescricaoScreen = ({ route, navigation }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const [isMessageWarning, setIsMessageWarning] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const { anuncio } = route.params;
    const { colors } = useTheme();

    const handleInputChange = (val) => {
        setInput(val);
        setIsMessageWarning(false)
        if (val.length > 1) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }

    const continuar = () => {
        console.log("continuar")

        anuncio.descricao = input;

        console.log(anuncio)

        if (input.length > 1) {
            navigation.navigate('AnunciarCategoria', { anuncio: anuncio, });
        } else {
            setIsMessageWarning(true)
        }
    }

    useEffect(() => {
        setInput(anuncio.descricao)
        if (anuncio.id) {
            setIsMessageWarning(false)
            setEnableButton(true)
        }
    }, [])

    return (

        <View style={stylesCommon.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                animation="fadeInUpBig"
                style={[stylesCommon.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <FieldForm
                    text={'Conte mais sobre o seu anúncio'}
                    onFocus={() => { setIsFocused(true) }}
                    isFocused={isFocused}
                    placeholder={'digite aqui'}
                    multiline={true}
                    numberOfLines={5}
                    value={input}
                    onChangeText={handleInputChange}
                />
                {isMessageWarning ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={stylesCommon.errorMsg}>entre 20 e 140 caracteres</Text>
                    </Animatable.View>
                    :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={stylesCommon.infoMsg}>entre 20 e 140 caracteres</Text>
                    </Animatable.View>
                }

                {enableButton ?
                    <Button
                        text={'Continuar'}
                        onClick={continuar}
                        top={45}
                    />
                    :
                    <ButtonDisable
                        text={'Continuar'}
                        onClick={continuar}
                        top={45}
                    />
                }

            </Animatable.View>
        </View>
    );
};

export default AnunciarDescricaoScreen;