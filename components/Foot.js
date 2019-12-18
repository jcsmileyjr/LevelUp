import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Footer} from 'native-base';

const Foot = (props) =>{
    return(
        <Footer style={styles.footerStyle}>
            <View><Text style={styles.footText}>{props.title}</Text></View>
        </Footer>
    );
}

export default Foot;

const styles = StyleSheet.create({
    footerStyle:{
        backgroundColor:'#9C08AB',//signature purple color
        display:'flex', //center the elements
        alignItems:"center", 
        justifyContent:"center", 
      },
      footText:{
        color: "#ffffff", //text color
        textAlign:"center", //center the text
        fontWeight:"bold",  //Bigger text
      }
});