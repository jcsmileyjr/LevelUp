import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Container, Text, Content, Button, CheckBox, Icon,Input, Item, Card, CardItem, Body } from 'native-base';
import { AppLoading } from 'expo';//Needed to get Native Base to work. 
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

//Allows the user to create a goal with milestones
export default class Milestones extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) 
    state = { isReady: false};
    async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
    }

    render(){
        if (!this.state.isReady && !this.state.steps === null) {
            return <AppLoading />;
        }

        return(
            <Container>
                <Head />
                <Content>
                    <Text>Planning Works</Text>
                </Content>
                <Foot />
            </Container>
        );
    }
}