import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Container,Content, Grid, Col, Row, Text, H1, Icon, List, ListItem} from 'native-base';

import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

const CongratsNewGoal = ({navigation}) => {
    const [currentGoal, setGoal] = useState("");
    const [currentMilestones, setMilestones] = useState([]);
 
    useEffect(() =>{
        this.getMilestones();
    });

    //Called during mount, function to load data from local storage (acquired in GoalScreen) into state
    getMilestones = async () => {
        setGoal(await AsyncStorage.getItem('currentGoalTitle'));// load a title string 
        setMilestones(JSON.parse(await AsyncStorage.getItem('currentMilestones')));//load a array of milestones 
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
                    <Row><H1 style={styles.goalStyle}>{currentGoal}</H1></Row>
                    <Row>
                        <Col>
                            <List>
                                {currentMilestones.map((milestone, id) => {
                                    return(
                                        <ListItem key={id}>
                                            <Text style={styles.milestoneStyle}>{milestone}</Text>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/**Display a button to add a new goal */}
                            <View style={styles.buttonContainer}>
                                <TouchableNativeFeedback onPress={() => {navigation.navigate("Goal")} } >
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>                         
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
    },
    goalStyle:{
        textAlign:"center",
    },
    milestoneStyle:{
        marginLeft:50,
    },
    buttonStyle:{
      backgroundColor:'navy',//signature purple color 
      padding: 10, //space between button title and border
      margin: 10, //whitespace between button and other elements
      width: 250, //width of button
      borderColor:'navy',//signature purple color
      borderRadius: 15, //round the corners    
    },
    buttonContainer:{
      alignItems:"center",  //help center the button
      justifyContent:"center",
    },
    buttonText:{
      color: "#ffffff", //text color
      textAlign:"center", //center the text
      fontWeight:"bold",  //Bigger text
    }     
});