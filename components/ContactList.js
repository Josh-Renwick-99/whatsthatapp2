import React, { useState, useEffect } from 'react';
import { View, Text, SectionList } from 'react-native';
import styles  from '../StyleSheets/contactsStyles'
import Contact from '../components/Contact'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContactList = ({contacts, fromContacts}) => {
    const [data, setData] = useState(contacts);

    const sections = data.reduce((acc, contact) => {
        const letter = contact.lastName.charAt(0).toUpperCase();
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

  const removeContact = (contact) => {
    const updatedData = data.filter((c) => c !== contact);
    setData(updatedData);
  };

  const renderItem = ({ item }) => (
      <Contact 
        item={item} 
        removeContact={() => removeContact(item)}>
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