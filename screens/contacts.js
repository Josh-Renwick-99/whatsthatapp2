import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, Modal, TouchableOpacity } from 'react-native';
import styles  from '../StyleSheets/contactsStyles'
import ContactList from '../components/ContactList'
import { getContacts, getUsers } from '../util/Client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addContact, removeContact, getBlockedContacts, postBlockContact, deleteBlockedContact } from '../util/Client';

function ContactsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [blockedModalVisible, setBlockedModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [blocked, setBlocked] = useState([])

  useEffect(() => {
    const fetchContactsAndUsers = async () => {
      const cList = await getContacts();
      const uList = await getUsers();
      const bList = await getBlockedContacts();
      const userId = await AsyncStorage.getItem("WhatsThat_usr_id")
      const filteredList = uList.filter(user => !cList.some(contact => contact.user_id === user.user_id));
      const bFilteredList = filteredList.filter(user => !bList.some(contact => contact.user_id === user.user_id) )
      setContacts(cList);
      setUsers(bFilteredList);
      console.log(bList)
      setBlocked(bList)
    };
    fetchContactsAndUsers();
  }, []);

  const handleFindContacts = async () => {
    setModalVisible(true);
  };

  const handleViewBlockedContacts = async () => {
    setBlockedModalVisible(true);
  }

  const handleAddContact = (contact) => {
    const cList = [...contacts];
    cList.push(contact)
    const filteredUsers = users.filter(user => !cList.includes(user));
    setUsers(filteredUsers)
    setContacts(cList)
    addContact(contact.user_id)
  }

  const handleRemoveContact = (contact) => {
    const uList = [...users]; 
    uList.push(contact);
    const cList = [...contacts]
    const updatedList = cList.filter((c) => c !== contact);
    setUsers(uList);
    setContacts(updatedList)
    removeContact(contact.user_id);
  }

  const handleBlockContact = (contact) => {
    const cList = [...contacts]
    const updatedList = cList.filter((c) => c !== contact);
    const bList = [...blocked]
    bList.push(contact)
    setBlocked(bList)
    setUsers(updatedList);
    setContacts(updatedList)
    postBlockContact(contact.user_id);
  }


  const handleUnblockContact = (contact) => {
    const bList = [...blocked]
    const updatedList = bList.filter((c) => c !== contact);
    setBlocked(updatedList)
    const uList = [...users]
    uList.push(contact)
    setUsers(uList)
    deleteBlockedContact(contact.user_id)
  }

  return (
    <View style={{flex: 1, paddingTop: 50, backgroundColor: '#FFF'}}>
      {(!modalVisible && !blockedModalVisible) && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={() => handleViewBlockedContacts()}>
              <Text style={styles.text}>View Blocked</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={() => handleFindContacts()}>
              <Text style={styles.text}>Find Contacts</Text>
            </TouchableOpacity>
          </View>
            <ContactList 
            key={contacts.length} 
            contacts={contacts} 
            handleRemoveContact={(contact) => handleRemoveContact(contact)}
            handleBlockContact={(contact) => handleBlockContact(contact)}
            fromContacts/>
        </>
      )}
      {
        //find contacts modal
      }
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalListContainer}>
          <View style={{alignItems: 'center', paddingBottom: 20,}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>Find Contacts</Text>
            </View>
            <ContactList 
              contacts={users}
              fromFindContacts 
              handleAddContact={(contact) => handleAddContact(contact)} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {
        //blocked list modal
      }
      <Modal animationType="slide" transparent={true} visible={blockedModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalListContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>Blocked Contact List</Text>
            </View>
            <ContactList 
              contacts={blocked}
              handleUnblockContact={(contact) => handleUnblockContact(contact)}
              fromBlockList 
          />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setBlockedModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ContactsScreen;

