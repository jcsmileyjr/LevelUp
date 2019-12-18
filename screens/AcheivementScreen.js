import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Container,Content, Icon, Grid, Col, Row } from 'native-base';
import { AppLoading } from 'expo';//Needed to get Native Base to work. 
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

//Allows the user to see completed goals/milestones
export default class Milestones extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) 
    state = { isReady: false};

    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
    }

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
          }

        return(
            <Container>
                <Head />
                <Content>
                    <Grid>
                        <Row>
                            <Col style={styles.progressSectionStyle} size={77}><Text></Text></Col>
                            <Col style={styles.timelineBar} size={3}><Text></Text></Col>
                            <Col style={styles.timeStampSection} size={20}><Text></Text></Col>
                        </Row>
                    </Grid> 
                </Content>
                <Foot />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
progressSectionStyle:{
    backgroundColor:"pink",
},
timelineBar:{
    borderColor:"grey",
    borderWidth:2,
    borderStyle:"solid",
    backgroundColor:"grey",
},
timeStampSection:{
    backgroundColor:"orange",
}
});