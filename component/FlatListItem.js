/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import{
View,
Text,
TouchableOpacity,
Alert,
StyleSheet,
}from 'react-native';

import{
    CheckBox,
} from 'native-base';

 import flatListData from '../data/flatListData';
 import Icon from 'react-native-vector-icons/FontAwesome';

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
  
           <Text
                  style={{...styles.checkBoxTxt,
                  color:this.state.selectedLang?"white":"white",
                  textDecorationLine:this.state.selectedLang? "line-through" :"none"
                }}>
                    {this.props.item.name}
            </Text>
  
           <TouchableOpacity onPress={() => {                            
                          // alert("Update");
                          this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                      }} style={styles.editbutton}>
                        <Icon style={styles.edittext} name="edit" />
                       </TouchableOpacity>
           
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
                      <Icon style={styles.noteDeleteText} name='trash' />
           </TouchableOpacity>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    flatlistview:{
      backgroundColor: 'green',
      margin: 20,
      marginBottom: 0,
      padding:10,
      flexDirection: 'row',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        top: 10,
        right: 10,
        bottom: 10,
    },
    noteDeleteText: {
        color: '#8B0000',
        fontSize: 20,
    },
    editbutton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      top: 10,
      right: 40,
      bottom: 10,
    },
    edittext: {
      color: 'orange',
      fontSize: 20,
    },
    checkBoxTxt:{
      marginLeft:20,
    },
    checkbox:{
       color: 'white',
    },
    });

export default FlatListItem;