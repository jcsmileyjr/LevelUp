import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableNativeFeedback, Keyboard} from 'react-native';
import { Container,Content, Icon, Toast, H1, Textarea } from 'native-base';
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import PlanningFooter from '../components/PlanningFooter.js';// Footer displaying instructions
import PageLoad from '../components/PageLoad.js';//Show spinning top while page is loading

//Allows the user to create a goal with milestones
export default class Milestones extends React.Component {
    //isReady is checking if fonts is loaded (needed for NativeBase) 
    state = { isReady: false, newGoalTitle:"", milestoneTitle:"", milestoneDesc:"", newMilestones:[], userGoals:[]};
    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });//load fonts needed for certain components in NativeBase
      this.setState({isReady:true});//When the fonts is loaded, update "isReady" to show the app
    }

    //Saves the user inputted milestones to state when push the "plus" icon
    updateMilestones = () => {
        if(this.state.milestoneTitle !== "" && this.state.newGoalTitle !== "" && this.state.milestoneDesc !==""){
            let listOfMilestones = this.state.newMilestones;//get the current array of milestones
            let newMilestone = {"title":this.state.milestoneTitle, "description":this.state.milestoneDesc};
            listOfMilestones.push(newMilestone);//update with current user input
            this.setState({newMilestones:listOfMilestones, milestoneTitle:""});// update the state with new array of milestones
            this.titleInput.clear();
            this.descriptionInput.clear();
            Keyboard.dismiss();
        }else{
            Toast.show({text:"Missing Information", buttonText:"Try Again", position:"top", type:"warning", duration:2000});
            console.log("updateMilestones function failed")
        }        
    }

    //Update the old list of goals/milestones with new user inputted information when push the "Finish" button
    updateGoals = async () =>{
        if(this.state.newGoalTitle !== "" && this.state.newMilestones.length > 0){
            const savedGoals = await AsyncStorage.getItem('userGoals');//get saved goals from local storage                  
            if(savedGoals !== null && Array.isArray(JSON.parse(savedGoals))===true){//check if the data saved to local storage is not empty                
                let userGoals = JSON.parse(savedGoals); //get old array of goals/milestones and parse from a string to a array of objects              
                const newGoal = {"goal":this.state.newGoalTitle,"milestones":this.state.newMilestones};//create goal/milestones object              
                userGoals.push(newGoal);//add new goal & milestones to current array of goals/milestones
                await AsyncStorage.setItem("userGoals",JSON.stringify(userGoals));//Save updated array of objects to local storage
            }else{
                //If there is no saved data, then create a new goal, add to a array, and saved to local storage
                const newGoal= {"goal":this.state.newGoalTitle,"milestones":this.state.newMilestones};//create goal/milestones object
                const newSavedGoals = [];
                newSavedGoals.push(newGoal);             
                await AsyncStorage.setItem("userGoals",JSON.stringify(newSavedGoals));//Save updated array of objects to local storage
            }
            this.showCongratsToast();
            this.props.navigation.navigate("Goal");
        }else{
            Toast.show({text:"Must enter a title for a Goal or fail to add a Milestone", buttonText:"Try Again", position:"top", type:"warning", duration:2000});
            console.log("No goal title or milestones added to update user Goals in Planning screen");
        }
    }
/*
    //Loads the goal, selected by the user, to local storage to be use on the Milestones screen
    setCurrentMilestones = () =>{
        AsyncStorage.setItem("currentMilestones", JSON.stringify(this.state.newMilestones));//saves the goal's milestones
        AsyncStorage.setItem("currentGoalTitle", JSON.stringify(this.state.newGoalTitle));//saves the goal's title
    }    
*/
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
                    <View style={styles.inputContainter} >
                        <Icon style={[styles.iconStyle, styles.bulbIconColor]} active name='bulb' />
                        <TextInput  placeholder="TYPE A NEW GOAL"
                                    placeholderTextColor="darkgrey" 
                                    clearTextOnFocus={true}
                                    autoFocus={true}
                                    style={styles.inputStyles} 
                                    onChangeText={(newGoalTitle)=>this.setState({newGoalTitle})} />
                    </View>
                    <View style={styles.inputContainter} >
                        <Icon style={[styles.iconStyle, styles.bulbIconColor]} active name='bulb' />
                        <TextInput  placeholder="TYPE MILESTONE TITLE"
                                    placeholderTextColor="darkgrey"
                                    multiline={true}
                                    style={styles.textAreaStyles} 
                                    ref={input => {this.titleInput = input}} 
                                    onChangeText={(milestoneTitle)=>this.setState({milestoneTitle})} />
                    </View>
                    <View style={styles.inputContainter} >
                        <Icon style={[styles.iconStyle, styles.addIconColor]} active name='add'onPress={()=> this.updateMilestones()} />
                        <TextInput  placeholder="TYPE MILESTONE DESCRIPTION"
                                    placeholderTextColor="darkgrey"
                                    multiline={true}
                                    style={styles.textAreaStyles} 
                                    ref={input => {this.descriptionInput = input}} 
                                    onChangeText={(milestoneDesc)=>this.setState({milestoneDesc})} />
                    </View>
                    <Text style={styles.pageTitleStyle}>Click the Add icon to create a milestone</Text>

                    {
                        this.state.newMilestones.map((step, index) =>{
                            return(
                                <View key={index}>
                                    <Text style={styles.newMilestoneStyle}>{step.title}</Text>
                                </View>
                            );
                        })
                    }
                    
                    {/**Display a button to add a new goal */}
                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback onPress={() => {this.updateGoals();}} >
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
    inputStyles: {//styles for the goal input text box
        width: 270,
        color:'#2B65EC',  //blue text color
        textAlign:"center",
        height:40,
        borderColor:"grey",
        borderWidth: 1,
        elevation: 1,
        margin: 20,
        fontSize: 18,
    },
    textAreaStyles: {//styles for the milestone input text box
        width: 270,
        color:'#2B65EC',  //blue text color
        textAlign:"center",
        height:50,
        borderColor:"grey",
        borderWidth: 1,
        elevation: 1,
        margin: 20,
        fontSize: 18,
    },
    newMilestoneStyle:{//styles use when new milestones is create
        textAlign:"center",
        fontSize:20,
        color:'#2B65EC',  //signature light blue text color
    },
    inputContainter:{//ensure the a icon and input box is on the same row
        display:"flex", 
        flexDirection:"row",
        alignItems:"center",  //help center the button
        justifyContent:"center",
    },
    buttonStyle:{//style for the finish button
      backgroundColor:'navy',//signature dark blue color 
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
    iconStyle:{
        fontSize:50,
    },
    addIconColor:{
        color:'#2B65EC',
    },
    bulbIconColor:{
        color:'white',  //white color to hide it. This help keeps the format
    }
});