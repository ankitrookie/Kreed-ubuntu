import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

const Chat = () => {
  const [textInputWidth, setTextInputWidth] = useState(250);
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const iconColor = 'rgba(255,255,255,0.8)';
  const iconSize = 20;

  const handleSend = () => {
    console.log('Sending message:', inputText);
    setInputText('');
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.res[0].uri };
        console.log(response.uri);

      }
    });
  };

  const back = () => {
    navigation.goBack();
  };

  const handleTextInputFocus = () => {
    setTextInputWidth(350); // Width when TextInput is clicked
  };

  return (
    <View style={styles.container} className="p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-4 items-center">
          <TouchableOpacity onPress={back}>
            <Icon2 name={'arrow-back'} size={25} color="white" />
          </TouchableOpacity>

          <View className="border border-[#86d957] rounded-full">
            <Image
              className="h-[42px] w-[42px] rounded-full"
              source={require('../assets/images/saina.png')}
            />
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 14, fontFamily: 'Poppins-Regular' }}>Ankit Singh</Text>
            <Text style={{ color: "#86D957", fontSize: 10, fontFamily: 'Poppins-Regular' }}>Active now</Text>
          </View>
        </View>

        <View className="flex-row justify-center items-centers space-x-6">
          <TouchableOpacity
            style={styles.circleIconContainer}
            onPress={() => console.log('Phone call')}>
            <Icon name="phone" size={iconSize} color={"#86D957"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleIconContainer}
            onPress={() => console.log('Phone call')}>
            <Icons name="videocam" size={iconSize} color={"#86D957"} />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={() => console.log('Photo')}>
          <Icon name="camera" size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { width: textInputWidth }]}
          placeholder="Message"
          placeholderTextColor={"rgba(255,255,255,.7)"}
          value={inputText}
          onChangeText={setInputText}
          onFocus={handleTextInputFocus}
        />
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={() => console.log('File')}>
          <Icon name="microphone" size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={selectImage}>
          <Icon name="photo" size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={() => console.log('Microphone')}>
          <Icon3 name="sticker-emoji" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  upperTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    height: 60,
    borderBottomColor: "rgba(255,255,255,.5)",
    borderWidth: 1,
  },
  circleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,.1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  bottomView: {
    borderWidth: 2,
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 40,
    marginBottom: 15,
    backgroundColor: "#3d4044",
    marginRight: "auto",
    marginLeft: "auto"
  },
  bottomIconContainer: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    color: "rgba(255,255,255,.8)",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagetext: {
    color: "white"
  }
});

export default Chat;
