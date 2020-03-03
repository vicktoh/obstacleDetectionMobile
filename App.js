import React, { Component, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import firebase from 'firebase';

import AppNavigator from './navigation/AppNavigator';


export default function App (props){
  var [ready, setReady] = useState(false);

  if(!ready){
    return(
      <AppLoading startAsync = {loadAssets} onFinish = {()=>setReady(true)} onError = {console.warn}/>
    )
     
  }
  return (
      <AppNavigator/>
    
  )
}


const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle:{
    alignSelf: 'center',
  }
})

const loadAssets = async ()=>{
  await Font.loadAsync({
    Roboto: require('./assets/fonts/Roboto-Medium.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-Bold": require('./assets/fonts/Montserrat-Bold.ttf')
  });

  await Asset.loadAsync([
    require('./assets/images/detect.png'),
    require('./assets/images/recognize.png')
  ]);

  var firebaseConfig = {
    apiKey: "AIzaSyAomMayYiNrtFWy3Eld4YSsM6hypGRgpi8",
    authDomain: "eyeapp-ca877.firebaseapp.com",
    databaseURL: "https://eyeapp-ca877.firebaseio.com",
    projectId: "eyeapp-ca877",
    storageBucket: "eyeapp-ca877.appspot.com",
    messagingSenderId: "342865162704",
    appId: "1:342865162704:web:f71bf4948978352a8049d5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

}