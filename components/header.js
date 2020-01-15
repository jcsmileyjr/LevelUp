import React, { useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Modal, AsyncStorage } from 'react-native';
import goals from '../data/goals.js';// FOR DEVELOPMENT, example list of sample learning path

import {Text, Header, Left, Body, Right, Button, Icon, Grid, Row, Col} from 'native-base';

const Head = (props) => {
  const [isVisible, setModalVisble] = useState(false);
  const [isSettingVisible, setSettingVisble] = useState(false);
  const changeModalVisible = () => { setModalVisble(!isVisible)};
  const changeSettingVisible = () => {setSettingVisble(!isSettingVisible)}
  
  resetData = async () => {
    const resetGoals = {};
    await AsyncStorage.setItem("userGoals",JSON.stringify(resetGoals));//Save sample learning path to local storage
    const testing = []
    await AsyncStorage.setItem("achievements",JSON.stringify(testing));
  }
  
    return(
        <View>
        {/*Displays the App's Title, current section, and menu button */}
            <Header style={styles.headerStyles}>
                <Left style={styles.headerAddGoal}>
                    <Button iconLeft transparent onPress={() => props.navigation.navigate("Planning")}>
                        <Icon style={{fontSize:30}} name='md-add' />
                    </Button>
                    <Text style={styles.headerAddGoalText}>Create Goal</Text>
                </Left>
                <Body style={ styles.headerSection}><Text style={[styles.headerText, styles.headerTitle]} onPress={()=> props.navigation.navigate("Goal")}>Level Up Dev</Text></Body>
                <Right style={styles.headerMenu}>
                    <Button transparent onPress={() => setModalVisble(!isVisible)}>
                        <Icon name='menu' />
                    </Button>
                </Right>
            </Header>
            <View style={styles.modalStyle}>
              <Modal  animationType="slide" 
                      visible={isVisible}
                      transparent={true}>
                  <View style={styles.modalContentStyle}>
                    <Grid>
                      <Row>
                        <Col><Icon name="home" style={styles.iconStyle} onPress={()=> {props.navigation.navigate("Goal"); setModalVisble(false);}} /></Col>
                        <Col><Icon name="add" style={styles.iconStyle} onPress={()=> {props.navigation.navigate("Planning"); setModalVisble(false);}} /></Col>
                        <Col><Icon name="md-trophy" style={styles.iconStyle} onPress={()=> {props.navigation.navigate("Progress"); setModalVisble(false);}} /></Col>
                      </Row>
                      <Row>
                        <Col><Text style={styles.iconText}>View Goals</Text></Col>
                        <Col><Col><Text style={styles.iconText}>New Goals</Text></Col></Col>
                        <Col><Col><Text style={styles.iconText}>View Progress</Text></Col></Col>
                      </Row>                      
                      <Row >
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => setModalVisble(false) } >
                            <View style={styles.buttonStyle}>
                              <Text style={styles.buttonText}>Close</Text>
                            </View>
                          </TouchableNativeFeedback>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => {setSettingVisble(true);setModalVisble(false)} } >
                            <View style={[styles.buttonStyle, styles.settingButton]}>
                              <Text style={styles.buttonText}>Setting</Text>
                            </View>
                          </TouchableNativeFeedback>                          
                        </Col>
                      </Row>
                    </Grid>
                  </View>              
              </Modal>
              <Modal animationType="slide" 
                      visible={isSettingVisible}
                      transparent={true}>
                <View style={styles.modalContentStyle}>
                  <Grid>
                    <Row><Col><Text style={styles.iconStyle}>Setting</Text></Col></Row>
                    <Row >
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => setSettingVisble(false) } >
                            <View style={styles.buttonStyle}>
                              <Text style={styles.buttonText}>Close</Text>
                            </View>
                          </TouchableNativeFeedback>
                        </Col>
                    </Row>                    
                    <Row >
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => {setSettingVisble(false); this.resetData(); props.navigation.push("Goal");} } >
                            <View style={[styles.buttonStyle, styles.settingButton]}>
                              <Text style={styles.buttonText}>Clear All Data</Text>
                            </View>
                          </TouchableNativeFeedback>
                        </Col>
                      </Row>                    
                  </Grid>
                </View>
              </Modal>
            </View>            
        </View>
    );
}

export default Head;

const styles = StyleSheet.create({
    headerStyles:{
        marginTop:25, //add space above the header
        marginBottom:30, //add space below the header
        backgroundColor:'#00009C', //signature purple background
        color:'white', //white text
    },
    headerAddGoal:{
      flex:4, //equal space among Left and Right header elements
      flexDirection:"row",//help center the text and add icon
      alignItems:"center", 
    },
    headerAddGoalText:{
      color: "white", //text color
      fontWeight:"bold",  //Bigger text
    },
    headerMenu:{
      flex:2,
    },
    headerText:{
      color:"white",  //white text
      fontSize:20, //size of text
    },
    headerSection:{
      flex: 4,// Add more space to display text
    },
    headerTitle:{
      textDecorationLine:"underline", //Text is underlined
      fontWeight:"bold",  //Bigger text
    },
    settingButton:{
      backgroundColor:"red",
    },
    buttonStyle:{
      backgroundColor:'navy',//signature purple color 
      padding: 10, //space between button title and border
      margin: 10, //whitespace between button and other elements
      width: 250, //width of button
      borderColor:'navy',//signature purple color
      borderRadius: 15, //round the corners    
    },
    buttonContainer:{
      alignItems:"center",  //help center the button
      justifyContent:"center",
    },
    buttonText:{
      color: "#ffffff", //text color
      textAlign:"center", //center the text
      fontWeight:"bold",  //Bigger text
    },
    modalStyle:{
      alignContent:"center", 
      justifyContent:"center",
    },
    modalContentStyle:{
      marginTop:150, //help center the modal
      marginLeft:40,  //help center the modal
      backgroundColor:"lightgrey",
      height:250,
      width:"80%",
    }, 
    modalText:{
      color:"white",
    },
    iconStyle:{       //Style the icons in the modal for the menu
      color:"#2B65EC",
      fontSize:70,
      textAlign:"center",
    },
    iconText:{
      fontSize:16,
      color:"navy",
      textAlign:"center",
    }      
});
