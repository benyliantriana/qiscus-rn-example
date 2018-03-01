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
import qiscus from '../libs/SDKCore';
import Comment from './Comment';

export default class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  componentWillMount() {
    qiscus.chatGroup(this.props.roomId).then((res) => {
      this.setState({ comments: res.comments });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.comments.map(comment=> {
            const isMe = comment.username_real === qiscus.user_id;
            return <Comment data={comment} key={comment.unique_id} isMe={isMe} />;
          })}
        </ScrollView>
        <View>
          <Text>Ini untuk comment form</Text>
        </View>
      </View>
    );
  }
}