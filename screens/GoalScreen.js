import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import {NavigationEvents} from 'react-navigation';

import { Container, Text,Content, List, ListItem, H1 } from 'native-base';

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions
import goals from '../data/goals.js';// FOR DEVELOPMENT, example list of sample learning path
import PageLoad from '../components/PageLoad.js';//Show spinning top while page is loading

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
  }

  //Call during mounting, loads data from local storage. If that is empty, then loads data from sample learning path.
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
      console.log("StoreData() in GoalScreen not working");
    }
  }

  //Loads the goal, selected by the user, to local storage to be use on the Milestones screen
  //Called when a goal is touched by user
  setCurrentMilestones = goal =>{
    AsyncStorage.setItem("currentMilestones", JSON.stringify(goal.milestones));//saves the goal's milestones
    AsyncStorage.setItem("currentGoalTitle", JSON.stringify(goal.goal));//saves the goal's title
  }

  render() {
    if (!this.state.isReady && this.state.userGoals !== null) {
      return <PageLoad />;
    }

    return (
      <Container>
        {/*Displays the App's Title, current section, and menu button */}
          <Head navigation={this.props.navigation} />
          {/*Refresh data */}
          <NavigationEvents onDidFocus={() => this.storeData()} /> 
          <Content>
            {/**Display a user's goals */}
            <H1 style={styles.goalStyle}>Goals</H1>
            <List>
            {
              this.state.userGoals.map((goal,id)=>{
                return(
                  <ListItem key={id} button onPress={() => {this.props.navigation.navigate("Milestone"); this.setCurrentMilestones(goal);}}>
                    <Text style={styles.goalText}>{goal.goal}</Text>
                  </ListItem>
                );
              })
            }
            </List>            
          </Content>
          <Foot title="* Click on a Goal to view Milestones for it." />         
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  goalStyle:{
    color:"navy",
    textAlign:"center",
  },
  goalText:{
    color:'#2B65EC',  //signature purple color 
    fontSize:20,
  }
});