import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, AsyncStorage } from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text, Header, Content, Footer, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import {getData, initialSetData} from '../js/data-functions.js';

import Nav from '../components/header.js';
import Foot from '../components/Foot.js';
import goals from '../data/goals.js';


//1st Screen the user will see. Allow viewing of overall goals/mission. 
export default class Goal extends React.Component {
  state = { isReady: false, userGoals:[] };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
    });
    
    this.setState({isReady:true});
    this.storeData();
  }

  storeData = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');
      if(value !== null){
        this.setState({userGoals:JSON.parse(value)});
        console.log("it works");
      }else {
        console.log("It is null");
        await AsyncStorage.setItem("userGoals",JSON.stringify(goals));
        this.setState({userGoals:goals});
      }
      
    } catch (e) {
      console.log("it broke");
    }
  }

  setCurrentMilestones = goal =>{
    AsyncStorage.setItem("currentMilestones", JSON.stringify(goal.milestones));
    AsyncStorage.setItem("currentGoalTitle", JSON.stringify(goal.goal));
  }

  render() {
    if (!this.state.isReady && this.state.userGoals !== null) {
      return <AppLoading />;
    }

    return (
      <Container>
        {/*Displays the App's Title, current section, and menu button */}
          <Nav />
          <Content>
            {/**Display a user's goal */}
            {
              this.state.userGoals.map((goal, id) => {
                return(
                  <Card key={id} transparent>
                    <CardItem  button onPress={() => {this.props.navigation.navigate("Milestone"); this.setCurrentMilestones(goal);}}>
                      <Body style={styles.goalStyle}>
                        <Text style={[styles.goalText, styles.goalIndex]}>{id + 1}</Text>
                        <Text style={[styles.goalText, styles.goalBody]}>{goal.goal}</Text>
                      </Body>
                    </CardItem>
                  </Card>                  
                );
              })
            } 
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback >
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>NEW GOAL</Text>
                </View>
              </TouchableNativeFeedback>
            </View>            
          </Content>
          <Foot />         
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    color: "#ffffff", //text color
    textAlign:"center", //center the text
    fontWeight:"bold",  //Bigger text
  }
});