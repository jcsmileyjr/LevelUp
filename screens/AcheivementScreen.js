import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Container,Content, Icon, Grid, Col, Row } from 'native-base'; 
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions
import PageLoad from '../components/PageLoad.js';//Show spinning top while page is loading

//Allows the user to see completed goals/milestones
export default class Achievements extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) & achievements is progress recorded over time
    state = {isReady: false, achievements:[]};

    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
      this.loadData();
    }

    //load the users completed milestones/goals saved to local storage
    loadData = async () => {
        try {
            const savedAchievements = await AsyncStorage.getItem('achievements');//get saved achievements from local storage
            if(savedAchievements !== null){
              this.setState({achievements:JSON.parse(savedAchievements)});//load saved achievements to state             
            }    
          } catch (e) {
            console.log("Error while loading data on Achievement Screen");
          }
    }   

    render(){
        if (!this.state.isReady && this.state.achievements !== null) {
            return <PageLoad />;
          }

        return(
            <Container>
                <Head navigation={this.props.navigation} title="Progress" />
                <Content>
                    <Grid >
                        {
                            this.state.achievements.map((success, index) =>{
                                return(
                                    
                                    <Row key={index}>
                                        <Col size={60}><Text style={styles.textStyle}>{success.title}</Text></Col>
                                        <Col style={styles.timelineBar} size={3}><Text></Text></Col>
                                        <Col size={37}><Text style={styles.dateStyle}>{success.date}</Text></Col>
                                    </Row>
                                    
                                );

                            })
                        }
                    </Grid> 
                    
                </Content>
                <Foot title="The essence of strategy is to choose what not to do" />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
textStyle:{
    color:'#2B65EC',  //signature purple color
    fontSize:25,  //text size
    marginLeft:5,
    marginBottom:10,
},
dateStyle:{
    color:'navy',  //signature purple color
    fontSize:20,  //text size
    textAlign:"center",
    marginBottom:10, 
},
timelineBar:{
    borderColor:"grey",
    borderWidth:2,
    borderStyle:"solid",
    backgroundColor:"grey",
}
});