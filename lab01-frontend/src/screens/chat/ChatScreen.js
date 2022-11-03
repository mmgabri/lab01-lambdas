import React, { useState, useCallback, useEffect } from 'react';
import { View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AwesomeLoading from 'react-native-awesome-loading';
import { renderCustomSend } from './MessageContainer';
import { convertDateTimezoneAmericaSaoPaulo } from '../../services/utils'
import { decodeMessage } from '../../services/decodeMessage'
import { apiChat } from '../../services/api'
import { useAuth } from '../../contexts/auth'

const ChatScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, _showAlert } = useAuth();
  const { anuncio } = route.params;
  const { chat } = route.params;
  const { routeChats } = route.params;
  var userIdTo;
  var chatId;

  useEffect(() => {
    console.log('--use effect Chat --')

    var params;
    if (routeChats) {
      console.log('Route Chat: ', chat)
      params = `?chatId=${chat.chatId}`
      userIdTo = chat.userConversation._id
      chatId = chat.chatId
    } else {
      console.log('Route Anuncio: ', anuncio)
      params = `?userIdLogged=${user.id}&userIdConversation=${anuncio.userId}`
      userIdTo = anuncio.userId
    }

    console.log("params", params)

    setIsLoading(true)
    apiChat.get(`/messages${params}`)
      .then((response) => {
        setIsLoading(false)
        console.log('Retorno api chats/messages:', response.data)
        setMessages(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Erro na chamda da api chats/messages - Erro: ", error)
        onError(error)
      });
  }, []);


  async function sendMessage(msg) {

    var payload = {
      chatId: chatId,
      createdAt: msg[0].createdAt,
      text: msg[0].text,
      userIdFrom: user.id,
      userNameFrom: user.userName,
      userIdTo: userIdTo
    }

    setIsLoading(true)

    console.log("Payload Send Message:" , payload)
    apiChat.post('', payload)
      .then((response) => {
        setIsLoading(false)
        console.info("Retorno OK da api send-message:", response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error('Erro na chamada da api send/message:', error)
        onError(error)
      });
  }

  function onError(error) {
    console.log("onError")
    const statusCode = error.response?.status;

    if (statusCode == 401) {
      _showAlert('info', 'Ooops!', decodeMessage(statusCode), 4000);
      navigation.navigate('SignInTab')
    }
    _showAlert('danger', 'Ooops!', decodeMessage(statusCode), 7000);
  }

  const onSend = useCallback((messages = []) => {
    messages[0].createdAt = convertDateTimezoneAmericaSaoPaulo(messages)
    sendMessage(messages)

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    isLoading ?
      < View >
        <AwesomeLoading indicatorId={8} size={50} isActive={true} text="" />
      </View >

      :

      <GiftedChat
        messages={messages}
        inverted ={true}
        alignTop={true} 
        alwaysShowSend={true}
        onSend={onSend}
        scrollToBottom
        placeholder={'Digite uma mensagem'}
        renderSend={renderCustomSend}
        messagesContainerStyle={{ backgroundColor: '#DCDCDC' }}
        textInputStyle={{ color: 'black', backgroundColor: 'white' }}
        user={{
          _id: user.id,
        }}
      />
  )
}

export default ChatScreen;