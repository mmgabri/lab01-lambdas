import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import stylesCommon from '../components/stylesCommon'
import { apiAnuncio } from '../services/api';
import { useAuth } from '../contexts/auth';
import ListAnuncio from './ListAnuncio'

const HomeScreen = ({ navigation }) => {
  const { _showAlert } = useAuth();
  const [anuncio, setAnuncio] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    getAnuncios();
  }, [])

  const onRefresh = useCallback(() => {
    console.log('entrou onRefresh **********')
    setRefreshing(true);
    getAnuncios();
  }, []);

  function onClick(item) {
    navigation.navigate('Anuncio', { anuncio: item, routeMeusAnuncios: false });
  }

  async function getAnuncios() {
    console.log('--obtem anuncios--')
    apiAnuncio.get('')
      .then((response) => {
        console.log("Response:" , response.data)
        setAnuncio(response.data)
        setRefreshing(false)
      })
      .catch((error) => {
        setRefreshing(false)
        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
      });
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
          onClick={onClick}
          onRefresh={onRefresh}
          refreshing={refreshing}>
        </ListAnuncio>

      </Animatable.View>

    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
    margin: -10
  },
});
