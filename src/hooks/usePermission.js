import React from 'react';
import {Camera} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

const usePermission = () => {
  const navigation = useNavigation();

  const requestPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${cameraPermission}`);
    const microphonePermission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${microphonePermission}`);

    if (cameraPermission === 'granted' && microphonePermission === 'granted') {
      navigation.navigate('CameraPage');
    } else {
      <View />;
    }
  };

  return {
    requestPermission,
  };
};

export default usePermission;
