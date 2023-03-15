import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, Modal, TouchableOpacity } from 'react-native';
import styles  from '../StyleSheets/contactsStyles'
import ContactList from '../components/ContactList'
import { getContacts, getUsers } from '../util/Client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addContact, removeContact } from '../util/Client';

function ContactsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchContactsAndUsers = async () => {
      const cList = await getContacts();
      const uList = await getUsers();
      const userId = await AsyncStorage.getItem("WhatsThat_usr_id")
      const filteredList = uList.filter(user => !cList.some(contact => contact.user_id === user.user_id));
      setContacts(cList);
      setUsers(filteredList);
    };
    fetchContactsAndUsers();
  }, []);

  const handleFindContacts = async () => {
    setModalVisible(true);
  };

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


  return (
    <View style={{flex: 1, paddingTop: 50, backgroundColor: '#FFF'}}>
      {!modalVisible && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleFindContacts()}>
              <Text style={styles.text}>Find Contacts</Text>
            </TouchableOpacity>
          </View>
          <ContactList 
          key={contacts.length} 
          contacts={contacts} 
          handleRemoveContact={(contact) => handleRemoveContact(contact)}
          fromContacts/>
        </>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalListContainer}>
            <ContactList 
              contacts={users} 
              handleAddContact={(contact) => handleAddContact(contact)} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ContactsScreen;

