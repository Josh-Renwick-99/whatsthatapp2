import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ChatPreview = ({chatName, lastMessage, lastMessageAuthor, viewChat}) => {

    return(
        <View style={styles.previewContainer}>
            <TouchableOpacity onPress={() => viewChat()}>
                <Text style={styles.nameText}>{chatName}</Text>
                {(lastMessage && lastMessageAuthor) && (
                <View style={styles.lastMessageContainer}>
                    <Text style={styles.lastMessageAuthor}>{lastMessageAuthor}: </Text>
                    <View style={styles.lastMessageTextContainer}>
                        <Text style={styles.lastMessageText}>{lastMessage}</Text>
                    </View>
                </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ChatPreview

const styles = StyleSheet.create({
    previewContainer: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    lastMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      lastMessageAuthor: {
        fontWeight: 'bold',
        marginRight: 5
      },
      lastMessageText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '700'
      }
})