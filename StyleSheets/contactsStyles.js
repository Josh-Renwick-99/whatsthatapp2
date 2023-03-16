import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#fff',
    },
    listContainer: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 50,
        height: 60,
        width: 280,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      leftButton: {
        justifyContent: 'flex-start'
      },
      rightButton: {
        justifyContent: 'flex-end'
      },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex:1,
        marginTop: 20,
        height: height/1.15,
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
    closeButton: {
        borderRadius: 12,
        borderWidth: 3,
        borderColor: 'green',
        alignItems:'center',
        height: 30,
        width: width/ 3,
        marginLeft: 10, 
        marginTop: 20,
        marginBottom: 10,
    },
    modalListContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#FFF',
        width: width/ 1.25,
        height: height /1.3,
    }
});

export default styles;