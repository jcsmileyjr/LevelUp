import React, { useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Modal, AsyncStorage } from 'react-native';

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
                <Left style={styles.headerSection}> 
                  <Text style={[styles.headerText, styles.headerTitle]} onPress={()=> props.navigation.navigate("Goal")}>Level Up Dev</Text>                    
                </Left>
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
                        <Col><Text style={styles.iconText}>New Goals</Text></Col>
                        <Col><Text style={styles.iconText}>View Progress</Text></Col>
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
                      <Row >
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => {setModalVisble(false);props.navigation.navigate("FrontEnd")} } >
                            <View style={[styles.buttonStyle, styles.pathButton]}>
                              <Text style={styles.buttonText}>Front End Developer Path</Text>
                            </View>
                          </TouchableNativeFeedback>
                        </Col>
                      </Row>
                      <Row >
                        <Col style={styles.buttonContainer}>
                          <TouchableNativeFeedback onPress={() => {setModalVisble(false);props.navigation.navigate("BackEnd")} } >
                            <View style={[styles.buttonStyle, styles.pathButton]}>
                              <Text style={styles.buttonText}>Back End Developer Path</Text>
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
        marginTop:23, //add space above the header
        //marginBottom:30, //add space below the header
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
      fontWeight:"bold",  //Bigger text
    },
    settingButton:{
      backgroundColor:"red",
    },
    pathButton:{
      backgroundColor:"#2B65EC",
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
      height:375,
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
    },
    headerButtonStyle:{//style for the finish button
      backgroundColor:'white',//signature dark blue color 
      padding: 10, //space between button title and border
      margin: 1, //whitespace between button and other elements
      width: 110, //width of button
      borderColor:'white',//signature purple color
      borderRadius: 15, //round the corners
      flexDirection:"row",//align the icon and text
      justifyContent:"center",//center the icon and text
      alignItems:"center",//center the icon and text    
    },
    headerButtonContainer:{
      alignItems:"center",  //help center the button
      justifyContent:"center",
      margin:20,
    },
    headerButtonText:{
      color: "navy", //text color
      textAlign:"center", //center the text
      fontWeight:"bold",  //Bigger text
    },
    headerIcon:{
      color:"navy",//color of header icon
      marginRight:5,
      fontSize:30,
    }     
});
