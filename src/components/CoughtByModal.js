import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  selectBatsManAsync,
  selectBatsManLoading,
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  selectTossWin,
  selectedBattingTeamData,
  selectedBowlingTeamData,
  setBowler,
  setSelectedStrAndNonStr,
  teamScoresBowlerAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';
import {showMessage} from 'react-native-flash-message';
import {useState} from 'react';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';

const CoughtByModal = ({setModal}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const teamData = useSelector(selectedBowlingTeamData);
  const battersTeamData = useSelector(selectedBattingTeamData);
  const loadingPlayerId = useSelector(selectBatsManLoading);
  const getRoomResponse = useSelector(selectRoomScore);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const tossWin = useSelector(selectTossWin);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [status, setStatus] = useState(false);

  const chooseCatcher = async player => {
    const catcherData = {
      playerId: player?.id,
      gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
      teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
      userId: player?.userId,
      catches: 1,
    };

    console.log('user Id', catcherData);
    const response = await dispatch(
      updatePlayerScoreAsync({playerData: catcherData}),
    );
    if (response.payload.status) {
      setStatus(true);
    }
    // try {
    //     const response = await dispatch(updatePlayerScoreAsync({ playerData: catcherData }));
    //     if (response.payload && response.payload.error) {
    //         showMessage({
    //             message: response.payload.error,
    //             type: 'danger',
    //             floating: true
    //         })
    //     } else if (response.payload && !response.payload.error) {
    //         showMessage({
    //             message: 'Catcher Updated Successfully!',
    //             type: 'success',
    //             floating: true
    //         });
    //         setStatus(true);
    //     } else {
    //         showMessage({
    //             message: 'Catcher Update Failed! Try Again!',
    //             type: 'danger',
    //             floating: true
    //         })
    //     }
    // } catch (error) {
    //     showMessage({
    //         message: 'Something went wrong!',
    //         type: 'danger',
    //         floating: true
    //     })
    // }
  };

  const chooseBatsMan = async player => {
    if (loadingPlayerId) {
      return;
    }

    const caughtPlayerData = getRoomResponse?.data[0]?.scores[0]?.cricScore;
    let currentStricker = null;

    for (const player of caughtPlayerData) {
      if (player.isStriker) {
        currentStricker = {
          playerId: player.playerId,
          gameId: player.gameId,
          teamId: player.teamId,
          userId: player.userId,
          isStriker: false,
          isOut: true,
          wicketfall: 'caught',
        };
        break;
      }
    }

    const playerData = {
        playerId: player?.id,
        gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
        teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
        userId: player?.userId,
        isStriker: true,
    };

    const wholeTeamScore = {
        roomId: user?.data?.id,
        gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[0]?.gameId,
        teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[0]?.teamId,
        wickets: 1,
    };

    const bowlerWholeScore = {
        roomId: user?.data?.id,
        gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
        teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
        totalWicket: 1,
        runsConcided: 0
    };

   const response1 = await dispatch(selectBatsManAsync({ playerData: playerData }));
   const response2 = await dispatch(updatePlayerScoreAsync({ playerData: currentStricker }));
   const response3 = await dispatch(teamScoresBowlerAsync({ teamScore: wholeTeamScore }));
   const response4 = await dispatch(updatePlayerScoreAsync({ playerData: bowlerWholeScore }));

    if (
      response1.payload.status &&
      response2.payload.status &&
      response3.payload.status &&
      response4.payload.status
    ) {
      setModal(false);
      setRunEffectTrigger(true);
    }

    // const caughtPlayerData = {
    //   playerId: selectedUserData[0]?.playerId,
    //   gameId: selectedUserData[0]?.gameId,
    //   teamId: selectedUserData[0]?.teamId,
    //   userId: selectedUserData[0]?.userId,
    //   isOut: true,
    //   wicketfall: 'caught',
    // };

    // const playerData = {
    //   playerId: player?.id,
    //   gameId: tossWin?.game?.id,
    //   teamId: player?.teamId,
    //   userId: player?.userId,
    // };


    // const wholeTeamBowlerScore = {
    //   roomId: user?.createdRoom?.id,
    //   gameId: selectedBowler[0]?.gameId,
    //   teamId: selectedBowler[0]?.teamId,
    //   wickets: 1,
    // };

    // const bowlerUserData = {
    //   playerId: selectedBowler[0]?.playerData,
    //   gameId: selectedBowler[0]?.gameId,
    //   teamId: selectedBowler[0]?.teamId,
    //   userId: selectedBowler[0]?.userId,
    //   runsConcided: 0,
    // };

    // try {
    //   const response = await dispatch(
    //     selectBatsManAsync({playerData: playerData}),
    //   );
    //   const caughtResponse = await dispatch(
    //     updatePlayerScoreAsync({playerData: caughtPlayerData}),
    //   );
    //   const bowlerResponse = await dispatch(
    //     updatePlayerScoreAsync({playerData: bowlerUserData}),
    //   );
    //   if (response.payload && !response.payload.error) {
    //     showMessage({
    //       message: 'New batter updated successfully!',
    //       type: 'success',
    //       floating: true,
    //     });
    //     await dispatch(
    //       teamScoresBowlerAsync({teamScore: wholeTeamBowlerScore}),
    //     );
    //     dispatch(setSelectedStrAndNonStr(response.payload));
    //     dispatch(setSelectedStrAndNonStr(caughtResponse.payload));
    //     dispatch(setBowler(bowlerResponse.payload));
    //     setStatus(false);
    //     setModal(false);
    //   } else if (response.payload && response.payload.error) {
    //     showMessage({
    //       message: "Select new player! Don't choose existing Player!",
    //       type: 'info',
    //       floating: true,
    //     });
    //     setSelectedPlayerId(player.id);
    //   } else {
    //     showMessage({
    //       message: 'Something went wrong! Try Again!',
    //       type: 'danger',
    //       floating: true,
    //     });
    //   }
    // } catch (error) {
    //   showMessage({
    //     message: 'Something went wrong!',
    //     type: 'danger',
    //     floating: true,
    //   });
    // }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => chooseCatcher(item)}
      className={`bg-[#FFFFFF2B] flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
      <Image
        source={require('../assets/images/MSD.jpg')}
        style={{height: 25, width: 25, borderRadius: 20}}
      />
      <Text
        className="text-[#fff] text-[12px]"
        style={{fontFamily: 'Inter-Regular'}}>
        {item?.user?.fname}
      </Text>
    </TouchableOpacity>
  );

  const keyExtractor = item => item.id.toString();

  const renderBattersItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => chooseBatsMan(item)}
        className={`${
          selectedPlayerId === item.id ? 'bg-[#68dd28]' : 'bg-[#FFFFFF2B]'
        }  flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
        <Image
          source={require('../assets/images/MSD.jpg')}
          style={{height: 25, width: 25, borderRadius: 20}}
        />
        {loadingPlayerId === index ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            className="text-[#fff] text-[12px]"
            style={{fontFamily: 'Inter-Regular'}}>
            {item?.user?.fname}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
      <Text
        className="text-[16px] text-[#59ff00] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Caught By :
      </Text>

      <FlatList
        data={teamData?.players}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />

      <Modal animationType="slide" transparent={true} visible={status}>
        <TouchableWithoutFeedback onPress={() => setStatus(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,.6)', flex: 1}}></View>
        </TouchableWithoutFeedback>
        <View
          View
          className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
          <Text
            className="text-[16px] text-[#a9f77f] p-2"
            style={{fontFamily: 'Poppins-Regular'}}>
            Choose Next Batsman
          </Text>

          <FlatList
            data={battersTeamData?.players}
            renderItem={renderBattersItem}
            keyExtractor={keyExtractor}
            numColumns={2}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CoughtByModal;
