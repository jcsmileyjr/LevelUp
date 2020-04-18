import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Footer} from 'native-base';

const FooterWithButton = (props) =>{
    return(
        <Footer style={styles.footerStyle}>
          {/**Display a button to add a new goal */}
					<View style={styles.buttonContainer}>
						<TouchableNativeFeedback onPress={() => props.navigation.navigate(props.nav)} >
								<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>{props.text}</Text>
								</View>
						</TouchableNativeFeedback>
          </View>  
        </Footer>
    );
}

export default FooterWithButton;

const styles = StyleSheet.create({
    footerStyle:{
        backgroundColor:'#00009C',//signature purple color
        display:'flex', //center the elements
        alignItems:"center", 
        justifyContent:"center", 
      },
			buttonStyle:{//style for the finish button
				backgroundColor:'white',//signature dark blue color 
				paddingTop: 8, //space between button title and border
				paddingBottom: 8, //space between button title and border
				margin: 10, //whitespace between button and other elements
				width: 250, //width of button
				borderColor:'white',//signature purple color
				borderRadius: 15, //round the corners    
			},
			buttonContainer:{
				alignItems:"center",  //help center the button
				justifyContent:"center",
			},
			buttonText:{
				color: "navy", //text color
				textAlign:"center", //center the text
				fontWeight:"bold",  //Bigger text
			}
});