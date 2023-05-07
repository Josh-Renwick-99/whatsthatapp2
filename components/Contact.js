import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Contact = ({item, removeContact, fromFindContacts, fromAddMemberChat, addMemberToChat, fromContacts, fromBlockList, addContact, blockContact, unblockContact}) => {

    const handleRemoveContact = () => {
      removeContact();
    }

    const handleAddContact = () => {
      addContact();
    }

    const handleBlockContact = () => {
      blockContact();
    }

    const handleUnblockContact = () => {
      unblockContact();
    }

    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.itemText, {fontWeight: 'bold'}]}>
            {item.given_name ? item.given_name : item.first_name} {item.family_name ? item.family_name : item.last_name}
          </Text>
          <Text style={[styles.itemText, {color:'gray', fontWeight:'700'}]}>
            {item.email}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {fromBlockList && (
            <TouchableOpacity style={styles.chatButton} onPress={() => handleUnblockContact()}>
              <Image style={{width: 38, height: 38, marginRight: 20,}} source={require('../assets/unblock-contact.png')}></Image>
            </TouchableOpacity>
          )}
          {fromContacts && (
            <>
              <TouchableOpacity style={styles.button} onPress={() => handleRemoveContact()}>
                <Image style={{width: 32, height: 32}} source={require('../assets/remove-contact.png')}></Image>
              </TouchableOpacity>  
              <TouchableOpacity style={styles.button} onPress={() => handleBlockContact()}>
                <Image style={{width: 32, height: 32}} source={require('../assets/block-contact.png')}></Image>
              </TouchableOpacity>
            </>
          )}
          {fromAddMemberChat && (
            <TouchableOpacity style={styles.button} onPress={() => console.log(item.user_id)}>
              <Image style={{width: 26, height: 26, marginTop:4,}} source={require('../assets/add-contact.png')}></Image>
            </TouchableOpacity>
          )}
          {fromFindContacts && (
            <TouchableOpacity style={styles.chatButton} onPress={() => handleAddContact()}>
              <Image style={{width: 38, height: 38, marginRight: 20,}} source={require('../assets/add-contact.png')}></Image>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

export default Contact

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#fff',
    },
    textContainer:{
        flex: 1,
    },
    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    itemText: {
      flex: 1,
      fontSize: 14,
      marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        alignItems: 'center'
    },
    button: {
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        alignItems: 'center'
      },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });