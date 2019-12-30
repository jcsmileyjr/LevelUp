import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Root} from "native-base";

import GoalScreen from './screens/GoalScreen.js';
import MilestoneScreen from './screens/MilestonesScreen.js';
import PlanningScreen from './screens/PlanningScreen.js';
import AchievementScreen from './screens/AcheivementScreen.js';
import CongratsNewGoal from './screens/CongratsGoalScreen.js';

export default function App() {

  return (
    <Root>
      <AppContainer />
    </Root>
    
  );
}

const navigationOptions = {
  headerMode: 'none'
}

const AppNavigator = createStackNavigator({Goal:GoalScreen, Milestone:MilestoneScreen, Planning:PlanningScreen, Progress:AchievementScreen, Congrats:CongratsNewGoal},navigationOptions);


const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
