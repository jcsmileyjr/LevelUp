import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Container,Content, H1, Grid, Col, Row } from 'native-base'; 
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage
import { NavigationEvents } from "react-navigation";

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import FooterWithButton from '../components/FooterWithButton.js'//Footer with a button to add a completed milestone
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

    //load the users's past achievements saved to local storage
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
                <Head navigation={this.props.navigation} title="Timeline of Successes" />
                {/*Refresh data */}
                <NavigationEvents onDidFocus={() => this.loadData()} />
                <Content>
                    <H1 style={styles.pageTitleStyle}>Timeline of Successes</H1>
                    <Grid >
                        {
                            this.state.achievements.map((success, index) =>{
                                return(                                    
                                    <Row key={index} style={styles.rowStyle}>
                                        <Col style={styles.contentStyle} size={77}>
                                            <Text style={styles.goalStyle}>{success.goal}</Text>
                                            <Text style={styles.milestoneStyle}>{success.title}</Text>
                                            <Text style={styles.descriptionStyle}>{success.description}</Text>
                                        </Col>
                                        <Col style={styles.timelineBar} size={3}><Text></Text></Col>
                                        <Col size={20}><Text style={styles.dateStyle}>{success.date}</Text></Col>
                                    </Row>                                    
                                );
                            })
                        }
                    </Grid>                     
                </Content>
                <FooterWithButton   text="Manually Add Completed Milestone" 
                                    nav="ManualAddProgress" 
                                    navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textStyle:{
        color:'#2B65EC',  //signature light blue color
        marginLeft:5,
        marginBottom:10,
    },
    dateStyle:{
        color:'navy',  //signature purple color
        textAlign:"center",
        marginBottom:10, 
    },
    timelineBar:{
        borderColor:"grey",
        borderWidth:2,
        borderStyle:"solid",
        backgroundColor:"grey",
    },
    pageTitleStyle:{
        color:"navy",
        textAlign:"center",
        textDecorationLine:"underline",
        marginBottom:15,
    },
    goalStyle:{
        color:'#2B65EC',  //signature light blue 
        textDecorationLine:"underline",
    },
    milestoneStyle:{
        color: "navy",
        fontSize:20,
    },
    descriptionStyle:{
        color:"#707070",
        fontSize:12,
    },
    contentStyle: {
        marginLeft: 10,
        marginBottom:10,//whitespace between successes
    },
});