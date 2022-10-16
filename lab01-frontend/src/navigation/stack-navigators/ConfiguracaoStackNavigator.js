import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import ConfiguracaoScreen from '../../screens/ConfiguracaoScreen'

const Stack = createStackNavigator()

const ConfiguracaoStackNavigator = () => {
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
      <Stack.Screen name={screens.Configuracao} component={ConfiguracaoScreen} options={{ title: 'Configuração' }} />
    </Stack.Navigator>
  )
}

export default ConfiguracaoStackNavigator
