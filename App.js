import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Root} from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';

import GoalScreen from './screens/GoalScreen.js';
import MilestoneScreen from './screens/MilestonesScreen.js';
import PlanningScreen from './screens/PlanningScreen.js';
import AchievementScreen from './screens/AcheivementScreen.js';

export default function App() { 
  const [show_Main_App, setShow_Main_App] = useState(false);

  on_Done_all_slides = () => {
    setShow_Main_App(true);
  };
  
  on_Skip_slides = () => {
    setShow_Main_App(true);
  };

  if(show_Main_App){
    return (
      <Root>
        <AppContainer />
      </Root>    
    );
  }else {
    return (
      <AppIntroSlider slides = {slides} onDone={this.on_Done_all_slides} showSkipButton={true} onSkip={this.on_Skip_slides} />
    );
    
  }
  
}

const navigationOptions = {
  headerMode: 'none'
}

const AppNavigator = createStackNavigator({Goal:GoalScreen, Milestone:MilestoneScreen, Planning:PlanningScreen, Progress:AchievementScreen},navigationOptions);


const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
   width: 200, 
   height: 200, 
   resizeMode: 'contain' 
  }
});

const slides = [
  {
    key:"k1",
    title:"Guide your Learning Path by creating Goals",
    backgroundColor: '#2B65EC',
    titleStyle: styles.titleStyle,
    imageStyle: styles.image,
  },
  {
    key:"k2",
    title:"Break those Goals Down Into Milestones",
    backgroundColor: '#00009C',
    titleStyle: styles.titleStyle,
  },
  {
    key:"k3",
    title:"Look at a visually reminder of how far you have progress with a timeline of your achievements.",
    backgroundColor:'green',
    titleStyle: styles.titleStyle,
  }
]
