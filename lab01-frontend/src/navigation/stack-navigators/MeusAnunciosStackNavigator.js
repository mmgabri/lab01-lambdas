import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import MeusAnunciosScreen from '../../screens/MeusAnunciosScreen'
import AnuncioScreen from '../../screens/AnuncioScreen'


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
    </Stack.Navigator>
  )
}

export default MeusAnunciosStackNavigator