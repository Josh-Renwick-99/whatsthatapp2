import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import styles from '../StyleSheets/chatsStyles'
import ChatPreview from '../components/ChatPreview'
import { postChat, getChats } from '../util/Client';

const ChatsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatPreviewData, setChatPreviewData] = useState([])
  const [chatName, setChatName] = useState('')

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats()
      setChatPreviewData(chats)
    }
    fetchChats()
    console.log(chatPreviewData)
  }, [])

  const handleNewChat = async  () => {
    await postChat(chatName)
    const chats = getChats()
    setChatPreviewData(chats)
    //setModalVisible(false)
  }

  const renderItem = (item) => {
    const { name, last_message } = item;
    const { message, author } = last_message || {};
    return (
      <ChatPreview
        chatName={name}
        lastMessage={message}
        lastMessageAuthor={author?.name}
      />
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={styles.image} source={require('../assets/new-chat.png')}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.chatListContainer}>
        <FlatList
          data={chatPreviewData}
          keyExtractor={(item, index) => item.chat_id.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTopContainer}>
            <Text style={{fontSize: 18, marginTop: 10, fontWeight: 'bold'}}>Create new chat</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="  Chat Name: "
                onChangeText={(text) => setChatName(text)}
              />
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNewChat()}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                  setModalVisible(false)
                  setChatName('')
                }}
              >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ChatsScreen;