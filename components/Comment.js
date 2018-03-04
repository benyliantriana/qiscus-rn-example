import React, { Component } from 'react';
import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View, Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Linking,
  Image } from 'react-native';
const {height, width} = Dimensions.get('window');
// const {width, height} = Dimensions.get('window');
const colorConfig = {
  leftBubbleColor: '#ddd',
  rightBubbleColor: '#ecf0f1'
}
const buildBubbleStyle = function(isMe) {
  return isMe
    ? {...style.messageStyle,alignItems:'flex-end',backgroundColor:colorConfig.rightBubbleColor}
    : {...style.messageStyle,backgroundColor:colorConfig.leftBubbleColor}
};

function renderMessage(message, isMe) {
  const messageString = message.message;
  const isFile = messageString.substring(0,6) == '[file]' ? true : false;
  const messageURI = (isFile) ? messageString.substring(6,messageString.length-7).trim() : '';
  const isImage = isFile && ['jpg','gif','jpeg','png'].includes(messageURI.split('.').pop().toLowerCase());
  if(isFile){
    // return <View><Text>Just another test {messageURI}</Text></View>;
    return (
      <View style={{...buildBubbleStyle(isMe)}}>
        {isImage
          ? renderImage(messageURI)
          : renderFile(messageURI)
        }
      </View>
    );
  } else {
    return (
      <View style={buildBubbleStyle(isMe)}>
        <Text style={{maxWidth:'70%'}}>{messageString}</Text>
        <Text style={style.commentMessageTime}>{message.time}</Text>
      </View>
    );
  }
}

function renderImage(uri) {
  return (
    <Lightbox underlayColor="white" activeProps={{style: style.pictureLoad}}>
      <Image
        style={style.picture}
        source={{uri: uri}}
      />
    </Lightbox>
  );
}

function renderFile(uri) {
  return (
    <TouchableOpacity onPress={() => {
        Linking.openURL(`${uri}`);
      }}
      style={style.files}
    >
      <Icon name="description" size={80} /><Text style={style.fileLabel}>{uri}</Text>
    </TouchableOpacity>
  );
}

export default function Comment(props) {
  const avatar_url = props.data.avatar 
    ? props.data.avatar 
    : 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';
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
        {renderMessage(props.data, props.isMe)}
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
  picture: {
    minHeight: 0.20 * height,
    minWidth: 0.45 * width,
  },
  pictureLoad: {
    maxWidth: width,
    minHeight: 0.30 * height,
  },
  files: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    width: 0.45 * width,
    justifyContent: 'flex-start',
  },
  fileLabel: {
    width: 80,
    marginTop: 10,
    fontSize: 9,
  },
};