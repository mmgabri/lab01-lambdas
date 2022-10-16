import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import FavoritosScreen from '../../screens/FavoritosScreen'

const Stack = createStackNavigator()

const FavoritosStackNavigator = () => {
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
      <Stack.Screen name={screens.FavoritosTab} component={FavoritosScreen} options={{ title: 'Favoritos' }} />

    </Stack.Navigator>
  )
}

export default FavoritosStackNavigator
