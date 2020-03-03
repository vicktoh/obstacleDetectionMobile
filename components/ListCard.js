import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';


export default ListCard = (props)=>{
    let { image, headerText, description, onPress} = props;

    return(
        <TouchableOpacity onPress = {onPress}>
            <View style = {styles.containerStyle}>
           {image}
           <View style = {styles.textContainerStyle}>
               <Text style = {styles.headerStyle}>{props.headerText}</Text>
               <Text style = {styles.descriptionStyle}>{props.description}</Text>
           </View>
        </View>
        </TouchableOpacity>
        
    )
}

const styles = {
    containerStyle :{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 3,
        shadowColor: '#000',
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignContent: 'space-between',
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textContainerStyle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        
    },
    headerStyle:{
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
    },
    descriptionStyle:{
        fontFamily: 'Montserrat',
        fontSize: 11,
    
    }
}