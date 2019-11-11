import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GoalScreen from './screens/GoalScreen.js';

export default function App() {
  return (
    <AppContainer />
  );
}

const navigationOptions = {
  headerMode: 'none'
}

const AppNavigator = createStackNavigator({Goal: GoalScreen},navigationOptions);


const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
