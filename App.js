/* eslint-disable react/no-string-refs */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import{
  Container,
  Header,
  Body,
  Title,
  CheckBox,
  Left,
  Button,
  Icon
  } from 'native-base';

import flatListData from './data/flatListData';
import AddModal from './component/AddModal';
import EditModal from './component/EditModal'

class FlatListItem extends React.Component {
  constructor(props) {
      super(props); 
      this.state = {
        activeRowKey: null,  //this state saved key of deleting object
        numberOfRefresh: 0,
        selectedLang:false,
      }  
         
  }
  refreshFlatListItem = () => {
    this.setState((prevState) => {
        return {
            numberOfRefresh: prevState.numberOfRefresh + 1
        };
    });        
}
  render(){
    const {selectedLang} = this.state;

    return(
      <View style={styles.flatlistview}>

        <CheckBox checked={selectedLang} style={styles.checkbox} onPress={()=>this.setState({selectedLang:!selectedLang})}/>

         <Text style={{...styles.checkBoxTxt,
                color:this.state.selectedLang?"white":"white",
                textDecorationLine:this.state.selectedLang? "line-through" :"none"
              }}>{this.props.item.name}</Text>

         <TouchableOpacity onPress={() => {                            
                        // alert("Update");
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                    }} style={styles.editbutton}><Text style={styles.edittext}>Edit</Text></TouchableOpacity>
         
         <TouchableOpacity onPress={() => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                flatListData.splice(this.props.index, 1);  //Remove object from array
                                //Refresh FlatList ! 
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    } 
                 } style={styles.noteDelete}>
             <Text style={styles.noteDeleteText}>Delete</Text>
         </TouchableOpacity>
      </View>
  
    );
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
     this.state = ({
            deletedRowKey: null,    //intialized the state        
        });
    this.onPressAdd = this.onPressAdd.bind(this);
  }
  onPressAdd(){
    this.refs.addModal.showAddModal();
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
        return {
            deletedRowKey: activeKey
        };
    });
}

  render(){
    return(
      <Container>
         <View style={{flex: 1}}>
        <Header>
        <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{alignItems: 'center'}}>
            <Title >Todo Application</Title>
          </Body>
        </Header>
        <TouchableOpacity onPress={this.onPressAdd}  style={styles.button} >
            <Text style={{color: 'white'}}>Create Todo</Text>
        </TouchableOpacity>
        
        <FlatList
        data={flatListData}
        renderItem={({item,index}) =>{
          return (
          <FlatListItem item={item} index={index} parentFlatList={this} ></FlatListItem>
          )
        } }
        ></FlatList>
        <AddModal ref={'addModal'} parentFlatList={this}></AddModal>
        <EditModal ref={'editModal'} parentFlatList={this}></EditModal>
      </View>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  flatlistview:{
    backgroundColor: 'green',
    margin: 20,
    marginBottom: 0,
    padding:10,
    flexDirection:"row",    
  },
  button: {
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
    width: 100,
    backgroundColor: 'blue',

  },
  noteDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2980b9',
      padding: 10,
      top: 10,
      right: 10,
      bottom: 10,
  },
  noteDeleteText: {
      color: 'white',
  },
  editbutton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    right: 80,
    bottom: 10,
  },
  edittext: {
    color: 'white',
  },

  checkBoxTxt:{
    marginLeft:20
  },
  checkbox:{
     color: 'white',
  },


  });
  
export default App;