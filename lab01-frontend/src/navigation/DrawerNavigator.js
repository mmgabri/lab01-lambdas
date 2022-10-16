import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CommonActions } from '@react-navigation/native';

import { theme } from '../components/colors'
import BottomTabNavigator from './BottomTabNavigator'
import { routes, screens } from './RouteItems'
import { useAuth } from '../contexts/auth';

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  const { isAuthenticated} = useAuth();
  const currentRouteName = props.nav()?.getCurrentRoute()?.name

  return (
    <DrawerContentScrollView {...props}>
      {
        routes.filter(route => route.showInDrawer).map((route) => {
          const focusedRoute = routes.find(r => r.name === currentRouteName)
          const focused = focusedRoute ?
            route.name === focusedRoute?.focusedRoute :
            route.name === screens.HomeStack
          if (!isAuthenticated) {
            if (route.shownNoAuth) {
              return (
                <DrawerItem
                  key={route.name}
                  label={() => (
                    <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                      {route.title}
                    </Text>
                  )}
                  onPress={() => props.navigation.navigate(route.name)}
                  style={[styles.drawerItem, focused ? styles.drawerItemFocused : styles.drawerItemFocused]}
                />
              )
            }
          } else {
            return (
              <DrawerItem
                key={route.name}
                label={() => (
                  <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                    {route.title}
                  </Text>
                )}
                onPress={() => props.navigation.navigate(route.name)}
                style={[styles.drawerItem, focused ? styles.drawerItemFocused : styles.drawerItemFocused]}
              />
            )
          }
        })
      }
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = ({ nav }) => {


  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme,
          height: 37,
        },
        headerRight: () => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.headerRight1}
              onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Search' }))}
            >
              <Icon name="search" marginLeft={99} size={18} color="#DCDCDC" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerRight2}>
              <Icon name="bars" size={20} color="#DCDCDC" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (<View></View>),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />} >
      <Drawer.Screen name={screens.HomeTab} component={BottomTabNavigator} options={{
        title: 'Home',
        headerTitle: () =>
          <View>
          </View>
        ,

      }} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  headerRight1: {
    marginRight: 40
  },
  headerRight2: {
    marginRight: 15
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
    color: '#fff'
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#009c58',
  },
})

export default DrawerNavigator
