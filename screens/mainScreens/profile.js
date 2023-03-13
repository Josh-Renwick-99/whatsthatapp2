  import React, { useState, useEffect } from 'react';
  import { 
    ImageBackground,
    Image, 
    Pressable, 
    Text, 
    View, 
    TextInput,
    Button,
    ToastAndroid,
    TouchableOpacity
    } from 'react-native';
  import Modal from "react-native-modal";
  import { postLogout, postAvatar, getAvatar, getUserInfo, patchUserInfo } from '../../util/Client';
  import { useNavigation } from "@react-navigation/native";
  import styles from '../../StyleSheets/profileScreenStyles';
  import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const [avatar, setAvatar] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [stagedFirstName, setStagedFirstName] = useState('')
  const [stagedLastName, setStagedLastName] = useState('')
  const [stagedEmailName, setStagedEmailName] = useState('')
  const [stagedPassword, setStagedPassword] = useState('')

  useEffect(() => {
    getAvatar(handleSetAvatar)
    getUserInfo(handleProfileUpdate)
  })

  const handleProfileUpdate = (first_name, last_name, email) => {
    setFirstName(first_name)
    setLastName(last_name)
    setEmail(email)
  }

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const respose = await postAvatar(blob, handleSetAvatar(result.uri), showToast)
    } 
  };

  const handleSetAvatar = (uri) => {
    setAvatar(uri)
  }

  const handleLogout = async () => {
    try {
      await postLogout()
      navigation.navigate('root')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitEdit = async () => {
    patchUserInfo(
      showToast,
      stagedFirstName ? stagedFirstName : firstName,
      stagedLastName ? stagedLastName : lastName, 
      stagedEmailName ? stagedEmailName : email, 
      stagedPassword)
    setStagedEmailName('')
    setStagedFirstName('')
    setStagedLastName('')
    setStagedPassword('')
    setTimeout(() => {
      setModalVisible(false)}, 500);
  }

  const handleCloseEdit = async () => {
    setModalVisible(false)
    setStagedEmailName('')
    setStagedFirstName('')
    setStagedLastName('')
    setStagedPassword('')
  }


  return (
    <ImageBackground source={require('./profileBackground.jpg')} blurRadius={modalVisible ? 4 : 0} style={{flex: 1}}>
      <View style={styles.container}>
      {!modalVisible && (
        <><View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={avatar ? { uri: avatar } : require('./defaultAvatar.png')}
                resizeMode="contain" />
            </View>
            <View style={styles.editText}>
              <Pressable onPress={pickImage}>
                <Text style={{ color: 'blue' }}>Edit Avatar</Text>
              </Pressable>
            </View>
            <View style={styles.profileInfoContainer}>
              <View style={styles.textContainer}>
                <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} style={styles.nameText}>{firstName} {lastName}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} style={styles.emailText}>{email}</Text>
              </View>
            </View>
          </View><View style={styles.buttonContainer}>
              <View>
                <View style={styles.logoutButton}>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Text style={styles.logoutButtonText}>Edit Profile</Text>
                  </Pressable>
                </View>
              </View>
              <View>
                <View style={styles.logoutButton}>
                  <Pressable onPress={() => handleLogout()}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                  </Pressable>
                </View>
              </View>
            </View></>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile:</Text>
              <TextInput
                label="FirstName" 
                style={styles.input}
                value={stagedFirstName ? stagedFirstName : firstName}
                onChangeText={(text) => setStagedFirstName(text)}
              />
              <TextInput
                label="LastName"
                style={styles.input}
                value={stagedLastName ? stagedLastName : lastName}
                onChangeText={(text) => setStagedLastName(text)}
              />
              <TextInput
                label="EmailAddress"
                style={styles.input}
                value={stagedEmailName ? stagedEmailName : email}
                onChangeText={(text) => setStagedEmailName(text)}
              />
              <TextInput
                label="Password"
                style={styles.input}
                placeholder="Enter password"
                onChangeText={(text) => setStagedPassword(text)}
                secureTextEntry
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmitEdit()}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitButton, {marginLeft: 10, backgroundColor: 'red'}]} onPress={() => handleCloseEdit()}>
                  <Text style={styles.submitButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

export default ProfileScreen;
