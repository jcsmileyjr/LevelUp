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
          <Header style={{marginTop:10, backgroundColor:'#9C08AB', color:'white'}}>
              <Left><Text style={{color:'white'}}>Goals</Text></Left>
              <Body><Text style={{color:'white'}}>Git Push You</Text></Body>
              <Right>
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