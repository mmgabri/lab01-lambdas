import React, { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { View, Text, StatusBar, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import stylesCommon from '../../components/stylesCommon'
import Button from '../../components/Button';
import ButtonTransparent from '../../components/ButtonTransparent';

const width = Dimensions.get('window').width * 0.9;

const AnunciarImagensScreen = ({ route, navigation }) => {
    const [imagens, setImagens] = useState([]);
    const { colors } = useTheme();
    const { anuncio } = route.params;

    useEffect(() => {
        if (anuncio.id) {
            setImagens(anuncio.imagens)
        }
    }, [])

    const continuar = () => {
        anuncio.imagens = imagens;
        navigation.navigate('AnunciarConfirm', { anuncio: anuncio, });
    }

    const onHadleSelectImageCamera = () => {
        cleanPicker();

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(res => {
            let source = [];
            source.push({
                uri: res.path,
                type: res.mime,
                name: uuid.v4()
            })
            setImagens(source);
        })
    }

    const onHadleSelectImage = () => {

        cleanPicker();

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true,
            includeBase64: true,
        }).then(res => {
            let source = [];
            res.map(data => source.push({
                uri: data.path,
                type: data.mime,
                name: uuid.v4()
            }));
            setImagens(source);
        })
    }

    const cleanPicker = () => {
        setImagens([]);
        ImagePicker.clean()
            .then(() => {
            }).catch(error => {
                console.error("cleanPicker:", error)
            });
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
                <ScrollView>
                    {imagens.length == 0 &&
                        <Text style={[stylesCommon.text_footer, {
                            color: colors.text
                        }]}>Você tem imagens do anúncio?</Text>}

                    <View style={styles.imageViewContainer}>
                        <SliderBox resizeMethod={'resize'}
                            images={imagens}
                            parentWidth={width}
                            ImageComponentStyle={{ height: 270, width: width }} />
                    </View>

                    <ButtonTransparent
                        text={'Escolher na galeria'}
                        onClick={onHadleSelectImage}
                        top={20}
                    />

                    <ButtonTransparent
                        text={'Tirar uma foto'}
                        onClick={onHadleSelectImageCamera}
                        top={10}
                    />

                    <Button
                        text={'Continuar'}
                        onClick={continuar}
                        top={20}
                    />
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AnunciarImagensScreen;

const styles = StyleSheet.create({
    imageViewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})