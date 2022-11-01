import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, } from 'react-native'; import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../contexts/auth';
import Button from '../../components/Button';
import { decodeMessage } from '../../services/decodeMessage'

const AnunciarScreen = ({ navigation }) => {
  const [anuncio, setAnuncio] = useState('');
  const [load, setLoad] = useState(true)
  const { colors } = useTheme();
  const { user, isAuthenticated, _showAlert } = useAuth();

  useEffect(() => {

    navigation.addListener('focus', () => setLoad(!load))

    console.log("user:", isAuthenticated)

    if (!isAuthenticated) {
      _showAlert('info', 'Ooops!', decodeMessage(401), 4000);
      navigation.navigate('SignInTab')
    }

    
    var anuncioObject = {
      id: null,
      titulo: '',
      descricao: '',
      tipo: '',
      categoria: '',
      valor: 0,
      cep: '',
      userId: user.id,
      imagens: [],
      imagensAdvice: []
    }


    setAnuncio(anuncioObject)

  }, [load, navigation])

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Nós temos um passo a passo bem rápido e fácil para cadastrar o seu anúncio.</Text>
        <View style={styles.action}>
        </View>

        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Vamos começar ?</Text>
        <View style={styles.action}>
        </View>

        <Button
          text={'Iniciar'}
          onClick={() => navigation.navigate('AnunciarTitulo', { anuncio: anuncio, })}
          top={30}
        />
      </Animatable.View>
    </View>
  );
};

export default AnunciarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
});
