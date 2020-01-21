import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';

import { Container, Text,Content, List, ListItem, H1, Icon, Header, Footer } from 'native-base';

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

//
export default class Goal extends React.Component {
  state = {  };
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
    });//load fonts needed for certain components in NativeBase
    }

    render(){
        return(
            <Container>
                <Header><Head navigation={this.props.navigation} /></Header>
                <Content><Text>Test</Text></Content>
                <Footer><Foot title="Use this as a inspiration for your goals" /></Footer>
            </Container>
        );
    }
}