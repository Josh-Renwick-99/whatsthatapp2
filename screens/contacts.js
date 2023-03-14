import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, Modal, TouchableOpacity } from 'react-native';
import styles  from '../StyleSheets/contactsStyles'
import ContactList from '../components/ContactList'
import { getContacts } from '../util/Client'

const contacts = [
  {
    firstName: "Walter",
    lastName: "White",
    email: "wwhite@hotmail.com"
  },
  {
    firstName: "Jesse",
    lastName: "Pinkman",
    email: "jpinkman@gmail.com"
  },
  {
    firstName: "Gustavo",
    lastName: "Fring",
    email: "gfring@gmail.com"
  },
  {
    firstName: "Mike",
    lastName: "Ehrmantraut",
    email: "mehrmantraut@hotmail.com"
  },
  {
    firstName: "Saul",
    lastName: "Goodman",
    email: "Saulgoodman@yahoo.co.uk"
  },
  {
    firstName: "Kim",
    lastName: "Wexler",
    email: "kwexler@gmail.com"
  },
  {
    firstName: "Jimmy",
    lastName: "McGill",
    email: "jmcgill@yahoo.com"
  },
  {
    firstName: "Nacho",
    lastName: "Varga",
    email: "nacho.varga@gmail.com"
  },
  {
    firstName: "Hector",
    lastName: "Salamanca",
    email: "hector.salamanca@hotmail.com"
  },
  {
    firstName: "Tuco",
    lastName: "Salamanca",
    email: "t.salamanca@gmail.com"
  },
  {
    firstName: "Lalo",
    lastName: "Salamanca",
    email: "lalo.salamanca@yahoo.com"
  },
  {
    firstName: "Hank",
    lastName: "Schrader",
    email: "h.schrader@gmail.com"
  },
  {
    firstName: "Marie",
    lastName: "Schrader",
    email: "marie.schrader@hotmail.com"
  },
  {
    firstName: "Skyler",
    lastName: "White",
    email: "skyler.white@yahoo.com"
  },
  {
    firstName: "Ted",
    lastName: "Beneke",
    email: "tbeneke@gmail.com"
  },
  {
    firstName: "Lydia",
    lastName: "Rodarte-Quayle",
    email: "lrodartequayle@hotmail.com"
  }
];

const handleFindContacts = () => {
}

const ContactsScreen = () => {  
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const contact = await getContacts();
    }
    fetchContacts()
  })
  console.log(modalVisible)

  return (
    <View style={{flex: 1, paddingTop: 50, backgroundColor: '#FFF'}}>
      {!modalVisible && (
      <><View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>Find Contacts</Text>
          </TouchableOpacity>
        </View><ContactList contacts={contacts} fromContacts></ContactList></>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
            <TouchableOpacity style={[styles.submitButton, {marginLeft: 10}]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ContactsScreen;

