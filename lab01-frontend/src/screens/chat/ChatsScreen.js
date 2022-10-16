import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../../components/stylesCommon';
import { apiChat } from '../../services/api'
import { useAuth } from '../../contexts/auth'
import ListChats from './ListChats';

const ChatScreen = ({ navigation }) => {
  const { user, _showAlert } = useAuth();
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();


  useEffect(() => {
    console.log('---- Chat ----', user.id)
    getChats() 
  }, [])


  const onRefresh = useCallback(() => {
    console.log('entrou onRefresh **********')
    setRefreshing(true);
    getChats();
  }, []);

  async function getChats() {
    apiChat.get(`/chats/user/${user.id}`)
    .then((response) => {
      console.log('Retorno api getChats:', response.data)
      setChats(response.data)
      setRefreshing(false)
    })
    .catch((error) => {
      _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
      setRefreshing(false)
    });
  }

  function onClick(item) {
    navigation.navigate('Chat', { chat: item, routeChats: true })
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
