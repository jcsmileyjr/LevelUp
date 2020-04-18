import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native';
import { Text, Container, Content, H1, DatePicker } from 'native-base';

import { AsyncStorage } from 'react-native';//Function to allow saving and reading from local storage
import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions
import MissingInformationWarning from '../components/WarningToast.js';//Warning Toast for missing information

//Screen to add an achievement to the achievement page without formally createing one on the planning screen
const ManualAddProgress = ({ navigation }) => {
	const [milestoneTitle, setMilestoneTitle] = useState("");//saves user inputted milesone title
	const [milestoneDescr, setMilestoneDescr] = useState("");//saves user inputted milesone description
	const [userPickedDate, setUserPickedDate] = useState("");//saves user inputted date from date picker
	const [currentGoalTitle, setGoalTitle] = useState("");//saves user inputted goal title
	

	//Create an achievement and add it to array of achievements in local storage
	createAchievement = async () => {
		try {
			if(currentGoalTitle !== "" && milestoneTitle !=="" && milestoneDescr !=="" && userPickedDate !==""){
				const arrayOfAchievements = await AsyncStorage.getItem('achievements');//get saved achievements from local storage
				let achievements = [];
				let progress = {};
				progress.goal = currentGoalTitle;
				progress.title = milestoneTitle;
				progress.description = milestoneDescr
				progress.date = this.getDate(userPickedDate);
			
				if (arrayOfAchievements !== null) {
					achievements = JSON.parse(arrayOfAchievements);//parse string into an array of objects              
					achievements.push(progress);//update array with new objet
				} else {
					achievements.push(progress)//create a new array with first object                     
				}
	
				await AsyncStorage.setItem("achievements", JSON.stringify(achievements));//Save array of acheivements to local storage      
				navigation.navigate("Progress");
			}else{
				MissingInformationWarning();
				console.log("Missing information to create new milestone on AddMilestone Screen");
			}

		} catch (e) {
			console.log("Failed to update acheivements local storage in Milestone screen");
		}
	}

	//Format user chosen date into a string to be displayed on Achievement Screen
	getDate = (chosenDate) => {
		const formatDate = new Date(chosenDate);
		const day = formatDate.getDate();
		const month = (formatDate.getMonth()) + 1;
		const year = formatDate.getFullYear();
		return month + "/" + day + "/" + year;
	}

	return (
		<Container>
			<Head navigation={navigation} />
			<Content>
				<View>
					<H1 style={styles.layoutStyle1}>Manual Add Acheivement</H1>
				</View>
				<View style={styles.inputContainter}>
					<TextInput style={styles.textAreaStyle}
						placeholder="Goal Title"
						placeholderTextColor="darkgrey"
						multiline={true}
						onChangeText={(goalTitle) => setGoalTitle(goalTitle)}
					/>

					<TextInput style={styles.textAreaStyle}
						placeholder="Milestone Title"
						placeholderTextColor="darkgrey"
						multiline={true}
						onChangeText={(milestoneTitle) => setMilestoneTitle(milestoneTitle)}
					/>
					<TextInput style={styles.textAreaStyle}
						placeholder="Milestone Description"
						placeholderTextColor="darkgrey"
						multiline={true}
						onChangeText={(milestoneDescr) => setMilestoneDescr(milestoneDescr)}
					/>
					<DatePicker
						defaultDate={new Date(2020, 4, 4)}
						modalTransparent={false}
						animationType={"fade"}
						androidMode={"default"}
						placeHolderText="Select date"
						textStyle={{ color: "green" }}
						placeHolderTextStyle={{ color: "#d3d3d3" }}
						onDateChange={(date) => setUserPickedDate(date)}
						disabled={false}
					/>
				</View>
				{/**Display a button to update milestone */}
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback onPress={() => { this.createAchievement(); }} >
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonText}>Create Achievement</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</Content>
			<Foot title="Update the milestone's title or description." />
		</Container>
	);
}

export default ManualAddProgress;

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
		margin: 10,
		fontSize: 18,
	},
	inputContainter: {//ensure the a icon and input box is on the same row
		display: "flex",
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