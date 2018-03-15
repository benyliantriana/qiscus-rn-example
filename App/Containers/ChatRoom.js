import React from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  ToastAndroid,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import moment from 'moment'
import { Actions, ActionConst } from 'react-native-router-flux'

import { Images, Dictionary, Colors } from '../Themes'

/**
 * import component
 */
import { Header, EmptyState, ListRoom } from '../Components'

import styles from './Styles/ChatRoomStyles'

I18n.translations = Dictionary

class ChatRoom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      email: this.props.email, // receiving params from previous container
      photo: this.props.photo,
      callback: false
    }
  }

  qiscus = this.props.qiscus

  componentWillMount () {
    qiscus.userAdapter.loadRoomList().then(data =>
      this.setState({
        data: data,
        loading: false
      }))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.callback !== undefined) {
      if (nextProps.callback !== this.state.callback) {
        qiscus.userAdapter.loadRoomList().then(data =>
          this.setState({
            data: data,
            callback: nextProps.callback
          }))
      }
    }
  }

  profile () {
    ToastAndroid.show('left pressed', ToastAndroid.SHORT)
  }

  newConversation () {
    ToastAndroid.show('right pressed', ToastAndroid.SHORT)
  }

  renderList () {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderitem}
        keyExtractor={item => item.id}
      />
    )
  }

  renderitem = ({ item }) => {
    let date
    const tempDay = 24 * 60 * 60 * 1000
    if ((moment() - item.last_comment.unix_timestamp * 1000) < tempDay) {
      date = moment(item.last_comment.unix_timestamp * 1000).format('hh:mm')
    } else {
      date = moment(item.last_comment.unix_timestamp * 1000).format('DD/MM/YY')
    }
    return (
      <ListRoom
        unreadCount={item.unread_count}
        avatar={item.avatar_url}
        name={item.room_name}
        lastMessage={item.last_comment.message}
        date={date}
        onPress={() => this.detailChat(item.id_str, item.room_name, item.chat_type)}
      />
    )
  }

  detailChat (id, name, typeRoom) {
    Actions.chatlist({
      type: ActionConst.PUSH,
      id: id,
      roomName: name,
      email: this.state.email,
      typeRoom: typeRoom,
      qiscus: qiscus,
      callback: this.state.callback
    })
  }

  render () {
    const { data, loading, photo } = this.state
    let view
    if (loading) {
      view = (
        <View />
      )
    } else {
      view = data.length > 1 ? this.renderList() : <EmptyState type='room' showButton />
    }
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('conversations')}
          leftButtonImage={photo}
          onLeftPress={() => this.profile()}
          showRightButton
          isLoading={loading}
          rightButtonImage={Images.search}
          onRightPress={() => this.newConversation()}
        />
        {view}
      </View>
    )
  }
}

export default ChatRoom
