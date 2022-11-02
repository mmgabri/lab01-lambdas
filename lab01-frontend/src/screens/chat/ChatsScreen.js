import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AwesomeLoading from 'react-native-awesome-loading';
import { useTheme } from 'react-native-paper';
import { decodeMessage } from '../../services/decodeMessage'
import stylesCommon from '../../components/stylesCommon';
import { apiChat } from '../../services/api'
import { useAuth } from '../../contexts/auth'
import ListChats from './ListChats';

const ChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, _showAlert } = useAuth();
  const { colors } = useTheme();


  useEffect(() => {
    console.log('---- Chat ----', user.id)
    getChats()
  }, [])

  function onError(error) {
    console.log("onError")
    const statusCode = error.response?.status;

    if (statusCode == 401) {
      _showAlert('info', 'Ooops!', decodeMessage(statusCode), 4000);
      navigation.navigate('SignInTab')
    }
    _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 7000);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getChats();
  }, []);

  async function getChats() {
    setIsLoading(true)
    apiChat.get(`/user/${user.id}`)
      .then((response) => {
        console.log('Retorno api getChats:', response.data)
        setChats(response.data)
        setRefreshing(false)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setRefreshing(false)
        console.error("Erro na chamada da api getChats by user - Erro:", error)
        onError(error)
      });
  }

  function onClick(item) {
    navigation.navigate('Chat', { chat: item, routeChats: true })
  }


  return (

    isLoading ?
      < View >
        <AwesomeLoading indicatorId={11} size={80} isActive={true} text="" />
      </View >

      :

      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <Animatable.View
          animation="fadeInUpBig"
          style={[stylesCommon.footer, {
            backgroundColor: colors.background
          }]}
        >
          <ListChats
            chats={chats}
            onClick={onClick}
            onRefresh={onRefresh}
            refreshing={refreshing}>
          </ListChats>

        </Animatable.View>

      </View>

  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
    margin: -10
  },
});
