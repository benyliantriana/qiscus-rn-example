import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import QiscusSDK from './qiscusSdk';
import RoomList from './components/RoomList';
//  import Renderer from './chatRenderer';
//  import {InitApp} from 'react-native-qiscus-sdk'
const qiscus = new QiscusSDK();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRoom: null,
      activeComments: null,
      rooms: [],
      activePage: 'rooms',
      isLogin: false,
    };
  }
  componentWillMount() {
    const userAuth = {
      email: 'fikri@qiscus.com',
      password: 'password',
      displayName: 'Fikri',
      avatar: null,
    }
    qiscus.init({
      AppId: 'sdksample',
      options: {
        loginSuccessCallback: this.loadRoomList.bind(this)
      }
    });
    qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName, userAuth.avatar);
  }

  loadRoomList() {
    this.setState({isLogin: true});
    qiscus.userAdapter.loadRoomList().then(data => this.setState({rooms: data}));
  }

  openChat(roomId) {
    qiscus.chatGroup(roomId).then(() => {
      this.setState({
        activeRoom: qiscus.selected,
        activeComments: qiscus.selected.comments,
        activePage: 'comments',
      });
    });
  }

  render() {
    // if user is not logged in yet, render this text
    if (!this.state.isLogin) {
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <Text>Initializing App...</Text>
      </View>;
    }

    // display room list or comment list
    if (this.state.activePage == 'rooms') {
      // display room list
      return <View style={styles.container}><RoomList rooms={this.state.rooms} openChat={this.openChat.bind(this)} /></View>
    } else {
      // display comment list
      return (
        <View>
          <TouchableOpacity style={{marginLeft: 30, marginBottom: 10, marginTop: 0, justifyContent: 'center', alignItems: 'center', height: 40, width: 80, borderWidth: 1, borderColor: '#333131'}} onPress={() => this.setState({selectedRoom: null})}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  containerRow: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dce2e9',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  button: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 80,
    borderWidth: 1,
    borderColor: '#333131',
  },
});
