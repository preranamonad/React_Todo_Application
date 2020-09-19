/* eslint-disable prettier/prettier */



import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    modalview: {
        justifyContent: 'center',
        backgroundColor: 'white',
        top: 200,
        left: 60,
        width: 300,
        height: 250,
    },
    textbox: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 30,
    },
    textinput: {
        height: 40,
      borderColor: 'grey',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
    },
    savebutton:{
      fontSize: 18, 
      color: 'white',
      padding: 8,
      marginLeft: 170,
      marginTop: 20,
      width: 100,
      height: 40,
      backgroundColor: 'mediumseagreen',
    },
    closebutton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'white',
    }
  });