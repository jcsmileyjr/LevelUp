import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableNativeFeedback} from 'react-native';
import { Container,Content, Icon } from 'native-base';
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
                    <View><Text style={styles.goalTitle}>Set a New goal</Text></View>
                    <View style={styles.inputContainter} >
                        <TextInput placeholder="Type Goal" style={styles.inputStyles} />
                    </View>

                    <View><Text style={styles.goalTitle}>Add Milestones</Text></View>
                    <View style={styles.inputContainter} >
                        <Icon active name='add' />
                        <TextInput placeholder="Type Milestones" style={styles.inputStyles} />
                    </View>

                    {/**Display a button to add a new goal */}
                    <View style={styles.buttonContainer}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Goal")} >
                        <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>FINISH</Text>
                        </View>
                    </TouchableNativeFeedback>
                    </View> 
                </Content>
                <Foot />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    inputStyles: {
        width: 300,
        color:'#9C08AB',  //signature purple color
        textAlign:"center",
        height:40,
        borderColor:"grey",
        borderWidth: 1,
        elevation: 1,
        margin: 20,
    },
    goalTitle:{
        textAlign:"center",
        fontSize:25,
        color:'#9C08AB',  //signature purple color
    },
    inputContainter:{
        display:"flex", //Ensure the goal id and statement is in a row
        flexDirection:"row",
        alignItems:"center",  //help center the button
        justifyContent:"center",
    },
    buttonStyle:{
      backgroundColor:'#9C08AB',//signature purple color 
      padding: 10, //space between button title and border
      margin: 10, //whitespace between button and other elements
      width: 250, //width of button
      borderColor:'#9C08AB',//signature purple color
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