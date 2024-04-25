import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';
import {
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  teamRunsAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';

const runs = [1, 2, 3, 4, 5, 6, 7];

const DismissalOptions = ['Four', 'Run out'];

const screenWidth = Dimensions.get('window').width;
const maxButtonsPerRow = 4;

const LegByesModal = ({setRunEffectTrigger, setModal, setData}) => {
  const dispatch = useDispatch();
  const buttonWidth = screenWidth / maxButtonsPerRow - 16;
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const getRoomResponse = useSelector(selectRoomScore);
  const user = useSelector(selectRoom);

  const handleRuns = async runs => {
    switch (runs) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        const findStriker2 = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetails2 = null;

        for (const player of findStriker2) {
          if (player.isStriker) {
            strikerDetails2 = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              ballfaced: 1,
            };
            break;
          }
        }
        const wholeTeamScore = {
          roomId: user?.createdRoom?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: runs,
        };

        const bowlerWholeScore1 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
          runsConcided: runs,
        };

        const response = await dispatch(
          updatePlayerScoreAsync({playerData: strikerDetails2}),
        );
        const teamScore = await dispatch(
          teamRunsAsync({teamScore: wholeTeamScore}),
        );

        const bowlerResponse = await dispatch(
          updatePlayerScoreAsync({playerData: bowlerWholeScore1}),
        );

        if (
          response.payload.status &&
          teamScore.payload.status &&
          bowlerResponse.payload.status
        ) {
          setModal(false);
          setRunEffectTrigger(true);
        }
        break;

      default:
        break;
    }
  };

  const handleByes = async dismissalOption => {
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

        const wholeTeamScore23 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: 4,
        };
        const bowlerWholeScore1 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
          runsConcided: 4,
        };

        const playerResponse = await dispatch(
          updatePlayerScoreAsync({playerData: strikerDetails}),
        );
        const wholeTeamScore = await dispatch(
          teamRunsAsync({teamScore: wholeTeamScore23}),
        );

        const bowlerResponse = await dispatch(
          updatePlayerScoreAsync({playerData: bowlerWholeScore1}),
        );

        if (
          playerResponse.payload.status &&
          wholeTeamScore.payload.status &&
          bowlerResponse.payload.status
        ) {
          setModal(false);
          setRunEffectTrigger(true);
        }
        break;
      case 'Run out':
        setData('Run out');
        break;
      default:
        break;
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
          Legs-Byes
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-center">
        {runs.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleRuns(item)}
            className="border border-[#86d957] rounded-full items-center justify-center w-7 h-7 m-3">
            <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {DismissalOptions.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleByes(item)}
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

export default LegByesModal;
