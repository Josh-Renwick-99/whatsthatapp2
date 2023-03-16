import React, { useState, useEffect } from 'react';
import { View, Text, SectionList } from 'react-native';
import styles  from '../StyleSheets/contactsStyles'
import Contact from '../components/Contact'
const ContactList = ({contacts, fromContacts, fromBlockList, handleAddContact, handleRemoveContact, handleBlockContact, handleUnblockContact}) => {
    const [data, setData] = useState(contacts); 
    
    const sections = data.reduce((acc, contact) => {
        const letter = contact.last_name ? contact.last_name.charAt(0).toUpperCase() : contact.family_name.charAt(0).toUpperCase();
        const sectionIndex = acc.findIndex(section => section.title === letter);
        if (sectionIndex >= 0) {
        acc[sectionIndex].data.push(contact);
        } else {
        acc.push({ title: letter, data: [contact] });
        }
        return acc;
  }, []);

  const renderSectionHeader = ({ section }) => (
    <View style={{ backgroundColor: 'lightgray', padding: 10,}}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'green' }}>{section.title}</Text>
    </View>
  );

  const removeContact = (item, fromModal) => {
    const updatedData = data.filter((c) => c !== item);
    setData(updatedData);
    if (!fromModal) {
      console.log("here")
      handleRemoveContact(item);
    }
  };

  const addContact = async (item) => {
    handleAddContact(item)
    removeContact(item, true)
  }

  const blockContact = async (item) => {
    handleBlockContact(item)
    removeContact(item, true)
  }

  const unblockContact = async (item) => {
    const updatedData = data.filter((c) => c !== item);
    setData(updatedData)
    handleUnblockContact(item)
  }

  const renderItem = ({ item }) => (
    <Contact 
        item={item} 
        removeContact={() => removeContact(item)}
        addContact={() => addContact(item)}
        blockContact={() => blockContact(item)}
        unblockContact={() => unblockContact(item)}
        fromContacts = {fromContacts}
        fromBlockList = {fromBlockList}
        >
    </Contact>
  );

  return (
      <View style={styles.listContainer}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
  );
};

export default ContactList