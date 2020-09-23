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
  RefreshControl,
  ScrollView,
} from 'react-native';

import{
  Container,
  Header,
  Body,
  Title,
  } from 'native-base';


import flatListData from './data/flatListData';
import AddModal from './component/AddModal';
import EditModal from './component/EditModal';
import FlatListItem from './component/FlatListItem';



const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

class App extends React.Component{
  constructor(props){
    super(props);
     this.state = ({
            deletedRowKey: null,    //intialized the state 
            refreshing: false,    
        });
    this.onPressAdd = this.onPressAdd.bind(this);
  }
  onPressAdd(){
    this.refs.addModal.showAddModal();
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
        return {
            deletedRowKey: activeKey,
        };
    });
    this.refs.flatList.scrollToEnd();
}
_onRefresh = () => {
  this.setState({refreshing: true});
  wait(2000).then(() => {
    this.setState({refreshing: false});
  });
}
  render(){
    return(
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    }
    >
      <Container>
         <View style={{flex: 1}}>
        <Header>
          <Body style={{alignItems: 'center'}}>
            <Title >Todo Application</Title>
          </Body>
        </Header>
        <TouchableOpacity onPress={this.onPressAdd}  style={styles.button} >
            <Text style={{color: 'white'}}>Create Todo</Text>
        </TouchableOpacity>
      
        <FlatList
        ref={'flatList'}
        data={flatListData}
        renderItem={({item,index}) =>{
          return (
          <FlatListItem item={item} index={index} parentFlatList={this} ></FlatListItem>
          )
        } 
      }
        ></FlatList>
      
        <AddModal ref={'addModal'} parentFlatList={this}></AddModal>
        <EditModal ref={'editModal'} parentFlatList={this}></EditModal>
      </View>
      </Container>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
    width: 100,
    backgroundColor: 'blue',

  },
  });
  
export default App;