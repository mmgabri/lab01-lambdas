import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import SearchScreen from '../../screens/SearchScreen'

const Stack = createStackNavigator()

const SearchStackNavigator = () => {
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
      <Stack.Screen name={screens.Search} component={SearchScreen} options={{ title: 'Pesquisar' }} />

    </Stack.Navigator>
  )
}

export default SearchStackNavigator
