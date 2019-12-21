import React, { useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Modal } from 'react-native';

import { Container, Text, Header, Content, Left, Body, Right, Button, Icon, Grid, Row, Col} from 'native-base';
//onClick={() => setCount(count + 1)}
const Head = (props) => {

  const changeModalVisible = () => { setModalVisble(!isVisible)};
  const [isVisible, setModalVisble] = useState(false);
    return(
        <View>
        {/*Displays the App's Title, current section, and menu button */}
            <Header style={styles.headerStyles}>
                <Left style={styles.headerContent}><Text style={styles.headerText}>Level Up</Text></Left>
                <Body style={styles.headerContent, styles.headerSection}><Text style={[styles.headerText, styles.headerTitle]}>{props.title}</Text></Body>
                <Right style={styles.headerContent}>
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
                        <Col><Text style={styles.modalText}>19090</Text></Col>
                        <Col><Text style={styles.modalText}>8881</Text></Col>
                        <Col><Text style={styles.modalText}>14444</Text></Col>
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
        display:'flex', //center the elements
        alignItems:"center", 
        justifyContent:"center"
      },
      headerContent:{
        flex:1, //equal space among 3 elements
      },
      headerText:{
        color:"white",  //white text
        fontSize:20, //size of text
      },
      headerSection:{
        alignItems:"center",  //help center the text
        justifyContent:"center",    
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
        marginTop:80, 
        marginLeft:40, 
        backgroundColor:"navy",
        height:400, 
        width:"80%"
      }, 
      modalText:{
        color:"white",
      }      
});
