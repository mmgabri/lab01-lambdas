import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'
import HomeScreen from '../../screens/HomeScreen'
import SignOutScreen from '../../screens/SignOutScreen'
import SignInScreen from '../../screens/SignInScreen'
import ListAnuncio from '../../screens/ListAnuncio'
import AnuncioScreen from '../../screens/AnuncioScreen'
import AnunciarTituloScreen from '../../screens/anunciar/AnunciarTituloScreen'
import AnunciarDescricaoScreen from '../../screens/anunciar/AnunciarDescricaoScreen'
import AnunciarCategoriaScreen from '../../screens/anunciar/AnunciarCategoriaScreen'
import AnunciarTipoScreen from '../../screens/anunciar/AnunciarTipoScreen'
import AnunciarValorScreen from '../../screens/anunciar/AnunciarValorScreen'
import AnunciarCepScreen from '../../screens/anunciar/AnunciarCepScreen'
import AnunciarImagensScreen from '../../screens/anunciar/AnunciarImagensScreen'
import AnunciarConfirmScreen from '../../screens/anunciar/AnunciarConfirmScreen'
import MeusAnunciosScreen from '../../screens/MeusAnunciosScreen'
import ChatScreen from '../../screens/chat/ChatScreen'

const Stack = createStackNavigator()

const HomeStackNavigator = ()  => {

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
      <Stack.Screen name={screens.Home} component={HomeScreen}  />
      <Stack.Screen name={screens.SignOutTab} component={SignInScreen} />
      <Stack.Screen name={screens.SignOut} component={SignOutScreen} />
      <Stack.Screen name={screens.ListAnuncio} component={ListAnuncio} />
      <Stack.Screen name={screens.Anuncio} component={AnuncioScreen} options={{ title: 'Anúncio' }} />

      <Stack.Screen name={screens.AnunciarTitulo} component={AnunciarTituloScreen} options={{ title: 'Anunciar - Título' }} />
      <Stack.Screen name={screens.AnunciarDescricao} component={AnunciarDescricaoScreen} options={{ title: 'Anunciar - Descrição' }} />
      <Stack.Screen name={screens.AnunciarCategoria} component={AnunciarCategoriaScreen} options={{ title: 'Anunciar - Categoria' }} />
      <Stack.Screen name={screens.AnunciarTipo} component={AnunciarTipoScreen} options={{ title: 'Anunciar - Tipo' }} />
      <Stack.Screen name={screens.AnunciarValor} component={AnunciarValorScreen} options={{ title: 'Anunciar - Valor' }} />
      <Stack.Screen name={screens.AnunciarCep} component={AnunciarCepScreen} options={{ title: 'Anunciar - cep' }} />
      <Stack.Screen name={screens.AnunciarImagens} component={AnunciarImagensScreen} options={{ title: 'Anunciar - Imagens' }} />
      <Stack.Screen name={screens.AnunciarConfirm} component={AnunciarConfirmScreen} options={{ title: 'Anunciar - Confirmação' }} />
      <Stack.Screen name={screens.MeusAnuncios} component={MeusAnunciosScreen} options={{ title: 'Meus anúncios' }} />
      <Stack.Screen name={screens.Chat} component={ChatScreen} options={{ title: 'Chat' }} />

    </Stack.Navigator>
  )
}

export default HomeStackNavigator