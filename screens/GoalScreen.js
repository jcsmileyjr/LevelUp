import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text, Header, Content, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

//1st Screen the user will see. Allow viewing of overall goals/mission. 
export default class Goal extends React.Component {
  state = { isReady: false };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
    });
    this.setState({isReady:true});
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        {/*Displays the App's Title, current section, and menu button */}
          <Header style={styles.headerStyles}>
              <Left style={styles.headerContent}><Text style={styles.headerText}>Goals</Text></Left>
              <Body style={styles.headerContent, styles.headerSection}><Text style={styles.headerText}>Git Push You</Text></Body>
              <Right style={styles.headerContent}>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
              </Right>
          </Header>
          <Content>
            {/**Display a goal's index and statement */}
            <Card transparent>
              <CardItem>
                <Body style={styles.goalStyle}>
                  <Text style={[styles.goalText, styles.goalIndex]}>1</Text>
                  <Text style={[styles.goalText, styles.goalBody]}>Learn React.js (Web development)</Text>
                </Body>
              </CardItem>
            </Card>
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback >
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>NEW GOAL</Text>
                </View>
              </TouchableNativeFeedback>
            </View>            
          </Content>          
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyles:{
    marginTop:30, //add space above the header
    marginBottom:30, //add space below the header
    backgroundColor:'#9C08AB', //signature purple background
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
    fontWeight:"bold",  //Bigger text
    fontSize:20,
  },
  headerSection:{
    alignItems:"center",  //help center the text
    justifyContent:"center",
  },
  goalStyle:{
    display:"flex", //Ensure the goal id and statement is in a row
    flexDirection:"row",
  },
  goalText:{
    color:'#9C08AB',  //signature purple color        
  },
  goalIndex:{
    fontSize:50,  //The goal' index size cover the entire row
    marginRight:20, //space between the index and statement
  },
  goalBody:{
    fontSize:30,  //text size
  },
  buttonStyle:{
    backgroundColor:'#9C08AB',//signature purple color 
    padding: 10, //space between button title and border
    margin: 10, //whitespace between button and other elements
    width: 250, //width of button
    borderColor:'#9C08AB',//signature purple color
    borderRadius: 15, //round the corners    
  },
  buttonContainer:{
    alignItems:"center",  //help center the button
    justifyContent:"center",
  },
  buttonText:{
    color: "white", //text color
    textAlign:"center",
  }
});