import React from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  ToastAndroid,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from 'react-native'
import moment from 'moment'

import qiscus from '../../libs/SDKCore'
import { Images, Dictionary, Colors } from '../Themes'

/**
 * import component
 */
import { Header, EmptyState, ListChat } from '../Components'

import styles from './Styles/ChatListStyles'

I18n.translations = Dictionary

class ChatList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      id: this.props.id,
      name: this.props.roomName,
      email: this.props.email,
      type: this.props.typeRoom,
      lastMessageDate: '2018-03-08',
      message: '',
      photo: Images.profile
    }
  }

  /**
   * array chat is reversed, and flatlist will show it in reversed too
   * this is to make the flatlist auto scroll to bottom 
   * and if new (previeous) data added (older message), it wont move the index data in array
   * so the scroll view in flatlist wont move because new data added
   */

  componentWillMount () {
    qiscus.getRoomById(this.props.id).then(data => {
      try {
        const reversedData = data.comments.length > 0 ? [...data.comments].reverse() : []
        this.setState({
          data: reversedData,
          loading: false,
          lastMessageDate: data.comments[0].timestamp,
          type: this.props.typeRoom,
          photo: data.avatar
        })
      } catch (e) {
        this.setState({
          data: [],
          loading: false,
          type: this.props.typeRoom,
          photo: data.avatar
        })
      }
    }, err => {
      ToastAndroid.show(err)
    })
  }

  loadmore () {
    // const { data } = this.state
    // const temp = {
    //   "attachment": null,
    //   "avatar": "https://res.cloudinary.com/qiscus/image/upload/v1507272514/kiwari-prod_user_id_340/uvwlno1qkkgh9xwwjzgq.png",
    //   "before_id": 1618573,
    //   "date": "2018-03-08",
    //   "id": 1618608 + data.length,
    //   "isDelivered": true,
    //   "isFailed": false,
    //   "isPending": false,
    //   "isRead": true,
    //   "isSent": true,
    //   "is_deleted": false,
    //   "message": "again",
    //   "payload": null,
    //   "status": "read",
    //   "subtype": null,
    //   "time": "15:49 PM",
    //   "timestamp": "2018-03-08T08:49:14Z",
    //   "type": "text",
    //   "unique_id": "bq1520498953369",
    //   "username_as": "Qiscus Demo",
    //   "username_real": "guest@qiscus.com",
    // }
    // let tempData = [...data]
    // tempData.push(temp)
    // this.setState({
    //   data: tempData      
    // })
  }

  /**
   * to view date when last message received
   */
  renderDate () {
    let day =  moment(this.state.lastMessageDate).format('dddd')
    let dayDate =  moment(this.state.lastMessageDate).day()
    let month = moment(this.state.lastMessageDate).format('MMMM')
    let year = moment(this.state.lastMessageDate).year()
    let time = day + ', ' + month + ' ' + dayDate + ', ' + year
    return (
      <View style={styles.dateContainer}>
        <View style={styles.date}>
          <Text style={styles.textDate}>{time.toUpperCase()}</Text>
        </View>
      </View>
    )
  }

  profile () {
    ToastAndroid.show('right pressed', ToastAndroid.SHORT)
  }

  renderList () {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={ref => this.scrollView = ref}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8, paddingBottom: 12 }}
          data={this.state.data}
          renderItem={this.renderitem}
          keyExtractor={item => item.id}
          inverted // to show data from last index -> first index
          onEndReached={this.loadmore.bind(this)}
          onEndReachedThreshold={0.1}
          keyboardShouldPersistTaps='always'
          showsVerticalScrollIndicator={false}
        />
        {this.renderInput()}
    </View>
    )
  }

  renderitem = ({ item, index }) => {
    const { data } = this.state
    let isFirst
    if (index === data.length - 1) {
      isFirst = true
    } else if (data[index].username_real === data[index + 1].username_real) {
      isFirst = false
    } else {
      isFirst = true
    }
    return (
      <ListChat
        email={this.state.email}
        emailSender={item.username_real}
        type={this.state.type}
        message={item.message}
        time={item.time}
        isFirst={isFirst}
        name={item.username_as}
        photo={item.avatar}
        isDelivered={item.isDelivered}
        isFailed={item.isFailed}
        isPending={item.isPending}
        isRead={item.isRead}
        isSent={item.isSent}
        onLongPress={() => this.openMessageOption(item.message)}
      />
    )
  }

  openMessageOption (message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  renderInput () {
    const { message } = this.state
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {}}
          >
            <Image source={Images.attach} style={styles.imageButton} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 8 }}>
            <TextInput
              placeholder={I18n.t('placeholdermessage')}
              underlineColorAndroid='transparent'
              style={styles.input}
              value={this.props.value}
              onChangeText={(text) => this.setState({ message: text })}
              autoCapitalize='none'
              autoCorrect={false}
              multiline
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {}}
          >
            <Image source={Images.send} style={styles.imageButton} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const { data, loading, photo } = this.state
    let view, renderDate
    if (loading) {
      view = (
        <View />
      )
    } else {
      view = data.length > 1 ? this.renderList() : <EmptyState type='chat' />
      renderDate = data.length > 1 ? this.renderDate() : null
    }
    return (
      <View style={styles.container}>
        <Header
          title={this.state.name}
          showRightButton
          isLoading={loading}
          rightButtonImage={photo}
          onRightPress={() => this.profile()}
        />
        {renderDate}
        {view}
      </View>
    )
  }
}

export default ChatList
