import React, { Component, useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { facesUrl, faceImages} from '../constants/Endpoints';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase';



export default function FacesScreen(props) {
    const {navigation, routes} = props;
    var [isReady, setIsReady] = useState(false);
    var [faces, setFaces] = useState(null);

    useEffect(()=>{
      let fetchdata = async()=>{
      let data = await firebase.database().ref('faces').on('value', (snapshot)=>{
        let gotfaces = []
        snapshot.forEach((data, i)=>{
          let face = data.val();
          console.log(face);
          gotfaces.push(face);
        });
        console.log(gotfaces);
        setIsReady(true)
        setFaces(gotfaces);
  

      })
      }
      if(!faces || faces.length < 1){
        fetchdata();
      }
      
    }, [faces])

    

    if(!isReady){
      return(
        <View style={{ flex: 1 }}>
          <LottieView style={{ flex: .6 }} source={require('../assets/animations/face.json')} autoPlay loop />
          <Text>Getting Faces...</Text>
        </View>
      )
    }
    console.log(faces);
    if(faces && faces.length < 1){
      return(
        <View style={{ flex: 1, padding : 20 }}>
          <View style={styles.textContainerStyle}>
            <Text style={styles.textStyle}>No faces added yet Click the Button to add faces</Text>
          </View>
          <View style={styles.containerStyle}>
            <Button
              icon={
                <Icon
                  name="plus"
                  size={50}
                  color="black"
                />
              }
              buttonStyle = {styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              raised
              type = "clear"
              rounded
              onPress = {()=>{navigation.navigate('Train')}}
            />
          </View>
        </View>
      )
    }
    if(faces && faces.length > 0){
      console.log('faces present');
      return (<View style = {styles.facesContainerStyle}>
            {
              faces.map((face, i)=>{
                return(<ListItem
                key = {i}
                title = {face.name}
                leftAvatar = {{source:{uri: face.images[0]}}}
                />)

              })
            }
            <View style={styles.containerStyle}>
            <Button
              icon={
                <Icon
                  name="plus"
                  size={50}
                  color="black"
                />
              }
              buttonStyle = {styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              raised
              type = "clear"
              rounded
              onPress = {()=>{navigation.navigate('Train')}}
            />
          </View>
      </View>);
    }
    return (
        <View>
          <Text>This is the Faces Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
      flex: 1,
      justifyContent: 'flex-end'
    },
    textStyle:{
      alignSelf: 'center',
    },
    buttonContainerStyle:{
      alignSelf: 'flex-end',
    },
    buttonStyle:{
      borderRadius: 30,
    },
    textContainerStyle:{
      flex : 1,
      position: 'absolute',
      borderWidth: 2,
      borderColor: 'black',
      margin: 10,
      padding: 50,
    },
    facesContainerStyle :{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding : 20
    }
  })