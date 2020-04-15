import React, { useState } from 'react';
import {View, StyleSheet, TextInput, TouchableNativeFeedback} from 'react-native';
import {Text, Container, Content,H1} from 'native-base';

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

const EditMilestone = (props) => {
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentDescr, setCurrentDescr] = useState("");
	const updateTitle = (text) => {setCurrentTitle(text)};
	const updateDescri = (text) => {setCurrentDescr(text)};

	return (
		<Container>
			<Head  /> 
			<Content>
				<View>
					<H1 style={styles.layoutStyle1}>Add Milestones</H1>
				</View>
				<View>
					<H1 style={[styles.layoutStyle1, styles.goalTitleStyle]}>Original Goal</H1>					
				</View>
				<View style={styles.inputContainter}>
					<TextInput 	style={styles.textAreaStyle} 
											placeholder="Original Milestone Title" 
											placeholderTextColor="darkgrey"
                      multiline={true}
											/>
				
					<TextInput 	style={styles.textAreaStyle} 
											placeholder="Original Milestone Description"
											placeholderTextColor="darkgrey"
                      multiline={true}
											/>
				</View>
                    {/**Display a button to add a new goal */}
                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback onPress={() => {this.props.navigation.navigate("Goal"); this.updateGoals(); this.setCurrentMilestones();}} >
                            <View style={styles.buttonStyle}>
                                <Text style={styles.buttonText}>FINISH</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
			</Content>
			<Foot title="*Check off a milestone when finished. View it on the Acheivement Timeline" />
		</Container>
	);
}

export default EditMilestone;

const styles = StyleSheet.create({
	contentLayout:{
			display:"flex",
			justifyContent:"space-between",
			alignItems:"center",
			height: 100,
	},
	pageTitleStyle:{
		textAlign:"center",
		marginBottom:20,
	},
	goalTitleStyle:{
		textDecorationLine:"underline",
	},
	layoutStyle1:{
		textAlign:"center",
		marginBottom:20,	
		color:"navy",	
	},
	textAreaStyle: {//styles for the milestone input text box
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
inputContainter:{//ensure the a icon and input box is on the same row
	display:"flex", 
	//flexDirection:"row",
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
	});