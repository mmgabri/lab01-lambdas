/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { Send, Time } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome'

export const renderCustomSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
  >
    <Icon name="send" size={25} color={'#007bb6'} />
  </Send>
);

