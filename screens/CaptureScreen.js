import React, { Component, useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Camera} from 'expo-camera';
import {cameraOverlayTextStyle, buttonTitleStyle} from '../styles/textStyles'
import axios from 'axios';
import {detectObjectUrl, recognizeFace} from '../constants/Endpoints'
import * as Speech from 'expo-speech';




export default function CaptureScreen(props) {
  var [hasPermission, setPermission] = useState(null);
  var [detectionStart, setDetectionStart] = useState(false);

  const snapPicture = async ()=>{
    setDetectionStart(true);
    const status = await this.camera.takePictureAsync({base64:true, quality: 1});
    let response = await uploadPic(status);
    let {predictions} = response.data;
    console.log(predictions);
    let speech = parseResponse(predictions);
    speak(speech);
    
    setDetectionStart(false);
  }

  const snapPictureFace = async ()=>{
    setDetectionStart(true);
    const status = await this.camera.takePictureAsync({base64:true, quality: 1});
    let response = await uploadPic(status, recognizeFace);
    console.log(response);
    
    let speech = parseFaceResponse(response.data);
    console.log(speech);
    speak(speech);
    
    setDetectionStart(false);
  }

  const parseFaceResponse = (faces)=>{
    if(faces.length < 1){
      return 'No Face Identified';
    }
    let names = [];
    faces.map((face, i)=>{
      names.push(face._label);
    })
    let nms = names.join(" ");
    let speech = `Faces recognized ${nms}`;
    return speech;
  }

  const uploadPic = async (image, url = detectObjectUrl) =>{
    console.log(image);
    let formdata = new FormData();
    let filename = image.uri.split('/').pop();
    let type = 'image/jpeg';
    let photo = {
      uri: image.uri,
      name: filename,
      type
    }
    formdata.append('image', photo);
    console.log(photo);
    return await axios.post(url, formdata, {
       headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    
    

  }

  const parseResponse = predictions =>{
    let output =  "";
    if(predictions.length < 1){
      return output = "Nothing detected";
    }

    let categories = {};
    predictions.forEach((prediction, index)=>{
      categories[prediction.class] = categories[prediction.class] ?  categories[prediction.class] + 1 : 1;
    })

    if(Object.keys(categories).length == 1){
      let key = Object.keys(categories)[0];
      let count = categories[key];
      output = `${count} ${key}`;
      return output;
    }
    for(category in categories){
      let count = categories[category];
      output += ` ${count} ${category}`;
    }
    return output;
    
  }

  const speak = async whatToSay =>{
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices)
    Speech.speak(whatToSay);
  }

  useEffect(() => {
    (async () => {
      if(!hasPermission){
        var {status, granted} = await Camera.requestPermissionsAsync();
      setPermission(granted);
      }
      

    })();
  }, []);
  if(!hasPermission){
    return (
      <View style = {{flex: 1}}>
        <Text>Request Permission</Text>
      </View>
    )
  }

    return (
        <View style = {styles.containerStyle}>
            <Camera style = {{flex: 1}} ref = {ref =>this.camera = ref}>
              <View style = {styles.overlayContainerStyle}>
              <Text style = {cameraOverlayTextStyle} >{detectionStart? "Detecting" : "Press Detect Button To Start"}</Text>
                <Button title = "Start Detecting"  titleStyle = {buttonTitleStyle} type = "outline" raised 
                loading = {detectionStart? true: false}
                onPress = {()=>{snapPicture()}}
                
                />
                <Button title = "DetectFace"  titleStyle = {buttonTitleStyle} type = "outline" raised 
                loading = {detectionStart? true: false}
                onPress = {()=>{snapPictureFace()}}
                
                />
              

              </View>
            
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
      flex: 1
    },
    textStyle:{
      alignSelf: 'center',
    },
    overlayContainerStyle:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 3,
      borderColor:  'white',
      paddingBottom:  20,
      paddingTop: 20

    }
  })

  