import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import ChatScreen from '../../screens/chat/ChatScreen'
import ChatsScreen from '../../screens/chat/ChatsScreen'
import SignInScreen from '../../screens/SignInScreen'
import SignUpScreen from '../../screens/SignUpScreen'

const Stack = createStackNavigator()

const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#009387',
          height: 55,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }
      }>
      <Stack.Screen name={screens.ChatsTab} component={ChatsScreen} options={{ title: 'Chats' }} />
      <Stack.Screen name={screens.Chat} component={ChatScreen} options={{ title: 'Chat' }} />
      <Stack.Screen name={screens.SignInTab} component={SignInScreen} options={{ title: 'Login' }} />
      <Stack.Screen name={screens.SignUp} component={SignUpScreen} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  )
}

export default ChatsStackNavigator
