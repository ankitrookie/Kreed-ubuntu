import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  ArrowPathIcon,
  CheckIcon,
  InformationCircleIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import SelectPlayerForDoubleBadminton from './Badminton/SelectPlayerForDoubleBadminton';
import SelectPlayerForSinglesBadminton from './Badminton/SelectPlayerForSinglesBadminton';
import {
  doubleTeamScoreAsync,
  endRoomAsync,
  selectDoubleGame,
  selectEndRoomLoading,
  selectScoreUpdateLoading,
  selectSingleGame,
  selectSingleScoreLoading,
  singleTeamScoreAsync,
} from './Badminton/badmintionSlice';
import themes from '../themes';

const HostLivePlayroomChooseModal3 = ({setmodal}) => {
  const navigation = useNavigation();
  const loadingDouble = useSelector(selectScoreUpdateLoading);
  const loadingSingle = useSelector(selectSingleScoreLoading);
  const loadingEndRoom = useSelector(selectEndRoomLoading);
  const user = useSelector(selectRoom);

  const dispatch = useDispatch();
  const [selectedPlayers, setSelectedPlayers] = useState({
    firstTeam: [],
    secondTeam: [],
  }); // team member
  const [selectedPlayers2, setSelectedPlayers2] = useState({
    firstTeam: [],
    secondTeam: [],
  });
  const [doubleModalVisible, setDoubleModalVisible] = useState(false);
  const [singleModalVisible, setSingleModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstValue: '',
    secondValue: '',
  }); // score
  const [inputValue2, setInputValue2] = useState({
    firstValue: '',
    secondValue: '',
  });
  const doubleData = useSelector(selectDoubleGame);
  console.log('double game data', doubleData?.data?.teams);
  const singleData = useSelector(selectSingleGame);

  const inputRef = useRef(null);
  const singleInputRef = useRef(null);

  const firstValueSubmit = () => {
    inputRef.current.focus();
  };

  const singleValueSubmit = () => {
    singleInputRef.current.focus();
  };

  const handleRefreshDouble = () => {
    setSelectedPlayers({
      firstTeam: [],
      secondTeam: [],
    });
    setInputValue({
      firstValue: '',
      secondValue: '',
    });
  };

  const handleRefreshSingle = () => {
    setSelectedPlayers2({
      firstTeam: [],
      secondTeam: [],
    });
    setInputValue2({
      firstValue: '',
      secondValue: '',
    });
  };

  // double game score updation
  const handleSave = async () => {
    const gameId = doubleData?.data?.teams[0]?.gameId;
    const teamId1 = doubleData?.data?.teams[0]?.players?.map(
      players => players?.teamId,
    );
    const teamId2 = doubleData?.data?.teams[1]?.players?.map(
      players => players?.teamId,
    );
    const score = {
      round: 1,
      scores: [
        {
          teamId: teamId1[0],
          score: Number(inputValue.firstValue),
        },
        {
          teamId: teamId2[1],
          score: Number(inputValue.secondValue),
        },
      ],
    };

    try {
      const response = await dispatch(doubleTeamScoreAsync({gameId, score}));
      if (response.payload.status) {
        showMessage({
          message: 'Score has been updated!',
          type: 'success',
          floating: true,
        });
        setSelectedPlayers({
          firstTeam: [],
          secondTeam: [],
        });
        setInputValue({
          firstValue: '',
          secondValue: '',
        });
      } else {
        showMessage({
          message: 'Something went wrong. Try Again!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
        floating: true,
      });
    }
  };

  // single game score updation
  const handleSave2 = async () => {
    const gameId = singleData?.data?.teams[0].gameId;
    const team = singleData?.data?.teams?.map(players => players?.players);
    const userIds = singleData?.data?.teams.flatMap(players =>
      players.players.map(player => player.userId),
    );
    const [firstUserId, secondUserId] = userIds;
    const score = {
      round: 1,
      scores: [
        {
          teamId: team[0][0].teamId,
          scores: {
            [firstUserId]: Number(inputValue2.firstValue),
          },
        },
        {
          teamId: team[1][0].teamId,
          scores: {
            [secondUserId]: Number(inputValue2.secondValue),
          },
        },
      ],
    };

    try {
      const response = await dispatch(singleTeamScoreAsync({gameId, score}));
      if (response.payload.status) {
        showMessage({
          message: 'Score has been updated!',
          type: 'success',
          floating: true,
        });
        setSelectedPlayers2({
          firstTeam: [],
          secondTeam: [],
        });
        setInputValue2({
          firstValue: '',
          secondValue: '',
        });
      } else {
        showMessage({
          message: 'Something went wrong. Try Again!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
        floating: true,
      });
    }
  };

  const handleEndRoom = async () => {
    const response = await dispatch(endRoomAsync({roomId: user?.data?.id}));

    if (response.payload.status) {
      showMessage({
        message: 'Room has been ended!',
        type: 'success',
        floating: true,
      });
      navigation.navigate('PublishReview');
    }
  };

  return (
    <ScrollView className="flex-1">
      <Text
        className="text-[#fff] text-[16px] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Choose Mode
      </Text>

      {/* score board */}
      <View className="flex-row justify-between mb-5">
        {/* double room  */}
        <LinearGradient
          colors={['#3f3f46', '#000000E0']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          className="w-[45%] h-[170px] rounded-5 bg-opacity-20 flex justify-center items-center">
          <LinearGradient
            colors={['#87d957cb', '#86D957']}
            className="w-[90%] p-[6px] rounded-md"
            start={{x: 0.2, y: 0.2}}
            end={{x: 0.2, y: 0.2}}>
            <Text
              className="text-[#fff] text-center text-[15px] font-bold leading-normal"
              style={{fontFamily: 'Inter-Regular'}}>
              Doubles
            </Text>
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              paddingVertical: 5,
            }}>
            {selectedPlayers.firstTeam.length === 0 ? (
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() => setDoubleModalVisible(true)}>
                <View className="rounded p-1 border border-[#86D957]">
                  <Text className="text-[#ffffff] text-center text-[14px] leading-normal">
                    Team 1
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers.firstTeam[0].length >= 5
                      ? `${selectedPlayers.firstTeam[0].slice(0, 8)}...`
                      : selectedPlayers.firstTeam[0]}
                  </Text>
                </View>
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers.firstTeam[1].length >= 5
                      ? `${selectedPlayers.firstTeam[1].slice(0, 8)}...`
                      : selectedPlayers.firstTeam[1]}
                  </Text>
                </View>
              </View>
            )}

            <TextInput
              value={inputValue.firstValue}
              onChangeText={val => {
                const numericValue = Number(val);

                if (
                  !isNaN(numericValue) &&
                  numericValue >= 0 &&
                  numericValue <= 25
                ) {
                  setInputValue({...inputValue, firstValue: val});
                } else {
                  showMessage({
                    message: 'Please enter a number between 0 and 22',
                    type: 'danger',
                    floating: true,
                  });
                }
              }}
              onSubmitEditing={firstValueSubmit}
              keyboardType="numeric"
              className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              paddingVertical: 5,
              marginBottom: 20,
            }}>
            {selectedPlayers.secondTeam.length === 0 ? (
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() => setModalVisible(true)}>
                <View className="rounded p-1 border border-[#86D957]">
                  <Text className="text-[#ffffff] text-center text-[14px] leading-normal">
                    Team 2
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers.secondTeam[0].length >= 5
                      ? `${selectedPlayers.secondTeam[0].slice(0, 8)}...`
                      : selectedPlayers.secondTeam[0]}
                  </Text>
                </View>
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers.secondTeam[1].length >= 5
                      ? `${selectedPlayers.secondTeam[1].slice(0, 8)}...`
                      : selectedPlayers.secondTeam[1]}
                  </Text>
                </View>
              </View>
            )}
            <TextInput
              ref={inputRef}
              value={inputValue.secondValue}
              onSubmitEditing={firstValueSubmit}
              onChangeText={val => {
                const numericValue = Number(val);

                if (
                  !isNaN(numericValue) &&
                  numericValue >= 0 &&
                  numericValue <= 25
                ) {
                  setInputValue({...inputValue, secondValue: val});
                } else {
                  showMessage({
                    message: 'Please enter a number between 0 and 22',
                    type: 'danger',
                    floating: true,
                  });
                }
              }}
              keyboardType="numeric"
              className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
            />
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                width: '100%',
                height: 10,
              },
            ]}>
            <TouchableOpacity
              onPress={handleRefreshDouble}
              style={[
                {height: 30, width: '50%', backgroundColor: '#3f3f46'},
                styles.centercontainer,
              ]}>
              <ArrowPathIcon size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              style={[
                {height: 30, width: '50%', backgroundColor: '#0A871E'},
                styles.centercontainer,
              ]}>
              {loadingDouble ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CheckIcon size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Single room */}
        <LinearGradient
          colors={['#3f3f46', '#000000E0']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          className="w-[45%] h-[170px] rounded-5 bg-opacity-20 flex justify-center items-center">
          <LinearGradient
            colors={['#87d957cb', '#86D957']}
            className="w-[90%] p-[6px] rounded-md"
            start={{x: 0.2, y: 0.2}}
            end={{x: 0.2, y: 0.2}}>
            <Text
              className="text-[#fff] text-center text-[15px] font-bold leading-normal"
              style={{fontFamily: 'Inter-Regular'}}>
              Singles
            </Text>
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              paddingVertical: 5,
            }}>
            {selectedPlayers2.firstTeam.length === 0 ? (
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() => setSingleModalVisible(true)}>
                <View className="rounded p-1 border border-[#86D957]">
                  <Text className="text-[#ffffff] text-center text-[14px] leading-normal">
                    Player 1
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers2.firstTeam[0].length >= 5
                      ? `${selectedPlayers2.firstTeam[0].slice(0, 8)}...`
                      : selectedPlayers2.firstTeam[0]}
                  </Text>
                </View>
              </View>
            )}

            <TextInput
              value={inputValue2.firstValue}
              onChangeText={val => {
                const numericValue = Number(val);

                // Check if the input is within the valid range (0 to 22)
                if (
                  !isNaN(numericValue) &&
                  numericValue >= 0 &&
                  numericValue <= 25
                ) {
                  setInputValue2({...inputValue2, firstValue: val});
                } else {
                  showMessage({
                    message: 'Please enter a number between 0 and 22',
                    type: 'danger',
                    floating: true,
                  });
                }
              }}
              onSubmitEditing={singleValueSubmit}
              keyboardType="numeric"
              className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              paddingVertical: 5,
              marginBottom: 20,
            }}>
            {selectedPlayers2.secondTeam.length === 0 ? (
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() => setSingleModalVisible(true)}>
                <View className="rounded p-1 border border-[#86D957]">
                  <Text className="text-[#ffffff] text-center text-[14px] leading-normal">
                    Player 2
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View className="bg-[#fff4f411] flex-1 flex-row justify-evenly mr-2 p-[2px] rounded-lg">
                <View className="items-center">
                  <Image
                    source={require('../assets/images/saina.png')}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <Text className="text-[8px] text-white">
                    {selectedPlayers2.secondTeam[0].length >= 5
                      ? `${selectedPlayers2.secondTeam[0].slice(0, 8)}...`
                      : selectedPlayers2.secondTeam[0]}
                  </Text>
                </View>
              </View>
            )}
            <TextInput
              ref={singleInputRef}
              value={inputValue2.secondValue}
              onSubmitEditing={singleValueSubmit}
              onChangeText={val => {
                const numericValue = Number(val);

                // Check if the input is within the valid range (0 to 22)
                if (
                  !isNaN(numericValue) &&
                  numericValue >= 0 &&
                  numericValue <= 25
                ) {
                  setInputValue2({...inputValue2, secondValue: val});
                } else {
                  showMessage({
                    message: 'Please enter a number between 0 and 22',
                    type: 'danger',
                    floating: true,
                  });
                }
              }}
              keyboardType="numeric"
              className="border-[0.7px] border-[#86d957] text-[16px] text-white py-[1px] rounded-md"
            />
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                width: '100%',
                height: 10,
              },
            ]}>
            <TouchableOpacity
              onPress={handleRefreshSingle}
              style={[
                {height: 30, width: '50%', backgroundColor: '#3f3f46'},
                styles.centercontainer,
              ]}>
              <ArrowPathIcon size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave2}
              style={[
                {height: 30, width: '50%', backgroundColor: '#0A871E'},
                styles.centercontainer,
              ]}>
              {loadingSingle ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CheckIcon size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between p-4">
        <TouchableOpacity onPress={() => setmodal(true)}>
          <LinearGradient
            colors={[themes.buttonStart, '#1B2616']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              paddingHorizontal: 35,
              paddingVertical: 15,
              justifyContent: 'center',
              borderRadius: 16,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: themes.lightText,
                fontSize: 15,
              }}>
              Leave Room
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEndRoom}>
          <LinearGradient
            colors={[themes.buttonStart, '#1B2616']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              paddingHorizontal: 35,
              paddingVertical: 15,
              justifyContent: 'center',
              borderRadius: 16,
            }}>
            {loadingEndRoom ? (
              <ActivityIndicator color="#fff" size={20} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  color: themes.lightText,
                  fontSize: 15,
                }}>
                End Room
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Double */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={doubleModalVisible}>
        <TouchableWithoutFeedback onPress={() => setDoubleModalVisible(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,.3)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        <SelectPlayerForDoubleBadminton
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          setModalVisible={setDoubleModalVisible}
        />
      </Modal>

      {/* Singles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={singleModalVisible}>
        <TouchableWithoutFeedback onPress={() => setSingleModalVisible(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,.3)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        <SelectPlayerForSinglesBadminton
          selectedPlayers2={selectedPlayers2}
          setSelectedPlayers2={setSelectedPlayers2}
          setModalVisible={setSingleModalVisible}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text2: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    color: '#7fb95e',
    fontSize: 17,
  },
  contaienr: {
    width: '44%',
    height: 170,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#4f7240',
    width: '90%',
    height: 40,
    borderRadius: 10,
    marginTop: 5,
  },
  teambox: {
    width: '60%',
    height: 30,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkbox: {
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

export default HostLivePlayroomChooseModal3;
