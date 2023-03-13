import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonContainer:{
        flex:1,
        justifyContent: 'flex-end',
    },
    logoutButton: {
        backgroundColor: 'white',
        height: 55,
        width: width/1.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutButtonText: {
        fontWeight: '400',
        fontSize: 22,
    },
    profileContainer: {
        flex:2,
        height: height/1.75,
        width: width/1.3,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarContainer:{
        width: width/2,
        height: height/4.5,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 40,
    },
    avatar: {
        width: 256,
        height: 256,
    },
    editText: {
        paddingLeft: 170,
        marginBottom: 20,
        paddingBottom: 20,
        paddingTop: 15,
    },
    profileInfoContainer: {
        width: width/1.4,
        height: height/7,
        paddingBottom: 30,
        alignItems: 'center',
    },
    textContainer:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    nameText: {
        fontSize:28,
        fontWeight: 'bold'
    },
    emailText:{
        fontSize: 18,
        color: 'black'
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex:2,
        height: height/1.55,
        width: width/1.3,
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 3,
        elevation: 5,
        marginLeft: 28,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    input: {
        height: 50,
        width: width/2,
        borderWidth: 1,
        borderColor: 'green',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        borderWidth: 3,
        paddingLeft: 10
    },
    submitButton: {
        height: 60,
        backgroundColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 22,
    },
    
})

export default styles