import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Root} from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';

import GoalScreen from './screens/GoalScreen.js';
import MilestoneScreen from './screens/MilestonesScreen.js';
import PlanningScreen from './screens/PlanningScreen.js';
import AchievementScreen from './screens/AcheivementScreen.js';

export default class App extends React.Component{ 
  //Show_Main_App is use to show or hide the into-slides. FoundGoals is use to automatic hide the intro-slides
  //if there is a goal.
  state = {show_Main_App:false, foundGoals:false };

  componentDidMount(){
    this.checkForGoals();//check if there is a goal, if so then hide the intro-slides
  }

  //close out the intro-slides
  on_Done_all_slides = () => {
    this.setState({ show_Main_App: true});
  };

  //allow users to skip the intro-slides
  on_Skip_slides = () => {
    this.setState({ show_Main_App: true });
  };

  //check if there is a goal, if so then hide the intro-slides
  checkForGoals = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');//get saved goals from local storage
      if(value !== "{}"){
        this.setState({foundGoals:true});
      }          
    } catch (e) {
      console.log("checkForGoals() in App.js not working");
    }
  }

  render(){
    if(this.state.show_Main_App || this.state.foundGoals){
      return (
        <Root>
          <AppContainer />
        </Root>    
      ); 
    }else { 
      return ( 
        <AppIntroSlider slides={slides} onDone={this.on_Done_all_slides} 
         showSkipButton={true} 
         onSkip={this.on_Skip_slides} /> 
       ); 
    } 
  }     
}

const styles = StyleSheet.create({
  titleStyle:{
    fontSize:40,
    fontWeight:"bold",
    color:"white",
    marginTop:100,
  },
  bodyStyle:{
    fontSize:30,
    color:"white",
  }, 
  image: { 
   width: 1000, 
   height: 1000, 
   resizeMode: 'contain' 
  }
});

const slides = [
  {
    key:"k1",
    title:"Guide your Learning Path by creating Goals",
    backgroundColor: '#2B65EC',
    titleStyle: styles.titleStyle,
    //imageStyles: styles.image,
    //image: require('../LevelUp/assets/goalImage.jpg'),
  },
  {
    key:"k2",
    title:"Break those Goals Down Into Milestones",
    backgroundColor: '#00009C',
    titleStyle: styles.titleStyle,
    //imageStyles: styles.image,
    //image: require('../LevelUp/assets/milestoneImage.jpg'),
  },
  {
    key:"k3",
    title:"Look at a visually reminder of how far you have progress with a timeline of your achievements.",
    backgroundColor:'green',
    titleStyle: styles.titleStyle,
    //imageStyles: styles.image,
    //image: require('../LevelUp/assets/progressImage.jpg'),
  }
]

const navigationOptions = {
  headerMode: 'none'
}

const AppNavigator = createStackNavigator({Goal:GoalScreen, Milestone:MilestoneScreen, Planning:PlanningScreen, Progress:AchievementScreen},navigationOptions);
const AppContainer = createAppContainer(AppNavigator);
