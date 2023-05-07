import React, { useState, useEffect, useSyncExternalStore } from 'react';
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
  Modal
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getContacts, getUserInfo, addMemberToChat, postChatMessage, getChatDetails, deleteMemberFromChat } from '../util/Client';
import ContactList from '../components/ContactList';
const {width, height} = Dimensions.get('window');

export default function ChatScreen1({ route, navigation }) {

  const {messageArray, membersArray, chat} = route.params
  const [messages, setMessages] = useState([])
  const [members, setMembers] = useState(membersArray)
  const [inputMessage, setInputMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [addMemberModal, setAddMemberModalVisible] = useState(false)
  const [contacts, setContacts] = useState([]);


  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    const updateChat = async () => {
      await postChatMessage(chat, inputMessage)
      const details = await getChatDetails(chat)
      updateMessages(details.messages)
    }
    updateChat()
    setInputMessage('');
  }

  const updateMessages = (m) => {
    setMessages(m)
  }

  const updateMembers = (m) => {
    setMembers(m)
  }

  const handleAddMember = async (id) => {
    await addMemberToChat(chat, id)
  }

  const handleRemoveMember = async (id) => {
    const currId =  await AsyncStorage.getItem('WhatsThat_usr_id')
    if (id.toString() === currId) {
      console.log("here")
      await route.params.handleRemoveChat(id)
      setModalVisible(false)
      navigation.goBack()
    }
    await deleteMemberFromChat(chat, id)
  }

  useEffect(() => {
    setMessages(messageArray)
    setMembers(membersArray)
    const fetchAuthor = async () => {
      const userId = await AsyncStorage.getItem("WhatsThat_usr_id")
      setAuthor(userId)
    }
    const fetchContacts = async () => {
      setContacts(await getContacts())
    }
    fetchAuthor()
    fetchContacts()
  }, []);

  const renderItem = ({ item }) => {
    const isSender = author === item.author.user_id.toString();
  
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
        <Text style={{color:'#dfe4ea'}}>{item.author.first_name} {item.author.last_name}</Text>

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
      <View style={styles.container}>
        <View style={{flex: 1, marginTop: 50, paddingLeft: 20, height: 60, paddingBottom: 15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height:50, width: 50,}} source={require("../assets/back-arrow.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={{height:50, width: 50, marginLeft: 300}} source={require("../assets/info.png")}/>
            </TouchableOpacity>
        </View>
        <View style={{ height: height / 1.5, paddingTop: 45, marginTop: 20, paddingBottom: 50 }}>
          <FlatList
            style={{ backgroundColor: '#f2f2ff' }}
            inverted={true}
            data={JSON.parse(JSON.stringify(messages))}
            renderItem={renderItem}
          />
        </View>
        <View style={{paddingTop: 20, bottom: 0}}>
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
        <InfoModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        members={members} 
        handleRemoveMember={handleRemoveMember} 
        addMemberModal={addMemberModal} 
        setAddMemberModalVisible={setAddMemberModalVisible} 
        contacts={contacts}
        handleAddMember = {handleAddMember}
        fromAddMemberChat />
      </View>
  );
}

const InfoModal = ({ modalVisible, setModalVisible, members, handleRemoveMember, handleAddMember, addMemberModal, setAddMemberModalVisible, contacts, fromAddMemberChat }) => {

  const [chatMembers, setChatMembers] = useState(members)

  const addMember = async (item) => {
    await handleAddMember(item.user_id)
    const mList = [...chatMembers]
    const updatedList = mList.push(id)
    setChatMembers(updatedList)
  }

  const removeMember = async (id) => {
    await handleRemoveMember(id)
    const mList = [...chatMembers]
    const updatedList = mList.filter((item) => item.user_id !== id);
    setChatMembers(updatedList)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.memberItem}>
        <View style={styles.memberInfo}>
          <Text>{item.first_name} {item.last_name}</Text>
          <Text>{item.email}</Text>
        </View>
        <TouchableOpacity onPress={() => removeMember(item.user_id)} style={styles.removeMember}>
          <Image style={{width: 26, height: 26, marginTop:4,}} source={require('../assets/add-contact.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image source={require("../assets/back-arrow.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Members:</Text>
            <FlatList
              data={chatMembers}
              renderItem={renderItem}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setAddMemberModalVisible(true)}>
                <Text>Add member to chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={addMemberModal}
        onRequestClose={() => setAddMemberModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setAddMemberModalVisible(false)}>
              <Image source={require("../assets/remove-contact.png")} style={{ height: 32, width: 32, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <View style={{flex: 1, width: 270,}}>
              <ContactList
                contacts = {contacts}
                fromAddMemberChat = {fromAddMemberChat}
                addMember = {addMember}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60
  },
  
  messageInput: {
    height: 60,
    flex: 1,
    paddingHorizontal: 25,
    marginBottom: 200,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    height: '40%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 10
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeMember: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flex: 1,

  },
  modalButton: {
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200
  }
});