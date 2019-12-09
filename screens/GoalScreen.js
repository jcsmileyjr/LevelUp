import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }


  render() {

    return (
      <Container>
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
          <Card transparent>
            <CardItem>
              <Body>
                <Text style={{color:'#9C08AB'}}>1</Text>
                <Text style={{color:'#9C08AB'}}>Learn React.js (Web development)</Text>
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
    marginTop:10, 
    backgroundColor:'#9C08AB', 
    color:'white', 
    display:'flex', 
    alignItems:"center", 
    justifyContent:"center"
  },
  headerContent:{
    flex:1,
  },
  headerText:{
    color:"white",
    fontWeight:"bold",
    fontSize:20,
    textAlign:"center",
  },
  headerSection:{
    alignItems:"center",
    justifyContent:"center",
  }
});