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
import qiscus from '../../libs/SDKCore'

// import { Actions, ActionConst } from 'react-native-router-flux'
import { Images, Dictionary, Colors } from '../Themes'
// import qiscus from '../../libs/SDKCore'

/**
 * import component
 */
import { Header, EmptyState } from '../Components'

import styles from './Styles/ChatListStyles'

I18n.translations = Dictionary

class ChatList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
    }
  }

  componentWillMount () {
    qiscus.userAdapter.loadRoomList().then(data => this.setState({
      data: data,
      loading: false
    }))
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
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.9}>
        <Image source={{ uri: item.avatar_url }} style={styles.photo} />
        <View style={styles.item}>
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 15 }}>
            <Text style={styles.textName}>{item.room_name}</Text>
            <Text style={styles.textMessage}>{item.last_comment.message}</Text>
          </View>
          <View>
            <Text style={styles.textMessage}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { data, loading } = this.state
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
          leftButtonImage={Images.profile}
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

export default ChatList
