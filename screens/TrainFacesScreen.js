import React, { Component, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import { facesUrl, addFaces } from '../constants/Endpoints';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import CameraComponent from '../components/CameraComponent';
import { textStyle } from '../styles/textStyles';
import firebase from 'firebase';







export default function TrainFacesScreen(props) {
  var [images, setImages] = useState([]);
  var [name, setName] = useState('');
  var [namecomplete, setNameComplete] = useState(false)
  var [sending, setSending] = useState(false);
  var database = firebase.database().ref('faces');



  const addImage = async (image) => {
    console.log(image)
    

    let blob = await uriToBlob(image.uri);

    let uploadTask = await uploadToFirebase(blob, name, images.length + 1);
    console.log(uploadTask);

    let url = await uploadTask.ref.getDownloadURL();
    console.log(url);
    let newImages = [...images, url]
    setImages(newImages);
    console.log(newImages);
  }
  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }
  uploadToFirebase = (blob, name, i) => {
    return new Promise((resolve, reject)=>{
      var storageRef = firebase.storage().ref();
      let strPath = `faces/${name}/${i}.jpg`;
      storageRef.child(strPath).put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
  const finish = async() => {
    let obj = { name , images};
    setSending(true)
    let ref = await  firebase.database().ref(`faces/${name}`).set(obj);
    setSending(false)
    props.navigation.navigate('Faces')
  }

  if(images.length == 5){
    let imageUrl = images[0]
    return(
      <View style = {styles.finishContainerStyle}>
      <Avatar source={{ uri: imageUrl }} containerStyle={styles.avartarContainerStyle} rounded tile="NP" size={150} />
        <Text style = {textStyle}>Save Face Details</Text>
        <Button loading = {sending} containerStyle = {styles.buttonContainerStyle} title = "Finish" onPress = {finish} outline />
      </View>
    )
  }


  if (!namecomplete) {
    
    return (
      <View style={styles.savePreviewContainerStyle}>
        <Input onChangeText={(text) => { setName(text) }} containerStyle={styles.inputContainerStyle} labelStyle={styles.inputLabelStyle} label="Name of Person" />
        <Button  onPress={ () =>{setNameComplete(true)}} containerStyle={styles.buttonContainerStyle} title="Next" type="outline" raised />

      </View>
    )
  }

  return (
    <View style={styles.containerStyle} >
      <CameraComponent addImage={addImage} imagecount={images.length + 1} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    alignSelf: 'center',
  },
  savePreviewContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50,

  },
  avartarContainerStyle: {
    margin: 30,
  },
  inputLabelStyle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainerStyle: {
    marginBottom: 10
  },
  buttonContainerStyle: {
    margin: 30
  },
  finishContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  }
})