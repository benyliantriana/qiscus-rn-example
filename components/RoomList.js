import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  ScrollView,
  Image } from 'react-native';
import styles from './styles';

export default function RoomList(props) {
  const rooms = props.rooms;
  const defaultAvatar = 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';
  if(rooms.length < 1) return <View style={styles.container}><Text>Room is being loaded ...</Text></View>
  return (
    <ScrollView>
      {rooms.map(room => {
        const avatar_url = room.avatar_url ? room.avatar_url : 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';
        return <TouchableOpacity onPress={props.openChat.bind(null, room.id)} key={room.id}>
          <View style={styles.roomRow}>
            <Image source={{ uri: avatar_url }} style={styles.photo} />
            <Text>{room.room_name}</Text>
          </View>
        </TouchableOpacity>
      })}
    </ScrollView>
  );
  // return (
  //   <View style={styles.container}>
  //     <FlatList data={rooms} keyExtractor={(item, index) => item.id} renderItem={(room) => {
  //       return <Text>{room.id}</Text>;
  //       return <TouchableOpacity onPress={props.openChat.bind(room.id)}>
  //         <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
  //           <Image source={{ uri: (room.avatar || defaultAvatar)}} style={styles.photo} />
  //           <Text>{room.id}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     }} />
  //   </View>
  // );
}