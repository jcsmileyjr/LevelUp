import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import {NavigationEvents} from 'react-navigation';

import { AppLoading } from 'expo';//Needed to get Native Base to work.
import { Container, Text, Header, Content, Footer, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions
import goals from '../data/goals.js';// FOR DEVELOPMENT, example list of sample learning path


//1st Screen the user will see. Allow viewing and adding big picture goals. 
export default class Goal extends React.Component {
  //isReady is checking if fonts is loaded (needed for NativeBase) & userGoals hold data from local storage
  state = { isReady: false, userGoals:[] };
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
    });//load fonts needed for certain components in NativeBase
    
    this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
    this.storeData();//loads data from local storage to state
    //this.resetData(); USE ONLY TO RESET DATA
  }

  //Loads data from local storage. If that is empty, then loads data from sample learning path.
  storeData = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');//get saved goals from local storage
      if(value !== null){
        this.setState({userGoals:JSON.parse(value)});
      }else {
        await AsyncStorage.setItem("userGoals",JSON.stringify(goals));//Save sample learning path to local storage
        this.setState({userGoals:goals});
      }      
    } catch (e) {
      console.log("it broke");
    }
  }
/* USE ONLY TO RESET DATA
  resetData = async () => {
    await AsyncStorage.setItem("userGoals",JSON.stringify(goals));//Save sample learning path to local storage
    this.setState({userGoals:goals});
  }
*/
  //Loads the goal, selected by the user, to local storage to be use on the Milestones screen
  setCurrentMilestones = goal =>{
    AsyncStorage.setItem("currentMilestones", JSON.stringify(goal.milestones));//saves the goal's milestones
    AsyncStorage.setItem("currentGoalTitle", JSON.stringify(goal.goal));//saves the goal's title
  }

  render() {
    if (!this.state.isReady && this.state.userGoals !== null) {
      return <AppLoading />;
    }

    return (
      <Container>
        {/*Displays the App's Title, current section, and menu button */}
          <Head />
          {/*Refresh data */}
          <NavigationEvents onDidFocus={() => this.storeData()} /> 
          <Content>
            {/**Display a user's goals */}
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
            {/**Display a button to add a new goal */}
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Planning")} >
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