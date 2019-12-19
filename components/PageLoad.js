import React from 'react';
import {StyleSheet} from 'react-native';
import {Spinner, Container,Content, Grid, Row, Col} from 'native-base';

const PageLoad = () =>{
    return(
        <Container >
            <Content contentContainerStyle={{alignItems:"center", justifyContent:"center", height:"100%"}}>
                <Spinner style={{fontSize:50}} color="navy" />  
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
pageStyle:{
    alignItems:"center", 
    justifyContent:"center",
}
});

export default PageLoad;