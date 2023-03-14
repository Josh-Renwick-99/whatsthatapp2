import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Contact = ({item, removeContact}) => {

    const handleRemoveContact = () => {
        removeContact();
    }

        return(
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.itemText}>{item.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.chatButton} onPress={() => console.log("Chatting")}>
                <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveContact()}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>     
            </View>
        </View>
    )
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
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    itemText: {
      flex: 1,
      fontSize: 16,
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
    chatButton: {
        backgroundColor: 'green',
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