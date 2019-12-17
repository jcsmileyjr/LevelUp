import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Container, Text, Content, Button, CheckBox, Icon,Input, Item, Card, CardItem, Body } from 'native-base';
import { AppLoading } from 'expo';//Needed to get Native Base to work. 
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

//When a user selects a goal on the GoalScreen, the milestones and title associated with it is displayed here
export default class Milestones extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) & steps/title hold data from local storage
    state = { isReady: false, steps:[], title:""};
    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
      this.getMilestones();//loads data (milestones & title) from local storage into the state
    }

    //Function to load data from local storage (acquired in GoalScreen) into state
    getMilestones = async () => {
        const milestones = await AsyncStorage.getItem('currentMilestones');//load a array of milestones
        const goalTitle = await AsyncStorage.getItem('currentGoalTitle');// load a title string
        this.setState({steps:JSON.parse(milestones), title:JSON.parse(goalTitle)});        
    }

    render() {
        if (!this.state.isReady && !this.state.steps === null) {
          return <AppLoading />;
        }

        return(
            <Container>
                {/*Displays the App's Title, current section, and menu button */}
                <Head /> 
                {/*Display the user's selected goal title and milestones */}
                <Content> 
                    <View><Text style={styles.milestoneTitle}>{this.state.title}</Text></View>
                    {
                        this.state.steps.map((selectedGoal, index) =>{
                            return(                                  
                                <View key={index}>
                                    <Card transparent>
                                        <CardItem style={styles.milestoneStyle}>
                                            <CheckBox checked={false} style={styles.checkboxStyle} color='#9C08AB' />
                                            <Body>
                                                <Text style={[styles.checkboxText]}>{selectedGoal}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>                               
                            );
                        })
                    }
                    {/*Display a input box to create a new milestone */}
                    <Item>
                        <Icon active name='add' />
                        <Input placeholder='Type New Milestone'/>
                    </Item>
                </Content>
                <Foot />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    milestoneStyle:{
        display:"flex", //Ensure the goal id and statement is in a row
        flexDirection:"row",
      },
    checkboxText:{
        color:'#9C08AB',  //signature purple color
        fontSize:30,  //text size        
      },
    checkboxStyle:{
        width: 40, //width of the checkbox
        height: 40, //height of the checkbox
        marginRight:20, //space between the index and statement
      },
      milestoneTitle: {
          textAlign:"center",
          fontSize:35,
          fontWeight:"bold",  //Bigger text
          color:'#9C08AB',  //signature purple color
      }
});