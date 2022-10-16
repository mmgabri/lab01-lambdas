import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  AnunciarTab: 'AnunciarTab',
  AnunciarStack: 'AnunciarStack',
  Anunciar: 'Anunciar',
  Anuncio: 'Anuncio',
  AnunciarTitulo: 'AnunciarTitulo',
  AnunciarDescricao: 'AnunciarDescricao',
  AnunciarCategoria: 'AnunciarCategoria',
  AnunciarTipo: 'AnunciarTipo',
  AnunciarValor: 'AnunciarValor',
  AnunciarCep: 'AnunciarCep',
  AnunciarImagens: 'AnunciarImagens',
  AnunciarConfirm: 'AnunciarConfirm',
  ListAnuncio: 'ListAnuncio',
  SignIn: 'SignIn',
  SignInTab: 'SignInTab',
  SignUp: 'SignUp',
  SignOut: 'SignOut',
  SignOutTab: 'SignOutTab',
  MeusAnunciosTab: 'MeusAnunciosTab',
  MeusAnuncios: 'MeusAnuncios',
  ContaTab: 'ContaTab',
  Conta: 'Conta',
  Configuracao: 'Configuracao',
  ConfiguracaoTab: 'ConfiguracaoTab',
  Search: 'Search',
  SearchTab: 'SearchTab',
  Favoritos: 'Favoritos',
  FavoritosTab: 'FavoritosTab',
  Chats: 'Chats',
  ChatsTab: 'ChatsTab',
  Chat: 'Chat',

}


export const routes = [
  {
    name: screens.Search,
    focusedRoute: screens.Search,
    title: 'Search',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="search" size={25} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.ContaTab,
    focusedRoute: screens.ContaTab,
    title: 'Conta',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
    <Icon name="user" size={25} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.FavoritosTab,
    focusedRoute: screens.FavoritosTab,
    title: 'Favoritos',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="heart" size={21} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.ChatsTab,
    focusedRoute: screens.ChatsTab,
    title: 'Chats',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="comment" size={21} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.ConfiguracaoTab,
    focusedRoute: screens.ConfiguracaoTab,
    title: 'Configuração',
    showInTab: false,
    shownNoAuth: true,
    showInDrawer: true,
    icon: (focused) =>
    <Icon name="user" size={25} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.SearchTab,
    focusedRoute: screens.SearchTab,
    title: 'Search',
    showInTab: false,
    shownNoAuth: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="user" size={25} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.SignOutTab,
    focusedRoute: screens.SignOutTab,
    title: 'SignOut',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
    <Icon name="sign-out" size={25} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.MeusAnunciosTab,
    focusedRoute: screens.MeusAnunciosTab,
    title: 'Meus anúncios',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="list-ul" size={22} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.SignInTab,
    focusedRoute: screens.SignInTab,
    title: 'Login',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="user" size={23} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.AnunciarTab,
    focusedRoute: screens.AnunciarTab,
    title: 'Anunciar',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="plus-circle" size={23} color={focused ? '#009387' : '#818185'} />,
  },
  {
    name: screens.AnunciarStack,
    focusedRoute: screens.AnunciarStack,
    title: 'Anunciar',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="plus-circle" size={23} color={focused ? '#009387' : '#818185'} />,
  },
  {
    name: screens.Anunciar,
    focusedRoute: screens.AnunciarStack,
    title: 'Anunciar--',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
    <Icon name="plus-circle" size={23} color={focused ? '#009387' : '#818185'} />,
  },

  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home--routes',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={23} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={23} color={focused ? '#009387' : '#818185'} />,
  },

]
