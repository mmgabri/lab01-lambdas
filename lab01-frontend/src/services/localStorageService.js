import AS_User from '@react-native-community/async-storage'
import AS_Token from '@react-native-community/async-storage'

export const LOGGED_USER = '_logged_user'
export const TOKEN = '_token'

const setUserStorage = (valor) => {
    AS_User.setItem(LOGGED_USER, JSON.stringify(valor));
}

const getUserStorage = async () => {
    const valor = await AS_User.getItem(LOGGED_USER)
    return JSON.parse(valor)
}

const removeUserStorage = async () => {
    await AS_User.removeItem(LOGGED_USER)
}

const clearStorage = async () => {
    AS_Token.clear
    AS_User.clear
}



export {
    setUserStorage,
    getUserStorage,
    removeUserStorage,
    clearStorage
};