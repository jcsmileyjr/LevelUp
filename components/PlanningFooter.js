import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Footer} from 'native-base';

const PlanningFooter = (props) =>{
    return(
        <Footer style={styles.footerStyle}>
            <View>
                <Text style={styles.footText}>S - Specific</Text>
                <Text style={styles.footText}>M - Measureable</Text>
                <Text style={styles.footText}>A - Achievable</Text>
                <Text style={styles.footText}>R - Relevant</Text>
                <Text style={styles.footText}>T - Time Bound</Text>
            </View>
            <View style={styles.rightSideText}>
                <Text style={styles.footText}>Create</Text>
                <Text style={[styles.footText, styles.biggerFont]}>SMART</Text>
                <Text style={styles.footText}>Goals</Text>
            </View>
        </Footer>
    );
}

export default PlanningFooter;

const styles = StyleSheet.create({
    footerStyle:{
        backgroundColor:'#00009C',//light navy color
        height:100,
        alignItems:"stretch", 
        justifyContent:"space-evenly", 
      },
      footText:{
        color: "#ffffff", //text color
        fontWeight:"bold",  //Bigger text
      },
      rightSideText:{
          justifyContent:"space-around",
      },
      biggerFont:{
          fontSize:20,
      }
});