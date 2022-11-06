import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, ScrollView, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Button from '../components/Button';
import FieldFormWithIcon from '../components/FieldFormWithIcon'
import FieldFormWithIcon2 from '../components/FieldFormWithIcon2'


import { useAuth } from '../contexts/auth';

const SignUpScreen = () => {
  const { signUp } = useAuth();
  const [showMessageErrorName, setShowMessageErrorName] = useState(false);
  const [showMessageErrorEmail, setShowMessageErrorEmail] = useState(false);
  const [showMessageErrorPassword1, setShowMessageErrorPassword1] = useState(false);
  const [showMessageErrorPassword2, setShowMessageErrorPassword2] = useState(false);
  const [showMessageErrorPasswordConfirm, setShowMessageErrorPasswordConfirm] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    check_textInputNameChange: false,
    check_textInputEmailChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputNameChange = (val) => {
    setShowMessageErrorName(false);
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputNameChange: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputNameChange: false
      });
    }
  }

  const textInputEmailChange = (val) => {
    setShowMessageErrorEmail(false);
    const emailIsValid = validateEmail(val);
    if (val.length !== 0 & emailIsValid) {
      setData({
        ...data,
        email: val,
        check_textInputEmailChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputEmailChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setShowMessageErrorPassword1(false);
    setShowMessageErrorPassword2(false);
    setData({
      ...data,
      password: val
    });
  }

  const handleConfirmPasswordChange = (val) => {
    setShowMessageErrorPasswordConfirm(false);
    setData({
      ...data,
      confirm_password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  }

  const validateEmail = (emailInp) => {
    let email = emailInp.trim()

    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase())
  }

  const signUpHandle = () => {
    const emailIsValid = validateEmail(data.email);

    if (!emailIsValid) {
      setShowMessageErrorEmail(true);
    }

    if (data.username.length == 0) {
      setShowMessageErrorName(true);
    }

    if (data.password.length == 0) {
      setShowMessageErrorPassword1(true);
    } else {
      if (data.password.length < 8) {
        setShowMessageErrorPassword2(true);
      }
    }


    if (data.confirm_password != data.password) {
      setShowMessageErrorPasswordConfirm(true);
    }

    if (data.username && emailIsValid && data.password && data.confirm_password && data.confirm_password == data.password) {
      let emailLowerCase = data.email.toLowerCase();
      let email = emailLowerCase.trim()
      signUp(email, data.password, data.username)
    }
  }

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <FieldFormWithIcon
            text={'Nome'}
            placeholder={'seu nome'}
            icon='user-o'
            onChangeText={textInputNameChange}
            check_text={data.check_textInputNameChange}
            top={0}
            onEndEditing={() => {}}
          />
          {showMessageErrorName &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Digite seu nome.</Text>
            </Animatable.View>
          }

          <FieldFormWithIcon 
            text={'Email'}
            placeholder={'seu email'}
            icon='at'
            onChangeText={textInputEmailChange}
            check_text={data.check_textInputEmailChange}
            top={35}
            onEndEditing={() => {}}
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
          {showMessageErrorPassword1 &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Digite uma senha.</Text>
            </Animatable.View>
          }
          {showMessageErrorPassword2 &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>A senha deve ter 8 digitos ou mais</Text>
            </Animatable.View>
          }

          <FieldFormWithIcon2
            text={'Confirme sua senha'}
            placeholder={'sua senha'}
            icon='lock'
            onChangeText={handleConfirmPasswordChange}
            check_text={data.confirm_secureTextEntry}
            top={35}
            onClick={updateConfirmSecureTextEntry}
          />

          {showMessageErrorPasswordConfirm &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Senhas não conferem.</Text>
            </Animatable.View>
          }

          <Button
            text={'Criar conta'}
            onClick={signUpHandle}
            top={18}
          />

        </ScrollView>
      </Animatable.View>
    </View >
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
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