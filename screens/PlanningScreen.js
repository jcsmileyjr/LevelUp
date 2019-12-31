import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableNativeFeedback} from 'react-native';
import { Container,Content, Icon, Toast, H1 } from 'native-base';
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import PlanningFooter from '../components/PlanningFooter.js';// Footer displaying instructions
import PageLoad from '../components/PageLoad.js';//Show spinning top while page is loading

//Allows the user to create a goal with milestones
export default class Milestones extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) 
    state = { isReady: false, newGoalTitle:"", milestoneTitle:"", newMilestones:[], userGoals:[]};
    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
    }

    //Saves the user inputted milestones to state when push the "plus" icon
    updateMilestones = () => {
        if(this.state.milestoneTitle !== "" && this.state.newGoalTitle !== ""){
            let listOfMilestones = this.state.newMilestones;//get the current array of milestones
            listOfMilestones.push(this.state.milestoneTitle);//update with current user input
            this.setState({newMilestones:listOfMilestones, milestoneTitle:""});// update the state with new array of milestones
            this.textInput.clear();
        }else{
            Toast.show({text:"Must enter a title for a Goal", buttonText:"Try Again", position:"top", type:"warning", duration:2000});
            console.log("updateMilestones function failed")
        }        
    }

    //Update the old list of goals/milestones with new user inputted information when push the "Finish" button
    updateGoals = async () =>{
        if(this.state.newGoalTitle !== "" && this.state.newMilestones !== null){
            const savedGoals = await AsyncStorage.getItem('userGoals');//get saved goals from local storage
            if(savedGoals !== null){
                let userGoals = JSON.parse(savedGoals); //get old array of goals/milestones
                const newGoal = {"goal":this.state.newGoalTitle,"milestones":this.state.newMilestones};//create goal/milestones object
                userGoals.push(newGoal);//add new goal & milestones to current array of goals/milestones
                await AsyncStorage.setItem("userGoals",JSON.stringify(userGoals));//Save updated array of objects to local storage
            }
        }else{
            console.log("Missing information to update user Goals in Planning screen");
        }
    }

    //Loads the goal, selected by the user, to local storage to be use on the Milestones screen
    setCurrentMilestones = () =>{
        AsyncStorage.setItem("currentMilestones", JSON.stringify(this.state.newMilestones));//saves the goal's milestones
        AsyncStorage.setItem("currentGoalTitle", JSON.stringify(this.state.newGoalTitle));//saves the goal's title
    }    

    clearText = () => { this.setState({milestoneTitle:""})};  

    showCongratsToast = () => {
        Toast.show({
            text:"Fantastic, a new goal.",
            textStyle:{color:"white"},
            buttonText: "Close",
            type:"success",
            position:"bottom",
            duration: 3000,
        });
    }

    render(){
        if (!this.state.isReady) {
            return <PageLoad />;
        }

        return(
            <Container>
                <Head navigation={this.props.navigation} />
                <Content>
                    <H1 style={styles.pageTitleStyle}>Planning</H1>
                    <View><Text style={styles.goalTitle}>Set a New goal</Text></View>
                    <View style={styles.inputContainter} >
                        <TextInput  placeholder="Type Goal" 
                                    autoFocus={true}
                                    style={styles.inputStyles} 
                                    onChangeText={(newGoalTitle)=>this.setState({newGoalTitle})} />
                    </View>
                    
                    <View><Text style={styles.goalTitle}>Add Milestones</Text></View>
                    <View style={styles.inputContainter} >
                        <Icon active name='add'onPress={()=> this.updateMilestones()} />
                        <TextInput placeholder="Type Milestones" 
                        style={styles.inputStyles} 
                        ref={input => {this.textInput = input}} 
                        onChangeText={(milestoneTitle)=>this.setState({milestoneTitle})} />
                    </View>

                    {
                        this.state.newMilestones.map((step, index) =>{
                            return(
                                <View key={index}>
                                    <Text style={styles.newMilestoneStyle}>{step}</Text>
                                </View>
                            );
                        })
                    }
                    
                    {/**Display a button to add a new goal */}
                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback onPress={() => {this.props.navigation.navigate("Goal"); this.updateGoals(); this.setCurrentMilestones(); this.showCongratsToast();}} >
                            <View style={styles.buttonStyle}>
                                <Text style={styles.buttonText}>FINISH</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View> 
                </Content>
                <PlanningFooter />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    inputStyles: {
        width: 300,
        color:'#2B65EC',  //signature purple color
        textAlign:"center",
        height:40,
        borderColor:"grey",
        borderWidth: 1,
        elevation: 1,
        margin: 20,
        fontSize: 18,
    },
    goalTitle:{
        textAlign:"center",
        fontSize:20,
        color:'navy',  //signature purple color
    },
    newMilestoneStyle:{
        textAlign:"center",
        fontSize:20,
        color:'#2B65EC',  //signature purple color
    },
    inputContainter:{
        display:"flex", //Ensure the goal id and statement is in a row
        flexDirection:"row",
        alignItems:"center",  //help center the button
        justifyContent:"center",
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
    },
    pageTitleStyle:{
        color:"navy",
        textAlign:"center",
    },
});