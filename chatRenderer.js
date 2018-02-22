import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {ChatRenderer} from 'react-native-qiscus-sdk';

export default function Renderer(props: {}) {
  let {qiscus, newMessage, initApp, room} = props;
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F5FCFF',
      marginTop: 20,
    }}>
      <ChatRenderer qiscus={qiscus} newMessage={newMessage} initApp={initApp} room={room} {...props} />
    </View>
  );
}
