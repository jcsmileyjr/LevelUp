import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, Row, Col, Text,Content, List, ListItem, H1, Icon, Header, Footer } from 'native-base';
import paths from '../data/FE_Path.js';
import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

export default class Goal extends React.Component {
  state = {listOfTech:[]};
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
    });//load fonts needed for certain components in NativeBase
    this.setState({listOfTech:paths});//When the fonts is loaded, update "isReady" to show the app
    }

    render(){
        return(
            <Container>
                <Head navigation={this.props.navigation} />
                <Content>
                    <H1 style={styles.pageTitle}>Front End Developer Path</H1>
                    <List>
                    {
                        this.state.listOfTech.map((path, id) =>{
                            return(
                                <View key={id}>
                                    <ListItem><Text>{path.title}: {path.descr}</Text></ListItem>
                                </View>
                            );
                        })                    
                    }
                    </List>
                </Content>
                <Foot title="Use this as a inspiration for your goals" />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    pageTitle:{
      color:"navy",
      textAlign:"center",
    }
  });