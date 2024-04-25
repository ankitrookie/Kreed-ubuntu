import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {ArrowPathIcon, CheckIcon} from 'react-native-heroicons/outline';
import {ActionButton} from '../ui';

const HostLivePlayroomChooseModal = ({modal, setModal}) => {
  const navigation = useNavigation();
  const [selectedPlayers, setSelectedPlayers] = useState({
    firstTeam: [],
    secondTeam: [],
  }); // team member
  console.log(
    'Ankit',
    selectedPlayers.firstTeam.length,
    selectedPlayers.secondTeam.length,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstValue: '',
    secondValue: '',
  }); // number

  const inputRef = useRef(null);

  const firstValueSubmit = () => {
    inputRef.current.focus();
    showMessage({
      message: 'Team 1 score has been Updated!',
      type: 'success',
      icon: 'success',
    });
  };

  const handleRefresh = () => {
    setSelectedPlayers({
      firstTeam: [],
      secondTeam: [],
    });
    setInputValue({
      firstValue: '',
      secondValue: '',
    });
  };

  const secondValueSubmit = () => {
    showMessage({
      message: 'Team 2 score has been Updated!',
      type: 'success',
      icon: 'success',
    });
  };

  return (
    <View className="flex-1 bg-[#05080D]">
      {/* <Text
        className="text-[#fff] text-[16px] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Choose Mode
      </Text> */}
      {/* 
            <View className="flex-row justify-between mb-5">
                <LinearGradient
                    colors={["#3f3f46", "#000000E0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="w-[45%] h-[170px] rounded-5 bg-opacity-20 flex justify-center items-center"
                >
                    <LinearGradient
                        colors={["#87d957cb", "#86D957"]}
                        className="w-[90%] p-[6px] rounded-md"
                        start={{ x: 0.2, y: 0.2 }}
                        end={{ x: 0.2, y: 0.2 }}
                    >
                        <Text className="text-[#fff] text-center text-[15px] font-bold leading-normal" style={{ fontFamily: 'Inter-Regular' }}>Doubles</Text>
                    </LinearGradient>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "90%",
                            paddingVertical: 5,
                        }}
                    >
                        {selectedPlayers.firstTeam.length === 0 ? (
                            <TouchableOpacity className="flex-1 mr-2" onPress={() => setModalVisible(true)}>
                                <View
                                    className="rounded p-1 border border-[#86D957]"
                                >
                                    <Text className="text-[#ffffff] text-center text-[14px] leading-normal">Team 1</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                                <View className="items-center">
                                    <Image source={require('../assets/images/saina.png')} className="h-[20px] w-[20px] rounded-full" />
                                    <Text className="text-[8px] text-white">{name.length >= 5 ? `${name.slice(0, 8)}...` : name}</Text>
                                </View>
                                <View className="items-center">
                                    <Image source={require('../assets/images/saina.png')} className="h-[20px] w-[20px] rounded-full" />
                                    <Text className="text-[8px] text-white">{name.length >= 5 ? `${name.slice(0, 8)}...` : name}</Text>
                                </View>
                            </View>
                        )}

                        <TextInput
                            value={inputValue.firstValue}
                            onChangeText={(val) => setInputValue({ ...inputValue, firstValue: val })}
                            onSubmitEditing={firstValueSubmit}
                            keyboardType="numeric"
                            className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "90%",
                            paddingVertical: 5,
                            marginBottom: 20,
                        }}
                    >

                        {selectedPlayers.secondTeam.length === 0 ? (
                            <TouchableOpacity className="flex-1 mr-2" onPress={() => setModalVisible(true)}>
                                <View
                                    className="rounded p-1 border border-[#86D957]"
                                >
                                    <Text className="text-[#ffffff] text-center text-[14px] leading-normal">Team 2</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                                <View className="items-center">
                                    <Image source={require('../assets/images/saina.png')} className="h-[20px] w-[20px] rounded-full" />
                                    <Text className="text-[8px] text-white">{name.length >= 5 ? `${name.slice(0, 8)}...` : name}</Text>
                                </View>
                                <View className="items-center">
                                    <Image source={require('../assets/images/saina.png')} className="h-[20px] w-[20px] rounded-full" />
                                    <Text className="text-[8px] text-white">{name.length >= 5 ? `${name.slice(0, 8)}...` : name}</Text>
                                </View>
                            </View>
                        )}
                        <TextInput
                            ref={inputRef}
                            value={inputValue.secondValue}
                            onSubmitEditing={secondValueSubmit}
                            onChangeText={(val) => setInputValue({ ...inputValue, secondValue: val })}
                            keyboardType="numeric"
                            className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
                        />
                    </View>
                    <View
                        style={[
                            {
                                flexDirection: "row",
                                width: "100%",
                                height: 10,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={handleRefresh}
                            style={[{ height: 30, width: "50%", backgroundColor: '#3f3f46' }]} className="justify-center items-center">
                            <ArrowPathIcon size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                { height: 30, width: "50%", backgroundColor: "#0A871E" },
                            ]}
                            className="justify-center items-center"
                        >
                            <CheckIcon size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View> */}
      {/* buttons */}

      <ActionButton
        style={{paddingHorizontal: 30}}
        title="Leave Room"
        onPress={() => setModal(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text2: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  Text: {
    color: '#7fb95e',
    fontSize: 17,
  },
  Container: {
    width: '45%',
    height: 185,
    backgroundColor: 'rgba(255,255,255,.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: '#4f7240',
    width: '90%',
    height: 40,
    borderRadius: 10,
    marginTop: 5,
  },
  TeamBox: {
    width: '60%',
    height: 30,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  CheckBox: {
    height: 30,
    width: 30,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#86D957',
  },
  NextButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  LoginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LinearGradientButton: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
});

export default HostLivePlayroomChooseModal;
