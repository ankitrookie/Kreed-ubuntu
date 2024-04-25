import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { selectRoomScore } from './Badminton/badmintionSlice';
import {
    selectSelectedSingleBowler,
    selectSelectedStrAndNonStr,
    teamRunsAsync,
    updatePlayerScoreAsync
} from './Cricket/cricketSlice';

const runs = [1, 2, 3, 4];

const DismissalOptions = ['Four', 'Run out'];

const screenWidth = Dimensions.get('window').width;
const maxButtonsPerRow = 4;

const OverThrowModal = ({setModal, setData, setRunEffectTrigger}) => {
  const dispatch = useDispatch();
  const buttonWidth = screenWidth / maxButtonsPerRow - 16;
  const getRoomResponse = useSelector(selectRoomScore);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const user = useSelector(selectRoom);

  const handleOverThrow = async item => {
    switch (item) {
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

        const wholeTeamScore = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: item,
        };

        const response1 = await dispatch(
          updatePlayerScoreAsync({playerData: strikerDetailsOnOne}),
        );
        const response2 = await dispatch(
          updatePlayerScoreAsync({playerData: strickerDetails}),
        );
        const response3 = await dispatch(teamRunsAsync({teamScore: wholeTeamScore}));

        if (
          response1.payload.status &&
          response2.payload.status &&
          response3.payload.status
        ) {
          setRunEffectTrigger(true);
          setModal(false);
        }
        break;
      case 2:
      case 4:
        const wholeTeamScore2 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: item,
        };

        const response4 = await dispatch(teamRunsAsync({teamScore: wholeTeamScore2}));
        if (response4.payload.status) {
          setRunEffectTrigger(true);
          setModal(false);
        }
        break;
      default:
        break;
    }
    console.log(item);
    // const newSelectedUserData = [...selectedUserData];

    // const playerData = {
    //     playerId: newSelectedUserData[0]?.playerId,
    //     gameId: newSelectedUserData[0]?.gameId,
    //     teamId: newSelectedUserData[0]?.teamId,
    //     userId: newSelectedUserData[0]?.userId,
    //     runs: item,
    //     ballfaced: 1
    // };

    // // Switch positions if the runs are odd
    // if (item % 2 !== 0) {
    //     // Use a temporary variable to swap positions
    //     const temp = newSelectedUserData[0];
    //     newSelectedUserData[0] = newSelectedUserData[1];
    //     newSelectedUserData[1] = temp;
    // };

    // const bowlerUserData = {
    //     playerId: selectedBowler[0]?.playerData,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     userId: selectedBowler[0]?.userId,
    //     extraRuns: item
    // };

    // const wholeTeamScore = {
    //     roomId: user?.createdRoom?.id,
    //     gameId: newSelectedUserData[0]?.gameId,
    //     teamId: newSelectedUserData[0]?.teamId,
    //     runs: item
    // };

    // try {
    //     const response = await dispatch(updatePlayerScoreAsync({ playerData: playerData }));
    //     const bowlerResponse = await dispatch(updatePlayerScoreAsync({ playerData: bowlerUserData }));
    //     await dispatch(teamRunsAsync({ teamScore: wholeTeamScore }));
    //     if (response.payload && !response.payload.error) {
    //         showMessage({
    //             message: 'Run Update Successful!',
    //             type: 'success',
    //             floating: true
    //         });
    //         dispatch(setSelectedStrAndNonStr(response.payload, newSelectedUserData));
    //         dispatch(setBowler(bowlerResponse.payload));
    //         setSelectedPlayerId(item)
    //         setModal(false);
    //     } else if (response.payload && response.payload.error) {
    //         showMessage({
    //             message: 'Run Update Failed! Try Again!',
    //             type: 'danger',
    //             floating: true
    //         })
    //     }
    // } catch (error) {
    //     showMessage({
    //         message: 'Something went wrong! Try Again!',
    //         type: 'danger',
    //         floating: true
    //     })
    // }
  };

  const handleFourAndRunOut = async options => {
    switch (options) {
      case 'Four':
        const wholeTeamScore = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: 4,
        };

        const response4 = await dispatch(teamRunsAsync({teamScore: wholeTeamScore}));
        if (response4.payload.status) {
          setRunEffectTrigger(true);
          setModal(false);
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
          Over Throw
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {runs.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleOverThrow(item)}
            className={`${
              selectedPlayerId === item
                ? 'bg-[#68dd28]'
                : 'border border-[#86d957]'
            } rounded-full items-center justify-center w-10 h-10 m-3`}>
            <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {DismissalOptions.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => handleFourAndRunOut(item)}
            className={`${
              selectedPlayerId === item
                ? 'bg-[#68dd28]'
                : 'border border-[#86d957]'
            } rounded-md p-2 m-4`}
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

export default OverThrowModal;