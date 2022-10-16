import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import SignInScreen from '../../screens/SignInScreen'
import SignUpScreen from '../../screens/SignUpScreen'

const Stack = createStackNavigator()

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#009387',
          height: 55,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
      }>
      <Stack.Screen name={screens.SignInTab} component={SignInScreen} options={{ title: 'Login' }} />
      <Stack.Screen name={screens.SignUp} component={SignUpScreen} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  )
}

export default LoginStackNavigator
