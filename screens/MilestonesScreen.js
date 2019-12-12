import React from 'react';
import {View, Stylesheet} from 'react-native';
import { Container, Text, Content, Button, Icon, Title, Card, CardItem } from 'native-base';
import { AppLoading } from 'expo';

import Head from '../components/header.js';
import Foot from '../components/Foot.js';

export default class Milestones extends React.Component {
    state = { isReady: false };
    async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),     
      });
      this.setState({isReady:true});
    }

    render() {
        if (!this.state.isReady) {
          return <AppLoading />;
        }

        return(
            <Container>
                <Head />
                <Content>
                    <View><Text>HEllo World</Text></View>
                </Content>
                <Foot />
            </Container>
        );
    }
}