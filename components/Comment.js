import React, { Component } from 'react';
import {
  View, Text,
  Image } from 'react-native';
// const {width, height} = Dimensions.get('window');

const buildMessageStyle = function(isMe) {
  return isMe
    ? {...style.commentMessage,...style.commentMessageRight}
    : {...style.commentMessage,...style.commentMessageLeft}
};

export default function Comment(props) {
  const avatar_url = props.data.avatar 
    ? props.data.avatar 
    : 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';

  // return <Text>{JSON.stringify(props.data)}</Text>
  return (
    <View style={style.commentContainer}>
      { /* Left Avatar */ }
      { !props.isMe ? <Image source={{ uri: avatar_url }} style={style.photo} /> : null }
      { /* Main Comment Message */ }
      <View style={{...style.flexRow,alignItems:'flex-end'}}>
        <Text style={buildMessageStyle(props.isMe)}>{props.data.message}</Text>
        <Text style={style.commentMessageTime}>{props.data.time}</Text>
      </View>
      { /* Right Avatar */ }
      { props.isMe ? <Image source={{ uri: avatar_url }} style={style.photo} /> : null }
    </View>
  );
}

const style = {
  commentContainer: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  commentMessage: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  commentMessageRight: {
    backgroundColor: 'red',
  },
  commentMessageLeft: {
    marginLeft: 10,
  },
  commentMessageTime: {
    marginLeft: 7,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
};