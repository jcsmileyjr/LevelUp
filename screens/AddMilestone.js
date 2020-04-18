import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native';
import { Text, Container, Content, H1, Toast } from 'native-base';

import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage
import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions
import MissingInformationWarning from '../components/WarningToast.js';//Warning Toast for missing information

const AddMilestone = ({ navigation }) => {
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentDescr, setCurrentDescr] = useState("");
	const [currentGoalTitle, setGoalTitle] = useState("")

	useEffect(() => {
		this.getMilestone();
	}, []);

	//Called during mount, function to load data from local storage (acquired in the Milestone screen) into state
	getMilestone = async () => {
		const goalTitle = await AsyncStorage.getItem('currentGoalTitle');// load a title string
		setGoalTitle(goalTitle);
	}

	//compare each goal's title with the current goal title and return current index location
	findGoalIndex = (arrayOfGoals) => {
		let goalLocation = -1;
		arrayOfGoals.forEach((goal, index) => {
			const convertedTitle = JSON.stringify(goal.goal);//convert goal title into a string			
			if (convertedTitle === currentGoalTitle) {//compare converted goal title with current goal tilte
				goalLocation = index
			}
		});
		return goalLocation;
	}

	//search an array of milestones for a milestone object whose title matches the current milestone title
	findMilestoneIndex = (arrayOfMilestones) => {
		let milestoneLocation = -1;
		arrayOfMilestones.forEach((milestone, index) => {
			if (milestone.title === currentMilestone.title) {
				milestoneLocation = index;
			}
		});
		return milestoneLocation;
	}

	//Create a new milestone, save the data to local storage, and return user to the milestone screen
	createMilestone = async () => {
		if(currentTitle !== "" && currentDescr !== ""){
			const downloadedGoals = await AsyncStorage.getItem("userGoals"); //get saved goals from local storage
			const listOfGoals = JSON.parse(downloadedGoals);//convert saved user goals into a json file		
			const goalLocation = findGoalIndex(listOfGoals);//search list of goals for the current goal
	
			let newMilestone = {};//create a new milestone from user's input
	
			//create a new milestone from user's input. If nothing has change, use old data
			newMilestone.title = currentTitle;
			newMilestone.description = currentDescr;
	
			//replace old milestone with new milestone
			listOfGoals[goalLocation].milestones.push(newMilestone);
	
			//Save updated list of goals to local storage
			AsyncStorage.setItem("userGoals", JSON.stringify(listOfGoals));//Save updated array of objects to local storage
	
			//Save current milestone to local storage
			AsyncStorage.setItem("currentMilestones", JSON.stringify(listOfGoals[goalLocation].milestones)); //saves the goal's milestones
	
			navigation.navigate("Milestone");//return user to Milestone screen
		}else{
			MissingInformationWarning();
			console.log("Missing information to create new milestone on AddMilestone Screen");
		}
	}	

	return (
		<Container>
			<Head navigation={navigation} />
			<Content>
				<View>
					<H1 style={styles.layoutStyle1}>Add Milestone</H1>
				</View>
				<View>
					<H1 style={[styles.layoutStyle1, styles.goalTitleStyle]}>{currentGoalTitle}</H1>
				</View>
				<View style={styles.inputContainter}>
					<TextInput style={styles.textAreaStyle}
						placeholder="TYPE MILESTONE TITLE"
						placeholderTextColor="darkgrey"
						multiline={true}
						onChangeText={(milestoneTitle) => setCurrentTitle(milestoneTitle)}
					/>

					<TextInput style={styles.textAreaStyle}
						placeholder="TYPE MILESTONE DESCRIPTION"
						placeholderTextColor="darkgrey"
						multiline={true}
						onChangeText={(milestoneDescr) => setCurrentDescr(milestoneDescr)}
					/>
				</View>
				{/**Display a button to update milestone */}
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback onPress={() => { this.createMilestone(); }} >
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonText}>Create Milestone</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</Content>
			<Foot title="Create a new Milestone." />
		</Container>
	);
}

export default AddMilestone;

const styles = StyleSheet.create({
	contentLayout: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: 100,
	},
	pageTitleStyle: {
		textAlign: "center",
		marginBottom: 20,
	},
	goalTitleStyle: {
		textDecorationLine: "underline",
	},
	layoutStyle1: {
		textAlign: "center",
		marginBottom: 20,
		color: "navy",
	},
	textAreaStyle: {//styles for the milestone input text box
		width: 270,
		color: '#2B65EC',  //blue text color
		textAlign: "center",
		height: 50,
		borderColor: "grey",
		borderWidth: 1,
		elevation: 1,
		margin: 20,
		fontSize: 18,
	},
	inputContainter: {//ensure the a icon and input box is on the same row
		display: "flex",
		//flexDirection:"row",
		alignItems: "center",  //help center the button
		justifyContent: "center",
	},
	buttonStyle: {//style for the finish button
		backgroundColor: 'navy',//signature dark blue color 
		padding: 10, //space between button title and border
		margin: 10, //whitespace between button and other elements
		width: 250, //width of button
		borderColor: 'navy',//signature purple color
		borderRadius: 15, //round the corners    
	},
	buttonContainer: {
		alignItems: "center",  //help center the button
		justifyContent: "center",
	},
	buttonText: {
		color: "#ffffff", //text color
		textAlign: "center", //center the text
		fontWeight: "bold",  //Bigger text
	},
});