import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import MeusAnunciosScreen from '../../screens/MeusAnunciosScreen'
import AnuncioScreen from '../../screens/AnuncioScreen'
import SignInScreen from '../../screens/SignInScreen'
import HomeScreen from '../../screens/HomeScreen'


const Stack = createStackNavigator()

const MeusAnunciosStackNavigator = () => {
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
      <Stack.Screen name={screens.MeusAnunciosTab} component={MeusAnunciosScreen} options={{ title: 'Meus anúncios' }} />
      <Stack.Screen name={screens.Anuncio} component={AnuncioScreen} options={{ title: 'Anúncio' }} />
      <Stack.Screen name={screens.SignInTab} component={SignInScreen} options={{ title: 'Login' }} />
      <Stack.Screen name={screens.Home} component={HomeScreen}  />
    </Stack.Navigator>
  )
}

export default MeusAnunciosStackNavigator