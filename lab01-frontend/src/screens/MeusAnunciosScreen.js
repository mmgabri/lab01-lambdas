import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable';
import stylesCommon from '../components/stylesCommon'
import { useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';
import { decodeMessage } from '../services/decodeMessage'
import ListAnuncio from './ListAnuncio'

const MeusAnunciosScreen = ({ navigation }) => {
    const { user, _showAlert } = useAuth();
    const [anuncios, setAnuncios] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const { colors } = useTheme();
    const [load,setLoad] = useState(true)

    useEffect(() => {
        navigation.addListener('focus', ()=>setLoad(!load))
        getMeusAnuncios();
    }, [load, navigation])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getMeusAnuncios();
    }, []);

    function onError(error) {
        console.log("onError")
        const statusCode = error.response?.status;

        if (statusCode == 401) {
            _showAlert('info', 'Ooops!', decodeMessage(statusCode), 4000);
            navigation.navigate('SignInTab')
        }
        _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 7000);
    }

    const getMeusAnuncios = async () => {
        try {
            console.log("chamndo api anuncios por user: ", user.id)
            const response = await apiAnuncio.get(`/user/${user.id}`)
            console.info("Retorno da api listbyuser com sucesso:", response.data)
            setAnuncios(response.data)
            setRefreshing(false)
        } catch (error) {
            console.error('Erro na chamada da api listbyuser: ', error)
            onError(error)
            setRefreshing(false)
        }
    }

    function onClick(item) {
        console.log('--- onClick ---', item)
        navigation.navigate('Anuncio', { anuncio: item, routeMeusAnuncios: true });
    }

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                animation="fadeInUpBig"
                style={[stylesCommon.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ListAnuncio
                    anuncios={anuncios}
                    routeMeusAnuncios={true}
                    onClick={onClick}
                    onRefresh={onRefresh}
                    refreshing={refreshing} />
            </Animatable.View>
        </View>
    );
};

export default MeusAnunciosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F8',
        margin: -10
    },
    text: {
        marginTop: 20,
        margin: 20
    },
});
