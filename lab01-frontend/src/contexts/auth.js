import React, { createContext, useState, useEffect, useContext, useRef, } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AwesomeLoading from 'react-native-awesome-loading';
import { decodeMessage } from '../services/decodeMessage'
import { apiUser, apiAnuncio, apiChat } from '../services/api';
import DropdownAlert from 'react-native-dropdownalert';
import { setUserStorage, getUserStorage, removeUserStorage } from '../services/localStorageService'

const AuthContext = createContext({
    isAuthenticated: false,
    loading: false, 
    token: "",
    user: {}
});

const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [queueSize, setQueueSize] = useState(0);
    let dropDownAlertRef = useRef(null);


    useEffect(() => {
        console.log('---- useEffect - auth ----')
        apiUser.defaults.timeout = 25000;
        apiAnuncio.defaults.timeout = 25000;
        apiChat.defaults.timeout = 25000;
     //   defineInterceptorApiAnuncio()
     //   defineInterceptorApiChat()
        const loadStorageData = async () => {
            const storageUser = await getUserStorage();
            //console.info('Usuário obtido do storage -->', storageUser)
            if (storageUser) {
                setUser(storageUser)
                setIsAuthenticated(true)
            }
        };
        loadStorageData();
    }, [])

    function setLoading(value) {
        setIsLoading(value)
    }

    async function signUp(email, password, name) {
        console.log('---- Entrou no signUp ----')
      //  setIsLoading(true)

        try {
            const response = await apiUser.post('/signup', { email: email, password: password, name: name, role: ['admin'] })
            console.log('Retorno da api signin:', response.data)
            signIn(email, password)
        } catch (error) {
            log.error('Erro na api signup:', error)
            _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
            setIsLoading(false)
        }
    }

    function signIn(email, password) {
        console.log('---- Entrou no signIn ----')
       // setIsLoading(true)

        apiUser.post('/signin', { email: email, password: password })
            .then((response) => {
                _showAlert('success', 'Bem vindo !', '', 3000);
                setUser(response.data)
                setUserStorage(response.data)
                console.log('Retorno da api signin:', response)
                apiUser.defaults.headers.authorization = response.data.idToken;
                //apiChat.defaults.headers.authorization = `${response.data.type} ${response.data.token}`;
                apiAnuncio.defaults.headers.authorization = response.data.idToken;
                setIsAuthenticated(true)
                setIsLoading(false)
            })
            .catch((error) => {
                _showAlert('error', 'Ooops!', decodeMessage(error.response.status), 7000);
                console.error('Erro na api signin:', error.response.status)
                setIsLoading(false)
            });
    }

    function defineInterceptorApiAnuncio() {
        console.log('--defineInterceptorApiAnuncio--')
        apiAnuncio.interceptors.response.use(
            (response) => {
                return response;
            },
            async function (error) {
                const originalRequest = error.config;
                const status = error.response?.status
                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    await refreshToken(error);
                    const userStorage = await getUserStorage();
                    originalRequest.headers.authorization = userStorage.type + ' ' + userStorage.token
                    return apiAnuncio(originalRequest);
                }
                return Promise.reject(error);
            }
        );
    }

    function defineInterceptorApiChat() {
        apiChat.interceptors.response.use(
            (response) => {
                return response;
            },
            async function (error) {
                const originalRequest = error.config;
                const status = error.response?.status
                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    await refreshToken(error);
                    const userStorage = await getUserStorage();
                    originalRequest.headers.authorization = userStorage.type + ' ' + userStorage.token
                    return apiChat(originalRequest);
                }
                return Promise.reject(error);
            }
        );
    }

    async function refreshToken(error) {
        console.log('--- refreshToken ---')
        const userStorage = await getUserStorage();
        return new Promise((resolve, reject) => {
            try {
                apiUser.defaults.headers.authorization = `${userStorage.type} ${userStorage.token}`;
                apiAnuncio.defaults.headers.authorization = `${userStorage.type} ${userStorage.token}`;
                apiChat.defaults.headers.authorization = `${userStorage.type} ${userStorage.token}`;
                apiUser.post('/users/refreshtoken', { refreshToken: userStorage.refreshToken })
                    .then(async (response) => {
                        const userAux = userStorage;
                        userAux.token = response.data.accessToken
                        userAux.refreshToken = response.data.refreshToken
                        setUserStorage(userAux)
                        apiUser.defaults.headers.authorization = `${userAux.type} ${userAux.token}`;
                        apiAnuncio.defaults.headers.authorization = `${userAux.type} ${userAux.token}`;
                        apiChat.defaults.headers.authorization = `${userAux.type} ${userAux.token}`;
                        return resolve(response);
                    })
                    .catch((err) => {
                        console.error('Erro api refresh token:', err)
                        setIsAuthenticated(false)
                        return reject(error);
                    });
            } catch (err) {
                return reject(err);
            }
        });
    };


    async function signOut() {
        console.log('---- Entrou no signOut ----', user)
        await removeUserStorage()
        setUser({})
        setIsAuthenticated(false)
    }


    function _showAlert(type, title, message, interval) {
        console.log('_showAlertQueue')

     //   showMessage({
     //       message: title,
     //       description: message,
     //       type: type,
    //       // animationDuration: interval
    //      });



        dropDownAlertRef.alertWithType(type, title, message, {}, interval)
        //     dropDownAlertRef.alertWithType(type, title, message)

    };

    const _onClose = (data) => {
        _updateQueueSize();
    };
    const _onCancel = (data) => {
        _updateQueueSize();
    };
    const _onTap = (data) => {
        _updateQueueSize();
    };
    const _updateQueueSize = () => {
        setQueueSize(dropDownAlertRef.getQueueSize());
    };

    return (

        isLoading ?
            < View >
                <AwesomeLoading indicatorId={11} size={80} isActive={true} text="" />
            </View >

            :

            <AuthContext.Provider
                value={{
                    isAuthenticated,
                    user,
                    isLoading,
                    setLoading,
                    signIn,
                    signUp,
                    signOut,
                    _showAlert
                }}>
                {children}
                <DropdownAlert
                    ref={(ref) => {
                        if (ref) {
                            dropDownAlertRef = ref;
                        }
                    }}
                    containerStyle={styles.content}
                    showCancel={true}
                    onCancel={_onCancel}
                    onTap={_onTap}
                    titleNumOfLines={5}
                    messageNumOfLines={0}
                    onClose={_onClose}
                />
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
