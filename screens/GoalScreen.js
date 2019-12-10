import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

//1st Screen the user will see. Allow viewing of overall goals/mission. 
export default class Goal extends React.Component {
  
  render() {

    return (
      <Container>
        {/*Displays the App's Title, current section, and menu button */}
          <Header style={styles.headerStyles}>
              <Left style={styles.headerContent}><Text style={styles.headerText}>Goals</Text></Left>
              <Body style={styles.headerContent, styles.headerSection}><Text style={styles.headerText}>Git Push You</Text></Body>
              <Right style={styles.headerContent}>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
              </Right>
          </Header>
          <View>
            {/**Display a goal's index and statement */}
          <Card transparent>
            <CardItem>
              <Body style={styles.goalStyle}>
                <Text style={[styles.goalText, styles.goalIndex]}>1</Text>
                <Text style={[styles.goalText, styles.goalBody]}>Learn React.js (Web development)</Text>
              </Body>
            </CardItem>
          </Card>
          </View>
          
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyles:{
    marginTop:10, //add space above the header
    backgroundColor:'#9C08AB', //signature purple background
    color:'white', //white text
    display:'flex', //center the elements
    alignItems:"center", 
    justifyContent:"center"
  },
  headerContent:{
    flex:1, //equal space among 3 elements
  },
  headerText:{
    color:"white",  //white text
    fontWeight:"bold",  //Bigger text
    fontSize:20,
  },
  headerSection:{
    alignItems:"center",  //help center the text
    justifyContent:"center",
  },
  goalStyle:{
    display:"flex", //Ensure the goal id and statement is in a row
    flexDirection:"row",
  },
  goalText:{
    color:'#9C08AB',  //signature purple color        
  },
  goalIndex:{
    fontSize:50,  //The goal' index size cover the entire row
    marginRight:20, //space between the index and statement
  },
  goalBody:{
    fontSize:30,  //text size
  }
});