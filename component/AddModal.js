/* eslint-disable quotes */
/* eslint-disable react/no-string-refs */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import{
  View,
  Text,
  TextInput,
}from 'react-native';

import{
  Button, 
  Icon
  } from 'native-base';

import Modal from 'react-native-modalbox';
import flatListData from '../data/flatListData';
import { globalStyles } from '../global/style';


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
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});        
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
                <Button transparent style={globalStyles.closebutton} onPress={() => { this.refs.myModal.close();}}><Icon style={{fontSize: 28, color: 'white'}} name="close" /></Button>
                <View style={globalStyles.modalview}>
                  <Text style={globalStyles.textbox}>New information</Text>
                  <TextInput
                        style={globalStyles.textinput}
                        placeholder="Enter the name"
                        onChangeText={(text) => this.setState({ myname: text })}
                    />
                    <Button
                        style={globalStyles.savebutton}
                        onPress={() => {
                            if (this.state.myname.length == 0){ alert("You must enter your name");
                                return;
                            }    
                            const newKey = this.generateKey(24);
 
                            const newName = {
                                key: newKey,
                               name: this.state.myname,
                            };    
                            flatListData.push( newName);    
                            this.props.parentFlatList.refreshFlatList(newKey);                                
                            this.refs.myModal.close();                                                                       
                        }}>
                    <Text style={{color: 'white', fontSize: 18, marginLeft: 20}}>Save</Text> 
                    </Button>
                </View>
            </Modal>
        );
    }
}
export default AddModal;
