/* eslint-disable quotes */
/* eslint-disable react/no-string-refs */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import{
  View,
  Text,
  StyleSheet,
  TextInput,
}from 'react-native';

import{
  Button, Right,
  } from 'native-base';

import Modal from 'react-native-modalbox';
import flatListData from '../data/flatListData';

class AddModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myname: '',
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                  flex: 1,
                  backgroundColor: '#000000aa',
                }}
                position='center'
                backdrop={true}
            >
                <Button transparent style={styles.closebutton} onPress={() => { this.refs.myModal.close();}}><Text style={{fontSize: 20, color: 'white'}}>X</Text></Button>
                <View style={styles.modalview}>
                  <Text style={styles.textbox}>New information</Text>
                  <TextInput
                        style={styles.textinput}
                        placeholder="Enter the name"
                        onChangeText={(text) => this.setState({ myname: text })}
                    />
                    <Button
                        style={styles.savebutton}
                        onPress={() => {
                            if (this.state.myname.length == 0){ alert("You must enter your name");
                                return;
                            }     
                            const newName = {
                               name: this.state.myname,
                            };    
                            flatListData.push( newName);    
                            this.props.parentFlatList.refreshFlatList();                                
                            this.refs.myModal.close();                                                                       
                        }}>
                    <Text style={{color: 'white', fontSize: 18, marginLeft: 20}}>Save</Text> 
                    </Button>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
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
        color: 'white'
    }
  })
  
  export default AddModal;
