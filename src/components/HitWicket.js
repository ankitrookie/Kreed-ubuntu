import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectBatsManAsync,
  selectBatsManLoading,
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  selectTossWin,
  selectedBattingTeamData,
  setSelectedStrAndNonStr,
  setTeamScoreBatter,
  teamRunsAsync,
  teamScoresBowlerAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {showMessage} from 'react-native-flash-message';

const HitWicket = ({setModal, setRunEffectTrigger}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const user = useSelector(selectRoom);
  const teamData = useSelector(selectedBattingTeamData);
  console.log("temData", teamData);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const tossWin = useSelector(selectTossWin);
  const loadingPlayerId = useSelector(selectBatsManLoading);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [deliveryValue, setDeliveryValue] = useState(null);

  const handleDeliveryTypeSelection = deliveryType => {
    let value;

    switch (deliveryType) {
      case '.':
        value = 0;
        break;
      case 'Wide':
      case 'No Ball':
        value = 1;
        break;
      default:
        value = null;
    }

    setSelectedDeliveryType(deliveryType);
    setDeliveryValue(value);
    setStatus(true);
  };

  const chooseBatsMan = async player => {
    const hitWicketPlayerData = getRoomResponse?.data[0]?.scores[0]?.cricScore;
    let currentStricker = null;

    for (const player of hitWicketPlayerData) {
      if (player.isStriker) {
        currentStricker = {
          playerId: player.playerId,
          gameId: player.gameId,
          teamId: player.teamId,
          userId: player.userId,
          isStriker: false,
          isOut: true,
          wicketfall: 'LBW',
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
      runs: deliveryValue,
      wides: deliveryValue,
    };

    const bowlerWholeScore = {
      roomId: user?.data?.id,
      gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
      teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
      totalWicket: 1,
      runsConcided: 0,
    };

    const response1 = await dispatch(selectBatsManAsync({playerData: playerData}));
    const response2 = await dispatch(updatePlayerScoreAsync({playerData: currentStricker}));
    const response3 = await dispatch(teamScoresBowlerAsync({teamScore: wholeTeamScore}));
    const response4 = await dispatch(updatePlayerScoreAsync({playerData: bowlerWholeScore}));

    if (
      response1.payload.status &&
      response2.payload.status &&
      response3.payload.status &&
      response4.payload.status
    ) {
      setModal(false);
      setRunEffectTrigger(true);
    }

    // const hitWicketPlayerData = {
    //     playerId: selectedUserData[0]?.playerId,
    //     gameId: selectedUserData[0]?.gameId,
    //     teamId: selectedUserData[0]?.teamId,
    //     userId: selectedUserData[0]?.userId,
    //     isOut: true,
    //     ballfaced: 1,
    //     wicketfall: "hit wicket",
    // }

    // const playerData = {
    //     playerId: player?.id,
    //     gameId: tossWin?.game?.id,
    //     teamId: player?.teamId,
    //     userId: player?.userId,
    // };

    // RunConsided problem //TODO: runConsided need to be above 0, to make our ball increase -> backed need to be fixed
    // const bowlerUserData = {
    //     playerId: selectedBowler[0]?.playerData,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     userId: selectedBowler[0]?.userId,
    //     runsConcided: boundary
    // }

    // const wholeTeamScore = {
    //     roomId: user?.createdRoom?.id,
    //     gameId: selectedUserData[0]?.gameId,
    //     teamId: selectedUserData[0]?.teamId,
    //     runs: deliveryValue,
    //     wides: deliveryValue
    // };

    // const wholeTeamBowlerScore = {
    //     roomId: user?.createdRoom?.id,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     wickets: 1,
    // };

    // try {
    //   const response = await dispatch(
    //     selectBatsManAsync({playerData: playerData}),
    //   );

    //   // Check if the condition is met
    //   if (
    //     response.payload.error ===
    //     'CricScore already exists for this player in the game.'
    //   ) {
    //     showMessage({
    //       message: "Select new player! Don't choose an existing Player!",
    //       type: 'info',
    //       floating: true,
    //     });

    //     setSelectedPlayerId(player.id);
    //     setStatus(false);
    //     setModal(false);
    //     return;
    //   }

    //   const bowledResponse = await dispatch(
    //     updatePlayerScoreAsync({playerData: hitWicketPlayerData}),
    //   );
    //   if (selectedDeliveryType === 0) {
    //     try {
    //       const response = await dispatch(
    //         updatePlayerScoreAsync({playerData: bowlerUserData}),
    //       );
    //       if (response.payload && !response.payload.error) {
    //         dispatch(setBowler(response.payload));
    //       } else {
    //         showMessage({
    //           message: 'Something is wrong, ',
    //           type: 'danger',
    //           floating: true,
    //         });
    //       }
    //     } catch (error) {
    //       showMessage({
    //         message: 'Error updating bowler data!',
    //         type: 'danger',
    //         floating: true,
    //       });
    //     }
    //   }
    //   if (response.payload && !response.payload.error) {
    //     showMessage({
    //       message: 'New batter updated successfully!',
    //       type: 'success',
    //       floating: true,
    //     });
    //     await dispatch(teamRunsAsync({teamScore: wholeTeamScore}));
    //     await dispatch(
    //       teamScoresBowlerAsync({teamScore: wholeTeamBowlerScore}),
    //     );
    //     dispatch(setSelectedStrAndNonStr(response.payload));
    //     dispatch(setSelectedStrAndNonStr(bowledResponse.payload));
    //     setStatus(false);
    //     setModal(false);
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

  const renderItem = ({item, index}) => {
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
  const keyExtractor = item => item.id.toString();

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        borderColor: '#A9F77F',
        borderWidth: 1,
      }}>
      <Text
        className="text-[18px] text-[#5eff00] p-2 text-center"
        style={{fontFamily: 'Poppins-Regular'}}>
        Hit Wicket
      </Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 15,
          marginLeft: 20,
          marginBottom: 30,
          borderBottomWidth: 1,
        }}>
        Delivery Type :
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 30,
        }}>
        <TouchableOpacity
          onPress={() => handleDeliveryTypeSelection('.')}
          className={`border border-[#6cff1e] w-10 h-10 items-center justify-center rounded-full ${
            selectedDeliveryType === '.' && 'bg-[#71d83a]'
          }`}>
          <Text className="text-white text-[16px]">.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeliveryTypeSelection('Wide')}
          className={`border border-[#6cff1e] w-20 items-center justify-center rounded-lg ${
            selectedDeliveryType === 'Wide' && 'bg-[#71d83a]'
          }`}>
          <Text className="text-white text-[16px]">Wide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeliveryTypeSelection('No Ball')}
          className={`border border-[#6cff1e] w-20 items-center justify-center rounded-lg ${
            selectedDeliveryType === 'No Ball' && 'bg-[#71d83a]'
          }`}>
          <Text className="text-white text-[16px]">No Ball</Text>
        </TouchableOpacity>
      </View>

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
            data={teamData?.players}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HitWicket;

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
  },
  RunCircleText: {
    color: 'white',
  },
  Button: {
    borderColor: '#86D957',
    borderWidth: 1,
    borderRadius: 10,
    width: 83,
    alignItems: 'center',
    marginHorizontal: '1.21%',
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});
