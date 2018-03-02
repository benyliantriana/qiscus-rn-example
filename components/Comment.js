import React, { Component } from 'react';
import {
  View, Text,
  Image } from 'react-native';
// const {width, height} = Dimensions.get('window');
const colorConfig = {
  leftBubbleColor: '#ddd',
  rightBubbleColor: '#ecf0f1'
}

export default function Comment(props) {
  const avatar_url = props.data.avatar 
    ? props.data.avatar 
    : 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';
  const buildBubbleStyle = function(isMe) {
    return isMe
      ? {...style.messageStyle,alignItems:'flex-end',backgroundColor:colorConfig.rightBubbleColor}
      : {...style.messageStyle,backgroundColor:colorConfig.leftBubbleColor}
  };
  const buildMessageStyle = function(isMe) {
    return isMe
      ? {...style.flexRow,justifyContent:'flex-end',marginLeft:10}
      : {...style.flexRow}
  };

  return (
    <View style={style.commentContainer}>
      { /* Left Avatar */ }
      { !props.isMe && props.showAvatar 
        ? <Image source={{ uri: avatar_url }} style={style.photo} />
        : <View style={style.photo}></View>}
      { /* arrow for our friend comment */ }
      {!props.isMe && props.showAvatar ? <View style={style.arrowLeft}></View> : null}
      { /* Main Comment Message */ }
      <View style={buildMessageStyle(props.isMe)}>
        <View style={buildBubbleStyle(props.isMe)}>
          <Text style={{maxWidth:'70%'}}>{props.data.message}</Text>
          <Text style={style.commentMessageTime}>{props.data.time}</Text>
        </View>
      </View>
      { /* arrow for our own comment */ }
      {props.isMe && props.showAvatar ? <View style={style.arrowRight}></View> : null}
      { /* Right Avatar */ }
      { props.isMe && props.showAvatar 
        ? <Image source={{ uri: avatar_url }} style={style.photo} />
        : <View style={style.photo}></View>}
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
  messageStyle: {
    borderRadius: 5,
    padding: 10,
    flexDirection:'row',
    alignItems: 'flex-end',
  },
  commentMessage: {
  },
  commentMessageRight: {
  },
  commentMessageLeft: {
    marginLeft: 10,
  },
  commentMessageTime: {
    marginLeft: 7,
    fontSize: 10,
  },
  photo: {
    marginHorizontal: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  arrowLeft: {
    zIndex: 2,
    width: 0,
    height: 0,
    marginTop: 5,
    marginLeft: -10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderLeftWidth: 12,
    borderBottomWidth: 5,
    borderTopColor: colorConfig.leftBubbleColor,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  arrowRight: {
    marginTop: 5,
    marginRight: -10,
    zIndex: 1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderRightWidth: 12,
    borderBottomWidth: 5,
    borderTopColor: colorConfig.rightBubbleColor,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
};