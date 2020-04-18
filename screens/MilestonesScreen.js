import React from 'react';
import {View, StyleSheet, TextInput, TouchableNativeFeedback} from 'react-native';
import { Container, Text, Content, Icon, H1, H2, List, ListItem, Toast} from 'native-base';
import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage
import { NavigationEvents } from "react-navigation";

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import FooterWithButton from '../components/FooterWithButton.js';// Footer displaying instructions
import PageLoad from '../components/PageLoad.js';//Show spinning top while page is loading

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

    //Allow user to edit a milestone
    openEditMilestoneScreen = async(id) => {
        const listOfMilestones = this.state.steps;//get current list of milestones
        const chosenMilestone = listOfMilestones[id];
        await AsyncStorage.setItem("chosenMilestone",JSON.stringify(chosenMilestone));//Save user chosen milestone to local storage
        this.props.navigation.navigate("EditMilestone");
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
        
        this.showCongratsToast();
        await AsyncStorage.setItem("userGoals",JSON.stringify(userGoals));//Save updated array of goals/milestones to local storage        
        this.props.navigation.navigate("Progress");
    }

    //Update array of achievements with objects of finished goals/milestones
    updateAchievement = async (milestone) => {
        try {
            const arrayOfAchievements = await AsyncStorage.getItem('achievements');//get saved achievements from local storage
            let achievements = [];
            let progress = {};
            progress.goal = this.state.title;
            progress.title = milestone.title;//save milestone's title
            progress.description = milestone.description;//save milestone's description
            progress.date = this.getDate();//save today's date

            if(arrayOfAchievements !== null){
              achievements = JSON.parse(arrayOfAchievements);//parse string into an array of objects              
              achievements.push(progress);//update array with new objet
            }else {
              achievements.push(progress)//create a new array with first object                     
            }

            await AsyncStorage.setItem("achievements",JSON.stringify(achievements));//Save array of acheivements to local storage      
          } catch (e) {
            console.log("Failed to update acheivements local storage in Milestone screen");
          }
    }

    getDate = ()=>{
        const day = new Date().getDate();
        const month = (new Date().getMonth()) + 1;
        const year = new Date().getFullYear();
        return month + "/" + day + "/" + year;
    }   

    showCongratsToast = () => {
        Toast.show({
            text:"Congrats, you have completed a milestone.",
            textStyle:{color:"white"},
            buttonText: "Close",
            type:"success",
            position:"bottom",
            duration: 3000,
        });
    }  

    render() {
        if (!this.state.isReady && this.state.steps !== null) {
          return <PageLoad />;
        }

        return(
            <Container>
                {/*Displays the App's Title, current section, and menu button */}
                <Head  navigation={this.props.navigation}/> 
                {/*Refresh data */}
                <NavigationEvents onDidFocus={() => this.getMilestones()} />
                <Content> 
                    <H1 style={styles.pageTitleStyle}>Milestones</H1>

                    {/*Display the user's selected goal title */}
                    <H2 style={styles.milestoneTitle}>{this.state.title}</H2>
                                        
                    {/*Display the user's selected milestones */} 
                    <List>
                    {
                        this.state.steps.map((milestone, index) =>{
                            return(
                                <ListItem style={styles.layoutStyle} key={index}>
                                    <View style={styles.contentStyle}>
                                        <Text style={styles.milestoneTitleStyle}>{milestone.title}</Text>                                    
                                        <Text style={styles.milestoneDescrStyle}>{milestone.description}</Text>                                        
                                    </View>
                                    <Icon style={styles.trophyStyle} active name="md-trophy" android="md-trophy" onPress={()=> this.deleteMilestone(index)} />
                                    <Icon active name="md-brush" android="md-brush" onPress={()=> this.openEditMilestoneScreen(index)} />
                                </ListItem>
                            );
                        })
                    }
                    </List>
                    <Text style={styles.instructions}>Click the trophy icon to move the milestone to the acheivement screen or pen icon to edit the milestone.</Text>
                    {/**Display a button to navigate to the ADD Milestone page */}
                    <View style={styles.buttonContainer}>
                            <TouchableNativeFeedback onPress={() => { this.props.navigation.navigate("AddMilestone")}} >
                                    <View style={styles.buttonStyle}>
                                            <Text style={styles.buttonText}>Add Milestone</Text>
                                    </View>
                            </TouchableNativeFeedback>
                    </View>	
                </Content>
                <FooterWithButton   text="New Goal" 
                                    nav="Planning" 
                                    navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    milestoneTitleStyle:{
        color:'#2B65EC',  //signature light blue color
        fontWeight:"bold",
        width: "80%" //fix bug where goal only showed in center of screen
    },
    milestoneDescrStyle:{
        color:'#707070',  //signature light blue color
        width: "80%", //fix bug where goal only showed in center of screen
    },
    contentStyle:{
        flex: 1,
        flexDirection:"column",/*Stack milestone's title and description/icon */
    },
    milestoneTitle: {
        textAlign:"center",
        fontWeight:"bold",  //Bigger text
        color:'navy',  //signature dark blue color
        textDecorationLine: "underline",
    },
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
    inputContainter:{
        display:"flex", //Ensure the goal id and statement is in a row
        flexDirection:"row",
        alignItems:"center",  //help center the button
        justifyContent:"center",
    },
    pageTitleStyle:{
        color:"navy",
        textAlign:"center",
        marginTop:15,//whitespace between page title and header
        marginBottom:15,//whitespace between page title and Goal title
    },
    iconStyle: {
        flex: 1,
    },
    layoutStyle:{
        display: "flex",
        flexDirection:"row",/*organize milestone's description and edit icon side by side*/
        justifyContent:"space-between",/*push milestone's description and edit icon on opposite ends of view */
    },
    trophyStyle:{
        color:"gold",
        marginRight: 25,
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
        marginTop:25, //whitespace above button 
    },
    buttonText:{
        color: "#ffffff", //text color
        textAlign:"center", //center the text
        fontWeight:"bold",  //Bigger text
    },
    instructions:{
        textAlign:"center",
    }        
});