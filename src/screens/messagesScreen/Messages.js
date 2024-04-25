import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';

// width and height
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// message data
import { messages } from '../../constants/index';
import { RoomHeader } from '../../components';

const Messages = (props) => {
  const navigation = useNavigation();

  const goback = () => {
    navigation.goBack();
  }

  const gotoprofile = () => {
    navigation.navigate('Profile');
  };

  const colors = [
    '#FFCDD2',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#C5CAE9',
    '#BBDEFB',
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };


  const CircleIcon2 = ({ avatar, name, hasRead, timestamp, backgroundColor }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        className="flex-row justify-between items-center m-2 bg-[#17191e] rounded-full"
      >
        <View className="flex-row items-center space-x-4">
          <Image
            className="h-[50px] w-[50px] rounded-full"
            source={avatar}
          />
          <View className="space-y-2">
            <Text className="text-[16px] text-white font-normal leading-normal" style={{ fontFamily: 'Inter-Regular' }}>{name}</Text>
            <Text className="text-[10px] text-white font-normal" style={{ fontFamily: 'Inter-Regular' }}>Hello</Text>
          </View>
        </View>


        <View className="justify-center items-center space-y-2 pr-5">
          <Text className="text-[8px] text-white" style={{ fontFamily: 'Inter-Regular' }}>{timestamp}</Text>
          <View style={[styles.box2, { backgroundColor }]}>
            <Text className="text-[#000000]" style={{ fontFamily: 'Poppins-Regular' }}>2</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };


  const CircleIcon = ({ name, backgroundColor }) => {
    return (
      <TouchableOpacity style={styles.iconContainer}>
        <View
          style={{
            height: 70,
            width: 70,
            backgroundColor: backgroundColor,
            borderRadius: 45,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            marginLeft: 10,
          }}>
          <Image
            style={{ height: 55, width: 55 }}
            source={require('../../assets/images/download1.png')}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View className="flex-1 bg-[#05080D]">
    <View className="p-4">
      <RoomHeader route='Message' />
    </View>
      
      <View className="mx-4">
        <TextInput placeholder="Add a comment..." placeholderTextColor="#FFFFFF99" className="bg-[#FFFFFF1F] rounded-full px-4" />
      </View>

      {/* Other components */}
      <Text className="text-[16px] text-white mt-4 p-4" style={{ fontFamily: 'Poppins-Regular' }}>Messages</Text>
      <ScrollView>
        {messages.map(message => (
          <CircleIcon2
            key={message.id}
            index={message.id}
            avatar={message.avatar}
            name={message.name}
            timestamp={message.timestamp}
            hasRead={message.hasRead}
            backgroundColor={getRandomColor()}
          />
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  box2: {
    width: 20,
    borderWidth: 1,
    borderColor: 'green',
    height: 20,
    borderRadius: 17,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontsize: 21,
    color: 'white',
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 11,
    opacity: 0.8,
  },
  box: {
    backgroundColor: '#17191e',
    alignItems: "center",
    borderRadius: 40,
    flexDirection: 'row',
    marginTop: 20,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'blue',
  },
  name: {
    marginTop: 10,
  },
});

export default Messages;
