import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, StyleSheet, View } from 'react-native'

import HomeStackNavigator from './stack-navigators/HomeStackNavigator'
import AnunciarStackNavigator from './stack-navigators/AnunciarStackNavigator'

import { routes, screens } from './RouteItems'
import { useAuth } from '../contexts/auth';
import LoginStackNavigator from './stack-navigators/LoginStackNavigator'
import MeusAnunciosStackNavigator from './stack-navigators/MeusAnunciosStackNavigator'
import ContaStackNavigator from './stack-navigators/ContaStackNavigator'
import ConfiguracaoStackNavigator from './stack-navigators/ConfiguracaoStackNavigator'
import FavoritosStackNavigator from './stack-navigators/FavoritosStackNavigator'
import ChatsStackNavigator from './stack-navigators/ChatsStackNavigator'
import SignOutScreen from '../screens/SignOutScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createBottomTabNavigator()

const tabOptions = ({ route }) => {
  const item = routes.find(routeItem => routeItem.name === route.name)

  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{ width: 0 }} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
      tabBarHideOnKeyboard: true
    }
  }

  return {
    tabBarIcon: ({ focused }) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{item.title || ''}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  }
}

const BottomTabNavigator = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Tab.Navigator screenOptions={tabOptions} tabBarOptions={{ keyboardHidesTabBar: true }}>
        <Tab.Screen name={screens.HomeStack} component={HomeStackNavigator} />
        <Tab.Screen name={screens.FavoritosTab} component={FavoritosStackNavigator} />
        <Tab.Screen name={screens.AnunciarTab} component={AnunciarStackNavigator} />
        <Tab.Screen name={screens.MeusAnunciosTab} component={MeusAnunciosStackNavigator} />
        <Tab.Screen name={screens.ChatsTab} component={ChatsStackNavigator} />
    
        <Tab.Screen name={screens.ContaTab} component={ContaStackNavigator} />
        <Tab.Screen name={screens.ConfiguracaoTab} component={ConfiguracaoStackNavigator} />
        <Tab.Screen name={screens.SignOutTab} component={SignOutScreen} />
        <Tab.Screen name={screens.Search} component={SearchScreen} />
      </Tab.Navigator>
    )
  } else {
    return (
      <Tab.Navigator screenOptions={tabOptions} tabBarOptions={{ keyboardHidesTabBar: true }}>
        <Tab.Screen name={screens.HomeStack} component={HomeStackNavigator} />
        <Tab.Screen name={screens.AnunciarTab} component={AnunciarStackNavigator} />
        <Tab.Screen name={screens.SignInTab} component={LoginStackNavigator} />
        <Tab.Screen name={screens.Search} component={SearchScreen} />
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 10,
  },
  tabContainer: {
    height: 45,
  }
})

export default BottomTabNavigator
