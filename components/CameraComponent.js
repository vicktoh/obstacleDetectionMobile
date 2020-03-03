import React, { Component } from 'react';
import {View} from  'react-native';
import {Text, Button, Image} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {Camera} from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import {cameraOverlayTextStyle} from '../styles/textStyles';




const CAMERA_FRONT = Camera.Constants.Type.front;
const CAMERA_BACK = Camera.Constants.Type.back;

const FLASH_MODES = {
    on: Camera.Constants.FlashMode.on,
    off: Camera.Constants.FlashMode.off,
    auto: Camera.Constants.FlashMode.auto
}


export default class CameraComponent extends Component{
    state = {
        mode: 'camera',
        type: CAMERA_BACK,
        flash: Camera.Constants.FlashMode.off,
        image: null,
        flashButtonColor: 'white',
        currentImage: null,
        buttonLoad : false
    }
    
    flipCamera =()=>{
        this.state.type == CAMERA_BACK ? this.setState({type: CAMERA_FRONT}) : this.setState({type: CAMERA_BACK})
    }
    toggleFlashMode = ()=>{
        if(this.state.flash == FLASH_MODES['off']){
            this.setState({flash: FLASH_MODES['auto'], flashButtonColor : 'blue'});
            return
        }
        if(this.state.flash == FLASH_MODES['auto']){
            this.setState({flash: FLASH_MODES['on'], flashButtonColor: 'yellow'});
            return;
        }

        this.setState({flash: FLASH_MODES['off'], flashButtonColor: 'white'})
    }
    snapPicture = async ()=>{

        let image = await new Promise(async resolve => {
            await this.camera.takePictureAsync({onPictureSaved : resolve, base64: true});
            this.camera.pausePreview();
            });
            this.camera.resumePreview();
            this.setState({image: image.uri, mode: 'image', currentImage: image});
        
    }

    savePicture = async ()=>{
        this.setState({buttonLoad: true})
        await this.props.addImage(this.state.currentImage);
        this.setState({mode: 'camera', buttonLoad: false});
    }
    cancelSave = ()=>{
        this.setState({mode: 'camera'});
    }
    render(){
        if(this.state.mode == 'camera'){
            let count = this.props.imagecount
            console.log(this.props);
            return(
                <View style={styles.cameraContainerStyle}>
                    <Camera style={styles.cameraStyle} ref={ref => this.camera = ref} type={this.state.type} flashMode={this.state.flash}>
                        <View style={styles.cameraActionStyle}>
                            <Button type="clear" raised icon={<Icon name="bolt" color={this.state.flashButtonColor} size={24} />} onPress={this.toggleFlashMode} />
                            <Text style = {cameraOverlayTextStyle}>{count + ' Of 5'}</Text>
                            <Button type="clear" raised icon={<Icon name="undo" color="white" size={24} />} onPress={this.flipCamera} />
                        </View>
                        <View style={styles.buttonContainerStyle}>
                            <Button
                                type="clear"
                                raised
                                icon={
                                    <Icon
                                        name="camera"
                                        color="white"
                                        size={50}
                                    />
                                }
                                onPress={this.snapPicture}
                            />
                        </View>
                    </Camera>
                </View>
            )
        }
        
        return (
            <View style = {styles.imageContainerStyle}>
            <Image  containerStyle={{ flex: 1}} style = {{flex: 1}} source = {{uri:this.state.image}} />
            <View style = {styles.imageActionContainerStyle}>
                <Button loading = {this.state.buttonLoad} type = "outline" icon = {<Icon name = "save" color = "black" size = {24}/>} onPress = {this.savePicture} />
                <Button type = "outline" icon = {<Icon name = "times" color = "black" size = {24}/>} onPress = {this.cancelSave}/>
            </View>
            </View>
        )
    }
}

const styles = {
    imageContainerStyle:{
        flex: 1,
        padding: 10
    
    },
    imageActionContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    cameraContainerStyle:{
        flex: 1,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    cameraActionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 5,
    },
    captureContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',

    },
    cameraStyle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 15,
    },
    buttonContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    savingContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
