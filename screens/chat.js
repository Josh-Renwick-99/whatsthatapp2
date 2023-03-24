import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
const {width, height} = Dimensions.get('window');

export default function ChatScreen1({ route, navigation }) {

  const {messageArray, membersArray} = route.params
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

  useEffect(() => {
    setMessages(messageArray)
  }, []);

  const renderItem = ({ item }) => {
    console.log(item)
  
    return (
      <TouchableWithoutFeedback>
        <View style={{ marginTop: 6 }}>
          <View
            style={{
              maxWidth: Dimensions.get('screen').width * 0.8,
              backgroundColor: '#3a6ee8',
              alignSelf: isSender ? 'flex-end' : 'flex-start',
              marginHorizontal: 10,
              padding: 10,
              borderRadius: 8,
              borderBottomLeftRadius: isSender ? 8 : 0,
              borderBottomRightRadius: isSender ? 0 : 8,
            }}
          >
        <Text style={{color:'#dfe4ea'}}>{item.sender}</Text>

            <Text
              style={{
                color: '#fff',
                fontSize: 16,
              }}
            >
              {item.message}
            </Text>
            <Text
              style={{
                color: '#dfe4ea',
                fontSize: 14,
                alignSelf: 'flex-end',
              }}
            >
              {item.time}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flex: 1, marginTop: 50, paddingLeft: 20, height: 40,backgroundColor: 'red'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height:50, width: 50,}} source={require("../assets/back-arrow.png")}/>
            </TouchableOpacity>
        </View>
        <View style={{ height: height / 1.2, paddingTop: 30, marginTop: 40 }}>
          <FlatList
            style={{ backgroundColor: '#f2f2ff' }}
            inverted={true}
            data={JSON.parse(JSON.stringify(messages)).reverse()}
            renderItem={renderItem}
          />
        </View>
  
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder='Message'
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={sendMessage}
            >
              <Icon name='send' type='material' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});