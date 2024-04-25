import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';
import {
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  setBowler,
  teamRunsAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';

const runs = [1, 2, 3, 4, 5, 6, 7];

const DismissalOptions = ['Four', 'Byes', 'Stumped', 'Run out', 'Hit Wicket'];

const screenWidth = Dimensions.get('window').width;
const maxButtonsPerRow = 4;

const NoBallModal = ({setModal, setRunEffectTrigger, setData}) => {
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
      case 3:
        const findStrikerOnOne = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetailsOnOne = null;
        let strickerDetails = null;

        for (const player of findStrikerOnOne) {
          if (!player.isOut && player.isStriker) {
            strikerDetailsOnOne = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              isStriker: false,
            };
            break;
          }
        }

        for (const player2 of findStrikerOnOne) {
          if (!player2.isOut && !player2.isStriker) {
            strickerDetails = {
              playerId: player2.playerId,
              gameId: player2.gameId,
              teamId: player2.teamId,
              userId: player2.userId,
              isStriker: true,
            };
            break;
          }
        }

        const wholeTeamScore1 = {
          roomId: user?.data?.id,
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

        const response1 = dispatch(
          updatePlayerScoreAsync({playerData: strikerDetailsOnOne}),
        );
        const response2 = dispatch(
          updatePlayerScoreAsync({playerData: strickerDetails}),
        );
        const response3 = dispatch(teamRunsAsync({teamScore: wholeTeamScore1}));

        const response4 = await dispatch(
          updatePlayerScoreAsync({playerData: bowlerWholeScore1}),
        );

        if (
          response1.payload.status &&
          response2.payload.status &&
          response3.payload.status &&
          response4.payload.status
        ) {
          setModal(false);
          setRunEffectTrigger(true);
        }
        break;
      case 2:
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
          runsConcided: runs,
        };

        const response = await dispatch(
          teamRunsAsync({teamScore: wholeTeamScore}),
        );
        const bowlerResponse = await dispatch(
          updatePlayerScoreAsync({playerData: bowlerWholeScore}),
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
          No-Ball
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
            onPress={() => handleOtherRuns(item)}
            key={item}
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

export default NoBallModal;
