import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, Text, Header, Content, Left, Body, Right, Button, Icon} from 'native-base';

const Head = () => {
    return(
        <View>
        {/*Displays the App's Title, current section, and menu button */}
            <Header style={styles.headerStyles}>
                <Left style={styles.headerContent}><Text style={styles.headerText}>Git Push You</Text></Left>
                <Body style={styles.headerContent, styles.headerSection}><Text style={[styles.headerText, styles.headerTitle]}>Goals</Text></Body>
                <Right style={styles.headerContent}>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Right>
            </Header>            
        </View>
    );
}

export default Head;

const styles = StyleSheet.create({
    headerStyles:{
        marginTop:25, //add space above the header
        marginBottom:30, //add space below the header
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
        //fontWeight:"bold",  //Bigger text
        fontSize:20, //size of text
      },
      headerSection:{
        alignItems:"center",  //help center the text
        justifyContent:"center",    
      },
      headerTitle:{
        textDecorationLine:"underline", //Text is underlined
        fontWeight:"bold",  //Bigger text
      },
});
