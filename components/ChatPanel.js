import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  Platform,
  Image } from 'react-native';
import styles from './styles';
import qiscus from '../libs/SDKCore';
import Comment from './Comment';

export default class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newMessageText: '',
      isSending: false,
    };
  }
  componentWillMount() {
    qiscus.chatGroup(this.props.roomId).then((res) => {
      this.setState({ comments: res.comments });
    });
  }
  setNewMessageText(text) {
    if (text.length > 0) {
      qiscus.publishTyping(1);
    } else {
      qiscus.publishTyping(0);
    }
    this.setState({newMessageText: text});
  }
  sendComment() {
    qiscus.sendComment(qiscus.selected.id, this.state.newMessageText)
      .then(() => this.setState({newMessageText: ''}));
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.comments.map((comment, index)=> {
            const isMe = comment.username_real === qiscus.user_id;
            const showAvatar = 
              index === 0 || comment.username_real !== this.state.comments[index-1].username_real
              ? true : false;
            return <Comment data={comment} 
              showAvatar={showAvatar}
              key={comment.unique_id} isMe={isMe} />;
          })}
        </ScrollView>
        {/* start of comment form */}
        <View style={style.commentForm}>
          {/* comment input*/}
          <View style={style.commentInput}>
            <TextInput underlineColorAndroid='transparent'
              onBlur={Keyboard.dismiss()}
              value={this.state.newMessageText} placeholder="Say something" multiline={true}
              onChangeText={this.setNewMessageText.bind(this)}
            />
          </View>
          {/* uploader */}
          {this.state.isSending ? 
            null : 
            <TouchableOpacity style={{padding: 2}} 
              onPress={() => {
                Keyboard.dismiss(); 
                Platform.OS === 'android' 
                  ? this.sendMessage() 
                  : null;
                }
              }>
              <Icon name="send" size={30} style={[{marginRight: 5, color: '#bbb'}]}/>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const style = {
  commentForm: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 15,
  }
};