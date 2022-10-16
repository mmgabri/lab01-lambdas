import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { renderCustomSend} from './MessageContainer';
import { convertDateTimezoneAmericaSaoPaulo } from '../../services/utils'
import { apiChat } from '../../services/api'
import { useAuth } from '../../contexts/auth'

const ChatScreen = ({ route, navigation }) => {
  const { user, _showAlert } = useAuth();
  const { anuncio } = route.params;
  const { chat } = route.params;
  const { routeChats } = route.params;
  const [messages, setMessages] = useState([]);
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

    apiChat.get(`/chats/messages${params}`)
      .then((response) => {
        console.log('Retorno api chats/messages:', response.data)
        setMessages(response.data)
      })
      .catch((error) => {
        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
      });
  }, []);


  async function sendMessage(msg) {

    var payload = {
      chatId: chatId,
      createdAt: msg[0].createdAt,
      text: msg[0].text,
      userIdFrom: user.id,
      userNameFrom: user.username,
      userIdTo: userIdTo
    }

    apiChat.post('chats/send-message', payload)
      .then(() => {
      })
      .catch((error) => {
        console.error('Erro na chamada da api send/message:', error)
        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
      });
  }

  const onSend = useCallback((messages = []) => {
    messages[0].createdAt = convertDateTimezoneAmericaSaoPaulo(messages)
    sendMessage(messages)

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      alignTop
      alwaysShowSend
      scrollToBottom
      renderAvatarOnTop
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