import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native'
import {Button, Image} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import ListCard from '../components/ListCard';
import {headerStyle, buttonTitleStyle, textStyle} from '../styles/textStyles';


export default function HomeScreen(props) {

  const {navigation, routes} = props

    return (
      <View style={styles.containerStyle}>
        <View style = {styles.topContainerStyle}>
          <LottieView style={{ flex: 1 }} source={require('../assets/animations/eye.json')}  autoPlay loop/>
          <Text style={headerStyle}>Welcome</Text>
          <Text style={{...headerStyle, alignSelf: 'center',}}>eyeApp</Text>
          
        </View>
        <View style = {styles.bottomContainerStyle}>
        
          <ListCard image={<Image style={styles.imageStyle} source={require('../assets/images/detect.png')} />}
            headerText="Get started"
            description="Start detecting objects and faces in your environment"
            onPress={() => { navigation.navigate('Capture') }}
          />

          <ListCard image={<Image style={styles.imageStyle} source={require('../assets/images/recognize.png')} />}
            headerText="Manage Faces" 
            description="Add or Remove Faces that can be recognized"
            onPress={() => { navigation.navigate('TrainFaces') }}
          />
      
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      marginTop: 50,
    },
    textStyle:{
      alignSelf: 'center',
      textAlign: 'center'
    },
    buttonContainerStyle :{
      marginTop: 50,
      marginBottom: 30
    },
    topContainerStyle :{
      flex: .6,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    bottomContainerStyle:{
      flexDirection: 'column',
      padding: 20,
      justifyContent :'space-around',
      alignContent: 'space-around',
      flex: .6
    },
    imageStyle:{
      width: 60,
      height: 60
    }
  })