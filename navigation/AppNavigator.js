import React, { Component, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CaptureScreen from '../screens/CaptureScreen';
import {NavigationContainer} from '@react-navigation/native';

import TrainingNavigator from '../navigation/TrainingNavigator';



const MainNavigator = createStackNavigator()


const  AppNavigator =()=>{
    var [isready, setIsReady] = useState(false);
    
    return(
        <NavigationContainer>
            <MainNavigator.Navigator>
                <MainNavigator.Screen name = "Home" component = {HomeScreen} options = {{headerShown: false}}/>
                <MainNavigator.Screen style = {{flex: 1}} name = "Capture" component = {CaptureScreen}/>
                <MainNavigator.Screen name = "TrainFaces" component = {TrainingNavigator} options = {{headerShown: false}} />
            </MainNavigator.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator;

