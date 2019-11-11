import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }


  render() {

    return (
      <Container>
          <Text>Native Base Works</Text>
      </Container>
    );
  }
}