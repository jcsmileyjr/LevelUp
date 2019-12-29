import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import {Container,Content, Grid, Col, Row, Text, H1, Icon} from 'native-base';

import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

const CongratsNewGoal = () => {
    const [currentGoal, setGoal] = useState("");
    const [currentMilestones, setMilestones] = useState([]);
 
    useEffect(() =>{
        this.getMilestones()
    });

    //Called during mount, function to load data from local storage (acquired in GoalScreen) into state
    getMilestones = async () => {
        setGoal(await AsyncStorage.getItem('currentGoalTitle'));// load a title string 
        setMilestones(await AsyncStorage.getItem('currentMilestones'));//load a array of milestones 
    }    

    return(
        <Container>
            <Content>
                <Grid>
                    <Row style={styles.headerStyles}>
                        <Col><H1 style={styles.headerText}>Fantastic</H1></Col>
                    </Row>
                    <Row>
                        <Col><Icon name="md-bulb" style={styles.iconStyle} /></Col>
                    </Row>
                    <Row><H1>{currentGoal}</H1></Row>
                    <Row>
                        <Col>
                            <Text>Array of milestones</Text>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
}

export default CongratsNewGoal;

const styles = StyleSheet.create({
    headerStyles:{
        marginTop:25, //add space above the header
        marginBottom:30, //add space below the header
        backgroundColor:'orange', //signature purple background
    },
    headerText:{
        textAlign:"center",
        color:"white",
    },
    iconStyle:{       //Style the icons in the modal for the menu
      color:"yellow",
      fontSize:270,
      textAlign:"center",
    },
    iconText:{
      fontSize:16,
      color:"navy",
      textAlign:"center",
    }     
});