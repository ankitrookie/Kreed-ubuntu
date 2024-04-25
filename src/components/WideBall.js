import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';
import {
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  teamRunsAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';

const runs = ['.WD', 1, 2, 3, 4, 5, 6, 7];

const DismissalOptions = ['Four', 'Stumped', 'Run out', 'Hit Wicket'];

const screenWidth = Dimensions.get('window').width;
const maxButtonsPerRow = 4;

const WideBall = ({setModal, setRunEffectTrigger, setData}) => {
  // increase the team score card of ball ->
  // count the bowler -> ball by one
  const dispatch = useDispatch();
  const buttonWidth = screenWidth / maxButtonsPerRow - 16;
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const getRoomResponse = useSelector(selectRoomScore);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const user = useSelector(selectRoom);

  const handleRuns = async runs => {
    switch (runs) {
      case '.WD':
        console.log('.wd');
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        const wholeTeamScore = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: runs,
        };

        const bowlerWholeScore = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
          runsConcided: 1,
        };

        const bowlerResponse = dispatch(
          updatePlayerScoreAsync({playerData: bowlerWholeScore}),
        );

        const response = await dispatch(
          teamRunsAsync({teamScore: wholeTeamScore}),
        );

        if (response.payload.status && bowlerResponse.payload.status) {
          setModal(false);
          setRunEffectTrigger(true);
        }
        break;
      default:
        break;
    }
  };

  const handleOtherRuns = async dismissalOption => {
    try {
      switch (dismissalOption) {
        case 'Four':
          const findStriker = getRoomResponse?.data[0]?.scores[0]?.cricScore;
          let strikerDetails = null;

          for (const player of findStriker) {
            if (player.isStriker) {
              strikerDetails = {
                playerId: player.playerId,
                gameId: player.gameId,
                teamId: player.teamId,
                userId: player.userId,
                runs: 4,
                ballfaced: 1,
              };
              break;
            }
          }
          const wholeTeamScore = {
            roomId: user?.data?.id,
            gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
            teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
            runs: 4,
          };

          const bowlerWholeScore = {
            roomId: user?.data?.id,
            gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
            teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
            runsConcided: 4,
          };

          const respose = await dispatch(
            updatePlayerScoreAsync({playerData: strikerDetails}),
          );
          const response = await dispatch(
            teamRunsAsync({teamScore: wholeTeamScore}),
          );

          const bowlerResponse = await dispatch(
            updatePlayerScoreAsync({playerData: bowlerWholeScore}),
          );

          if (
            respose.payload.status &&
            response.payload.status &&
            bowlerResponse.payload.status
          ) {
            setModal(false);
            setRunEffectTrigger(true);
          }
          break;
        case 'Byes':
          setData('Byes');
          break;
        case 'Stumped':
          setData('Stumped');
          break;
        case 'Run out':
          setData('Run out');
          break;
        case 'Hit Wicket':
          setData('Hit Wicket');
          break;
        default:
          console.log('Unknown option: ' + dismissalOption);
          break;
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
        floating: true,
      });
    }
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        borderColor: '#A9F77F',
        borderWidth: 1,
      }}>
      <View className="justify-center items-center p-2">
        <Text
          className="text-[18px] text-[#59ff00]"
          style={{fontFamily: 'Poppins-Regular'}}>
          Wide Ball
        </Text>
      </View>

      <View className="flex-row flex-wrap">
        {runs.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleRuns(item)}
            className={`${
              selectedPlayerId === item
                ? 'bg-[#68dd28]'
                : 'border border-[#86d957]'
            } rounded-full items-center justify-center w-7 h-7 m-3`}>
            <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {DismissalOptions.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleOtherRuns(item)}
            className={`border border-[#86d957] rounded-md p-2 m-4`}
            style={{width: buttonWidth}}>
            <Text
              className="text-[12px] text-white text-center"
              style={{fontFamily: 'Inter-Regular'}}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WideBall;

const styles = StyleSheet.create({
  StartGameButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    width: '40%',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  StartGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LinearGradientStartGameButtonButton: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  RunCircle: {
    borderColor: '#86D957',
    borderWidth: 1,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginLeft: 18,
  },
  RunCircleText: {
    color: 'white',
  },
  Button: {
    borderColor: '#86D957',
    borderWidth: 1,
    borderRadius: 10,
    width: 83,
    paddingVertical: 7,
    alignItems: 'center',
    margin: 20,
    marginHorizontal: 10,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});
