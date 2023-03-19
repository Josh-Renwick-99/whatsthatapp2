import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
    },
    chatListContainer: {
        height: height/1.2,
        marginTop: 80,
    },
    topContainer: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 50,
        paddingLeft: 315,
    },
    image: {
        height:64,
        width: 64,
    },
    modalContainer: {
        flex:1,
        marginTop: 20,
        height: height/3,
        width: width/1.2,
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
        marginTop: 10,
        paddingTop: 10,
    },
    buttonContainer: {
        flex: 1,
        height: 100,
        marginLeft: 10,
    },
    button: {
        borderRadius: 12,
        borderWidth: 3,
        borderColor: 'green',
        height: 30,
        width: width/ 3,
        alignItems:'center',
        marginBottom: 15,
    },
    modalTopContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 65,
        paddingTop: 10,
    },
    textInput: {
        height: 30,
        width: width/ 2,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 12,
        borderWidth: 3,
        marginTop: 50,
      },
})

export default styles