import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable';
import stylesCommon from '../components/stylesCommon'
import { useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';
import ListAnuncio from './ListAnuncio'


const MeusAnunciosScreen = ({ navigation }) => {
    const { user, _showAlert } = useAuth();
    const [anuncio, setAnuncio] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        getMeusAnuncios();
    }, [])

    const onRefresh = useCallback(() => {
        console.log('entrou onRefresh **********')
        setRefreshing(true);
        getMeusAnuncios();
    }, []);

    const getMeusAnuncios = async () => {
        try {
            console.log("chamndo api anuncios por user: " , user.id)
            const response = await apiAnuncio.get(`/anuncios/user/${user.id}`)
            setAnuncio(response.data)
            setRefreshing(false)
        } catch (error) {
            console.error('Erro na chamada da api listbyuser: ', error)
            _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
            setRefreshing(false)
        }
    }

    function onClick(item) {
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
                    anuncios={anuncio}
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
