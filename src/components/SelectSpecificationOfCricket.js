import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RoomHeader, SelectBatsMan, SelectBowler} from '.';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {ActionButton} from '../ui';
import {
  selectCricketGame,
  selectTossLoading,
  setBattingTeamData,
  setBowlingTeamData,
  teamTossAsync,
} from './Cricket/cricketSlice';
import {useNavigation} from '@react-navigation/native';

const SelectSpecificationOfCricket = () => {
  const navigation = useNavigation();
  const [modalType, setModalType] = useState('batsman');
  const loading = useSelector(selectTossLoading);
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const team = useSelector(selectCricketGame); // both team team 1 and team 2
  console.log('team data', team);

  const firstTeamId = team?.data?.teams[0];
  const secondTeamId = team?.data?.teams[1];
  const [wonBy, setWonBy] = useState([]);

  const [modal, setModal] = useState(false);

  const overCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [chooseTo, setChooseTo] = useState('');
  const [selectedBallType, setSelectedBallType] = useState('');

  const handlePlay = async () => {
    if (wonBy.length === 0 || chooseTo === '' || selectedBallType === '') {
      showMessage({
        message: 'Please select toss winner and choose toss decision!',
        type: 'info',
        floating: true,
      });
      return;
    }
    const gameId = team?.data?.id;
    const tossData = {
      gameType: selectedBallType,
      toss: wonBy.id,
      decision: chooseTo,
      overs: 20,
    };
    try {
      const response = await dispatch(
        teamTossAsync({gameId: gameId, tossWin: tossData}),
      );
      console.log('response from toss team', response);

      if (response.payload.status) {
        showMessage({
          message: 'Toss Successfully!',
          type: 'success',
          floating: true,
        });
        setModal(true);

        // if team 1 one the toss
        const team1WinsToss = response.payload.data?.Toss === firstTeamId?.id;

        // if(team1 == toss){
        //   if(If chosen batting){
        //    show batting screen
        //    Innings1 = team1id;
        //   } else if(If chosen bowling){
        //    show bowling screen
        //    Innings1= team2id;
        //  }

        //  }else if(team2 == toss){

        //  if(If chosen batting){
        //    show bowling screen
        //    Innings1= team2id;
        //   } else if(If chosen bowling){
        //    show batting screen
        //    Innings1= team1id;
        //  }
        //  }

        // if (team1WinsToss) {
        //   if (chooseTo === 'Bat') {
        //     // Team 1 wins the toss and chooses to bat
        //     dispatch(setBattingTeamData(wonBy));
        //     setModalType('batsman');
        //     // Show batting screen and scoreboard for recording scores
        //   } else {
        //     // Team 1 wins the toss and chooses to bowl
        //     // dispatch(setBowlingTeamData(wonBy));
        //     navigation.navigate('ScoreBoarding')
        //     // Show scoreboard only for viewing scores
        //   }
        // } else {
        //   if (wonBy === secondTeamId?.id && chooseTo === 'Bat') {
        //     // Team 2 wins the toss and chooses to bat
        //     dispatch(setBattingTeamData(wonBy));
        //     setModalType('batsman');
        //     // Show batting screen and scoreboard for recording scores
        //   } else {
        //     // Team 2 wins the toss or Team 1 wins and chooses to bowl
        //     dispatch(setBowlingTeamData(wonBy));
        //     setModalType('batsman');
        //     // Show batting UI for the host of Team 1 to record the score and select the batsman
        //   }
        // }

        // if (team1WinsToss) {
        //   if (chooseTo === 'Bat') {
        //     dispatch(setBattingTeamData(wonBy));
        //     setModalType('batsman');
        //   } else {
        //     dispatch(setBowlingTeamData(wonBy));
        //     setModalType('bowler');
        //   }
        // } else {
        //   // If team 2 wins the toss, reverse the logic
        //   if (chooseTo === 'Bat') {
        //     dispatch(setBowlingTeamData(wonBy));
        //     setModalType('bowler');
        //   } else {
        //     dispatch(setBattingTeamData(wonBy));
        //     setModalType('batsman');
        //   }
        // }

        if (team1WinsToss) {
          if (chooseTo === 'Bat') {
            dispatch(setBattingTeamData(wonBy));
            dispatch(
              setBowlingTeamData(
                wonBy === firstTeamId ? secondTeamId : firstTeamId,
              ),
            );
            setModalType('batsman');
          } else {
            dispatch(setBowlingTeamData(wonBy));
            // setModalType('bowler');
            navigation.navigate('ScoreBoarding');
          }
        } else {
          // If team 2 wins the toss, reverse the logic
          if (chooseTo === 'Bat') {
            dispatch(setBattingTeamData(wonBy));
            dispatch(
              setBowlingTeamData(
                wonBy === firstTeamId ? secondTeamId : firstTeamId,
              ),
            );
            // setModalType('bowler');
            setModalType('batsman');
          } else {
            dispatch(setBowlingTeamData(wonBy));
            // setModalType('batsman');
            navigation.navigate('ScoreBoarding');
          }
        }
      } else {
        showMessage({
          message: 'Toss Failed! Try Again!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Something Went wrong!',
        type: 'danger',
        floating: true,
      });
    }
  };

  
  return (
    <View className="flex-1 bg-[#05080D] p-4">
      {/* Navbar */}
      <RoomHeader route={user.data.roomname} showConfirmation={true} />

      {/* TODO: still need to be done */}
      <View className="flex-row items-center mt-8">
        <View>
          <Text
            className="text-[16px] text-[#fff]"
            style={{fontFamily: 'Inter-Regular'}}>
            Choose No. of Overs :
          </Text>
        </View>
        <ScrollView style={{height: 60}}>
          {overCount.map((item, index) => {
            return (
              <View key={index} className="p-1">
                <Text className="text-white text-center">{item}</Text>
                <View className="bg-[#86d957] h-[1px]"></View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View className="mt-5">
        <Text
          className="text-[16px] text-[#fff]"
          style={{fontFamily: 'Inter-Regular'}}>
          Choose Ball Type :
        </Text>
      </View>
      <View className="flex-row mt-5">
        <View className="w-[50%] border border-[#86d957]">
          <View className="items-center bg-[#86d957] p-2">
            <Text
              className="text-[12px] font-medium leading-normal text-[#000]"
              style={{fontFamily: 'Inter-Regular'}}>
              Tennis Ball
            </Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center space-x-4">
            <FontAwesome name="sports-baseball" color="#9bbe3c" size={25} />
            <TouchableOpacity
              style={[
                styles.genderOption,
                selectedBallType === 'Tennis Ball' && styles.selectedOption,
              ]}
              onPress={() => setSelectedBallType('Tennis Ball')}>
              <Text
                style={[
                  styles.optionText,
                  selectedBallType === 'Tennis Ball' && styles.selectedText,
                ]}></Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Container for choosing ball */}
        <View className="w-[50%] border border-[#86d957]">
          <View className="items-center bg-[#86d957] p-2">
            <Text
              className="text-[12px] font-medium leading-normal text-[#000]"
              style={{fontFamily: 'Inter-Regular'}}>
              Cricket Ball
            </Text>
          </View>

          <View className="flex-row items-center justify-center space-x-4 p-2">
            <View className="flex-row items-center">
              <FontAwesome name="sports-baseball" color="#C63C42" size={25} />
              <FontAwesome name="sports-baseball" color="white" size={25} />
            </View>
            <TouchableOpacity
              style={[
                styles.genderOption,
                selectedBallType === 'Cricket Ball' && styles.selectedOption,
              ]}
              onPress={() => setSelectedBallType('Cricket Ball')}>
              <Text
                style={[
                  styles.optionText,
                  selectedBallType === 'Cricket Ball' && styles.selectedText,
                ]}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Container for choosing toss result */}
      <View className="mt-5">
        <Text
          className="text-[16px] text-[#fff]"
          style={{fontFamily: 'Inter-Regular'}}>
          Toss :
        </Text>
      </View>

      <LinearGradient
        colors={['#3b6125', '#20341D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        className="rounded-2xl p-4 mt-5">
        <View className="flex-row justify-between">
          <View className="space-y-6 items-center">
            <Text
              className="text-[15px] text-[#fff] font-medium"
              style={{fontFamily: 'Inter-Regular'}}>
              Won by :
            </Text>
            <TouchableOpacity
              className={`border border-[#86d957] ${
                wonBy === firstTeamId && 'bg-[#86d957]'
              } p-1 w-[105px] ${wonBy === firstTeamId ? 'selected' : ''}`}
              onPress={() => setWonBy(firstTeamId)}>
              <Text
                className={`text-[14px] font-medium text-center text-[#fff]`}
                style={{fontFamily: 'Inter-Regular'}}>
                Team 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border border-[#86d957] py-1 w-[105px] ${
                wonBy === secondTeamId && 'bg-[#86d957]'
              } ${wonBy === secondTeamId ? 'selected' : ''}`}
              onPress={() => setWonBy(secondTeamId)}>
              <Text
                className={`text-[14px] font-medium text-center text-[#fff]`}>
                Team 2
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-6 items-center">
            <Text
              className="text-[15px] text-[#fff] font-medium"
              style={{fontFamily: 'Inter-Regular'}}>
              Choose to :
            </Text>
            <TouchableOpacity
              className={`border border-[#86d957] py-1 w-[105px] ${
                chooseTo === 'Bat' && 'bg-[#86d957]'
              } ${chooseTo === 'Bat' ? 'selected' : ''}`}
              onPress={() => setChooseTo('Bat')}>
              <Text
                className={`text-[14px] font-medium text-center text-[#fff]`}
                style={{fontFamily: 'Inter-Regular'}}>
                Bat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border border-[#86d957] py-1 w-[105px] ${
                chooseTo === 'Bowl' && 'bg-[#86d957]'
              }  ${chooseTo === 'Bowl' ? 'selected' : ''}`}
              onPress={() => setChooseTo('Bowl')}>
              <Text
                className={`text-[14px] font-medium text-center text-[#fff] }`}
                style={{fontFamily: 'Inter-Regular'}}>
                Bowl
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ActionButton
        style={{paddingHorizontal: 20}}
        loading={loading}
        title="Play"
        onPress={handlePlay}
      />

      <Modal animationType="slide" transparent={true} visible={modal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModal(false),
              setWonBy([]),
              setChooseTo(''),
              setSelectedBallType('');
          }}>
          <View className="flex-1 bg-[#00000017]"></View>
        </TouchableWithoutFeedback>
        {modalType === 'batsman' ? (
          <SelectBatsMan setModalType={setModalType} />
        ) : (
          <SelectBowler />
        )}
      </Modal>
    </View>
  );
};

export default SelectSpecificationOfCricket;

const styles = StyleSheet.create({
  genderOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    margin: 2,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  selectedOption: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  optionText: {
    color: 'black',
  },
  selectedOption: {
    backgroundColor: '#86d957',
    borderColor: '#fff',
    borderWidth: 2,
  },
  selectedText: {
    color: 'white',
  },
  Text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 18,
    margin: 20,
  },
  BallTableHeading: {
    backgroundColor: '#86D957',
    alignItems: 'center',
    padding: 8,
  },
  BallTableHeadingText: {
    fontSize: 15,
    color: 'black',
  },
  BallTableHeadingColumn: {
    width: '50%',
    borderColor: '#86D957',
    borderWidth: 2,
  },
  TossText: {
    color: 'white',
    fontSize: 15,
  },
  TossButtonBox: {
    borderColor: '#86D957',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 100,
    alignItems: 'center',
    margin: 5,
  },
  TossColumn: {
    width: '50%',
    alignItems: 'center',
  },
  StartGameButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 'auto',
  },
  StartGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
