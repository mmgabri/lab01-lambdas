import React, { createContext, useState, useEffect, useContext, useRef, } from 'react';
import { StyleSheet, View, Text, StatusBar, LogBox } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
import ButtonDisable from '../components/ButtonDisable';
import { useTheme } from 'react-native-paper';
import FieldForm from '../components/FieldForm';
import AwesomeLoading from 'react-native-awesome-loading';
import { decodeMessage } from '../services/decodeMessage'
import { apiUser, apiAnuncio, apiChat } from '../services/api';
import { setUserStorage, getUserStorage, removeUserStorage } from '../services/localStorageService'
import stylesCommon from '../components/stylesCommon'
import { showMessage, hideMessage } from "react-native-flash-message";

console.disableYellowBox = true;
console.hideMessage = true;

const AuthContext = createContext({
});

const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [enableButton, setEnableButton] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [confirmationCodeInvalid, setconfirmationCodeInvalid] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmSignup, setConfirmSignup] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        console.log('---- useEffect - auth ----')
        apiUser.defaults.timeout = 25000;
        apiAnuncio.defaults.timeout = 25000;
        apiChat.defaults.timeout = 25000;
        const loadStorageData = async () => {
            const storageUser = await getUserStorage();
            //  console.info('Usuário obtido do storage -->', storageUser)
            if (storageUser) {
                setUser(storageUser)
                console.info('idToken -->', storageUser.idToken)
                apiUser.defaults.headers.authorization = storageUser.idToken;
                apiAnuncio.defaults.headers.Authorization = storageUser.idToken;
                apiChat.defaults.headers.authorization = storageUser.idToken;
                setIsAuthenticated(true)
            }
        };
        loadStorageData();
    }, [])

    function setLoading(value) {
        setIsLoading(value)
    }

    const changeConfirmationCode = (val) => {
        console.log('----------changeConfirmationCode------', val)
        setConfirmationCode(val);
        setconfirmationCodeInvalid(false)
        if (val.length == 6) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }

    async function signUp(email, password, name) {
        console.log('---- Entrou no signUp ----')
        setIsLoading(true)

        try {
            const response = await apiUser.post('/signup', { email: email, password: password, name: name })
            console.log('Retorno da api signin:', response.data)
            setIsLoading(false)
            setUserEmail(email)
            setUserPassword(password)
            setconfirmationCodeInvalid(false)
            setConfirmSignup(true)
            setConfirmationCode('')
            setEnableButton(false)
        } catch (error) {
            console.error('Erro na api signup:', error)
            setIsLoading(false)
            const statusCode = error.response?.status
            _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 5000);

        }
    }

    const confirmSignup = () => {
        console.log('---- Entrou no confirmSignUp ----', userEmail)
        setIsLoading(true)

        apiUser.post('/confirmsignup', { email: userEmail, confirmationCode: confirmationCode })
            .then((response) => {
                console.log('Retorno da api confirmSignUp:', response.data)
                setConfirmSignup(false)
                setconfirmationCodeInvalid(false)
                signIn(userEmail, userPassword)
            })
            .catch((error) => {
                setIsLoading(false)
                setConfirmSignup(true)
                setconfirmationCodeInvalid(true)
                console.error('Erro na api signup:', error)
                const statusCode = error.response?.status
                _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 5000);
            });
    }

    const cancelConfirmSignup = () => {
        console.log('---- Entrou no cancelConfirmSignup ----')
        setIsLoading(false)
        setConfirmSignup(false)
    }


    function signIn(email, password) {
        console.log('---- Entrou no signIn ----')
        notAuthenticated();
        setIsLoading(true)

        apiUser.post('/signin', { email: email, password: password })
            .then((response) => {

                let userLogged = ({
                    id: response.data.id,
                    userName: response.data.userName,
                    email: response.data.email,
                    idToken: response.data.idToken,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                })

                console.log('Signin - userLogged:', userLogged)

                setUser(userLogged)
                setUserStorage(userLogged)

                apiUser.defaults.headers.authorization = response.data.idToken;
                apiAnuncio.defaults.headers.Authorization = response.data.idToken;
                apiChat.defaults.headers.authorization = response.data.idToken;
                _showAlert('success', 'Bem vindo !', '', 3000);
                setIsAuthenticated(true)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Erro na api signin:', error)
                setIsLoading(false)
                setConfirmSignup(false)
                setIsLoading(false)
                const statusCode = error.response?.status
                _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 5000);
            });
    }

    async function signOut() {
        console.log('---- Entrou no signOut ----', user)
        notAuthenticated();
    }

    async function notAuthenticated() {
        console.log('---- Entrou no not authenticated ----')
        await removeUserStorage()
        setUser({})
        setIsAuthenticated(false)
    }


    function _showAlert(type, title, message, interval) {
        console.log('_showAlert:', message)

        showMessage({
            message: title,
            description: message,
            type: type,
            duration: interval
        });

    };

    return (

        isLoading ?
            < View >
                <AwesomeLoading indicatorId={8} size={50} isActive={true} text="" />
            </View >

            :

            isConfirmSignup ?

                <View style={stylesCommon.container}>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={[stylesCommon.footer, {
                            backgroundColor: colors.background
                        }]}
                    >
                        <FieldForm
                            text={'Confirme o código enviado no seu email'}
                            onFocus={() => { setIsFocused(true) }}
                            isFocused={isFocused}
                            placeholder={'digite o código'}
                            multiline={false}
                            numberOfLines={1}
                            value={confirmationCode}
                            onChangeText={changeConfirmationCode}
                        />
                        {confirmationCodeInvalid ?
                            <>
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={stylesCommon.infoMsg}></Text>
                                </Animatable.View>
                                {enableButton ?
                                    <Button
                                        text={'Confirmar'}
                                        onClick={confirmSignup}
                                        top={15}
                                    />
                                    :
                                    <ButtonDisable
                                        text={'Confirmar'}
                                        onClick={confirmSignup}
                                        top={15}
                                    />
                                }

                                <Button
                                    text={'Cancelar'}
                                    onClick={cancelConfirmSignup}
                                    top={15}
                                />
                            </>
                            :
                            <>
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={stylesCommon.infoMsg}></Text>
                                </Animatable.View>
                                {enableButton ?
                                    <Button
                                        text={'Confirmar'}
                                        onClick={confirmSignup}
                                        top={15}
                                    />
                                    :
                                    <ButtonDisable
                                        text={'Confirmar'}
                                        onClick={confirmSignup}
                                        top={15}
                                    />
                                }

                            </>


                        }

                    </Animatable.View>
                </View>

                :

                <AuthContext.Provider
                    value={{
                        isAuthenticated,
                        user,
                        isLoading,
                        notAuthenticated,
                        setLoading,
                        signIn,
                        signUp,
                        signOut,
                        _showAlert
                    }}>
                    {children}
                </AuthContext.Provider>

    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

export { AuthProvider, useAuth };

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#6441A4',
    },
});
