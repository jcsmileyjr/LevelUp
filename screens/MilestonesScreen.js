import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Container, Text, Content, Button, CheckBox, Icon,Input, Item, Card, CardItem, Body } from 'native-base';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';

import {goals} from '../data/goals.js';
import Head from '../components/header.js';
import Foot from '../components/Foot.js';

export default class Milestones extends React.Component {
    state = { isReady: false, steps:[]};
    async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });
      this.setState({isReady:true});
      this.getMilestones();
    }

    getMilestones = async () => {
        const milestones = await AsyncStorage.getItem('currentMilestones');
        const goalTitle = await AsyncStorage.getItem('currentGoalTitle');
        this.setState({steps:JSON.parse(milestones), title:JSON.parse(goalTitle)});        
    }

    render() {
        if (!this.state.isReady && !this.state.steps === null) {
          return <AppLoading />;
        }

        return(
            <Container>
                <Head />
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