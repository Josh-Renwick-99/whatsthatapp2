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
        height: 60,
        width: 120,
        marginLeft: 280,
        justifyContent: 'center'
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex:2,
        marginTop: 20,
        height: height/1.2,
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
    },
});

export default styles;