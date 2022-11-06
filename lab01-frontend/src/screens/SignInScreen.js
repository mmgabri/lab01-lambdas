import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
import ButtonTransparent from '../components/ButtonTransparent';
import FieldFormWithIcon from '../components/FieldFormWithIcon'
import FieldFormWithIcon2 from '../components/FieldFormWithIcon2'
import { useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/auth';

const SignInScreen = ({ navigation }) => {
  const { signIn, _showAlert } = useAuth();
  const [showMessageErrorEmail, setShowMessageErrorEmail] = useState(false);
  const [showMessageErrorPassword, setShowMessageErrorPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { colors } = useTheme();

  const validateEmail = (emailInp) => {
    let email = emailInp.trim()

    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test(String(email).toLowerCase())
  }

  const handleEmailChange = (val) => {
    setShowMessageErrorEmail(false);
    const emailIsValid = validateEmail(val);
    if (emailIsValid) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  }

  const handlePasswordChange = (val) => {
    setShowMessageErrorPassword(false);
    setData({
      ...data,
      password: val,
      isValidPassword: true
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidEmail = (val) => {
    const emailIsValid = validateEmail(val);
    if (emailIsValid) {
      setData({
        ...data,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        isValidEmail: false
      });
    }
  }

  function signInHandle() {

    console.log("signInHandle")

    const emailIsValid = validateEmail(data.email);

    if (!emailIsValid) {
      setShowMessageErrorEmail(true);
    }

    if (data.password.length == 0) {
      setShowMessageErrorPassword(true);
    }

    if (emailIsValid && data.password) {
      let emailLowerCase = data.email.toLowerCase();
      let email = emailLowerCase.trim()
      signIn(email, data.password)
      console.log("lOGIN CONCLUIDO")
    }
  }

  const criarConta = () => {

    console.log("- Criar conta -")
    navigation.navigate('SignUp')

  }

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >

        <FieldFormWithIcon
          text={'Email'}
          placeholder={'seu email'}
          icon='user-o'
          onChangeText={handleEmailChange}
          check_text={data.check_textInputChange}
          top={0}
          onEndEditing={handleValidEmail}
        />
        {showMessageErrorEmail &&
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email invalido.</Text>
          </Animatable.View>
        }

        <FieldFormWithIcon2
          text={'Senha'}
          placeholder={'sua senha'}
          icon='lock'
          onChangeText={handlePasswordChange}
          check_text={data.secureTextEntry}
          top={35}
          onClick={updateSecureTextEntry}
        />
        {showMessageErrorPassword &&
          <Animatable.View animation="fadeInLeft" duration={5}>
            <Text style={styles.errorMsg}>Informe sua senha.</Text>
          </Animatable.View>
        }

        <View style={{ marginTop: 15 }}>
          <TouchableOpacity>
            <Text style={{ color: '#009387', marginTop: 15 }}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <Button
          text={'Login'}
          onClick={signInHandle}
          top={-35}
        />

        <ButtonTransparent
          text={'Criar conta'}
          onClick={criarConta}
          top={15}
        />

      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});