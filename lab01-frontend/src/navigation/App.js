import React, { createRef } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import DrawerNavigator from './DrawerNavigator'
import { AuthProvider } from '../contexts/auth'

const navigationRef = createRef()
const nav = () => navigationRef.current

const App = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <DrawerNavigator nav={nav} />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default App
