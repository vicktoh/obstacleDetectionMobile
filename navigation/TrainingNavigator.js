
import React, { Component } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FacesScreen from '../screens/FacesScreen';
import TrainFacesScreen from '../screens/TrainFacesScreen';

const TrainingStack = createStackNavigator();



const  TrainingNavigator = () =>{
    return(
        <TrainingStack.Navigator >
            <TrainingStack.Screen name = "Faces" component = {FacesScreen}/>
            <TrainingStack.Screen name = "Train" component = {TrainFacesScreen}/>
        </TrainingStack.Navigator>
    )
}

export default TrainingNavigator;