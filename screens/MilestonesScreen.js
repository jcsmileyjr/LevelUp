import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import { Container, Text, Content, Button, CheckBox, Icon, Item, Card, CardItem, Body } from 'native-base';
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

    //Called during mount, function to load data from local storage (acquired in GoalScreen) into state
    getMilestones = async () => {
        const milestones = await AsyncStorage.getItem('currentMilestones');//load a array of milestones
        const goalTitle = await AsyncStorage.getItem('currentGoalTitle');// load a title string
        this.setState({steps:JSON.parse(milestones), title:JSON.parse(goalTitle), newMilestone:""});        
    }

    //When user press "plus" sign, the milestone the user inputted is added to the goal selected.
    addMilestone = async () => {
        const value = await AsyncStorage.getItem('userGoals');//get saved goals from local storage
        if(value !== null){
            const currentMilestones = this.state.steps; //get current array of milestones
            currentMilestones.push(this.state.newMilestone);//update the array of milestones
            this.setState({steps:currentMilestones});//update screen's state array of milestones to update view
            
            const savedGoals = await AsyncStorage.getItem('userGoals');//get saved goals from local storage              
            let userGoals = JSON.parse(savedGoals); //Convert saved goals from a string into a array of objects         
            
            //Search array for selected goal, then update its milestones with updated milestones from state
            userGoals.forEach((goal) => {
                if(goal.goal === this.state.title){
                    goal.milestones = currentMilestones;
                }
            });
            
            await AsyncStorage.setItem("userGoals",JSON.stringify(userGoals));//Save updated array of goals/milestones to local storage
        }else{
            console.log("MilestoneScreen: userGoal local storgae is empty")
        }
    }

    //Allow a user to delete a milestone
    deleteMilestone = async(id) => {
        const listOfMilestones = this.state.steps;//get current list of milestones
        this.updateAchievement(listOfMilestones[id]);//update array of acheivements with milestone being deleted
        listOfMilestones.splice(id,1);//remove the selected milestone
        this.setState({steps:listOfMilestones});//update the screen's state

        const savedGoals = await AsyncStorage.getItem('userGoals');//get saved goals from local storage              
        let userGoals = JSON.parse(savedGoals); //Convert saved goals from a string into a array of objects         
        
        //To update the current array of goals/milestones in local storage we search array for selected goal, 
        //If there is atleast 1 milestone, then update its milestones with updated milestones from state
        //if there is 0 milestones, then delete goal
        userGoals.forEach((goal, index) => {
            if(goal.goal === this.state.title && listOfMilestones.length > 0){
                goal.milestones = listOfMilestones;
            }
            if(goal.goal === this.state.title && listOfMilestones.length <= 0){
                this.updateAchievement(goal.goal);
                userGoals.splice(index,1);
            }
        });
        
        await AsyncStorage.setItem("userGoals",JSON.stringify(userGoals));//Save updated array of goals/milestones to local storage        
        this.props.navigation.navigate("Progress");
    }

    //Update array of achievements with objects of finished goals/milestones
    updateAchievement = async (milestone) => {
        try {
            const arrayOfAchievements = await AsyncStorage.getItem('achievements');//get saved achievements from local storage
            let achievements = [];
            let progress = {};
            progress.title = milestone;//save milestone as title
            progress.date = this.getDate();//save today's date

            if(arrayOfAchievements !== null){
              achievements = JSON.parse(arrayOfAchievements);//parse string into an array of objects              
              achievements.push(progress);//update array with new objet
            }else {
              achievements.push(milestone)//create a new array with first object                     
            }

            await AsyncStorage.setItem("achievements",JSON.stringify(achievements));//Save array of acheivements to local storage      
          } catch (e) {
            console.log("Failed to update acheivements local storage in Milestone screen");
          }
    }

    getDate = ()=>{
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        return day + "/" + month + "/" + year;
    }

/* USE ONLY TO RESET DATA
  resetData = async () => {
    const testing = []
    await AsyncStorage.setItem("achievements",JSON.stringify(testing));
  }
*/

    render() {
        if (!this.state.isReady && !this.state.steps === null) {
          return <AppLoading />;
        }

        return(
            <Container>
                {/*Displays the App's Title, current section, and menu button */}
                <Head title="Milestones" /> 
                <Content> 
                    {/*Display the user's selected goal title */}
                    <View><Text style={styles.milestoneTitle}>{this.state.title}</Text></View>

                    {/*Display a input box to create a new milestone */}
                    <View style={styles.inputContainter} >
                        <Icon active name='add'onPress={()=> this.addMilestone()} />
                        <TextInput placeholder="Add Milestone" 
                        style={styles.inputStyles}             
                        onChangeText={(newMilestone)=>this.setState({newMilestone})} />
                    </View>
                                        
                    {/*Display the user's selected milestones */}                                        
                    {
                        this.state.steps.map((milestones, index) =>{
                            return(                                  
                                <View key={index} >
                                    <Card transparent >
                                        <CardItem style={styles.milestoneStyle} button onPress={() => {this.deleteMilestone(index)}}>
                                            <CheckBox   checked={false} 
                                                        style={styles.checkboxStyle}                                                         
                                                        color='navy' />
                                            <Body>
                                                <Text style={[styles.checkboxText]}>{milestones}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>                               
                            );
                        })
                    }
                </Content>
                <Foot title="*Check off a milestone when finished. View it on the Acheivement Timeline" />
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
        color:'navy',  //signature purple color
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
          color:'navy',  //signature purple color
      },
      inputStyles: {
        width: 300,
        color:'navy',  //signature purple color
        textAlign:"center",
        height:40,
        borderColor:"grey",
        borderWidth: 1,
        elevation: 1,
        margin: 20,
        fontSize: 18,
    }, 
    inputContainter:{
        display:"flex", //Ensure the goal id and statement is in a row
        flexDirection:"row",
        alignItems:"center",  //help center the button
        justifyContent:"center",
    }         
});