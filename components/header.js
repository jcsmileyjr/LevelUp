import React, { useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Modal, Alert } from 'react-native';

import { Container, Text, Header, Content, Left, Body, Right, Button, Icon, Grid, Row, Col} from 'native-base';

const Head = (props) => {

  const changeModalVisible = () => { setModalVisble(!isVisible)};
  const [isVisible, setModalVisble] = useState(false);
    return(
        <View>
        {/*Displays the App's Title, current section, and menu button */}
            <Header style={styles.headerStyles}>
                <Left style={styles.appTitle}><Text style={styles.headerText}>Level Up</Text></Left>
                <Body style={ styles.headerSection}><Text style={[styles.headerText, styles.headerTitle]}>{props.title}</Text></Body>
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
      appTitle:{
        flex:2, //equal space among Left and Right header elements
      },
      headerMenu:{
        flex:1,
      },
      headerText:{
        color:"white",  //white text
        fontSize:20, //size of text
      },
      headerSection:{
        alignItems:"center",  //help center the text
        justifyContent:"center",
        flex: 5,// Add more space to display text
      },
      headerTitle:{
        textDecorationLine:"underline", //Text is underlined
        fontWeight:"bold",  //Bigger text
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
        height:200, 
        width:"80%"
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
