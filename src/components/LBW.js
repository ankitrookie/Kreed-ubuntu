import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectBatsManAsync,
  selectBatsManLoading,
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  selectTossWin,
  selectedBattingTeamData,
  setBowler,
  setSelectedStrAndNonStr,
  teamScoresBowlerAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';
import {showMessage} from 'react-native-flash-message';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';

const LBW = ({setModal, setRunEffectTrigger}) => {
  // first 1 wicket in team tally
  // make is out of true
  // increase ball count for batter by 1
  // total wicket of bowler team tally
  // also increase one ball for bowler that is currently bowling
  // for batter, we have to update the, bowler name who bowled him
  // wicketFall: LBW;

  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const teamData = useSelector(selectedBattingTeamData);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const getRoomResponse = useSelector(selectRoomScore);
  const loadingPlayerId = useSelector(selectBatsManLoading);
  const tossWin = useSelector(selectTossWin);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const chooseBatsMan = async player => {
    if (loadingPlayerId) {
      return;
    }

    const lbwPlayerData = getRoomResponse?.data[0]?.scores[0]?.cricScore;
    let currentStricker = null;

    for (const player of lbwPlayerData) {
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
    };

    const bowlerWholeScore = {
      roomId: user?.data?.id,
      gameId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.gameId,
      teamId: getRoomResponse?.data[0]?.scores[1]?.cricScore[0]?.teamId,
      totalWicket: 1,
      runsConcided: 0,
    };

    const response1 = await dispatch(
      selectBatsManAsync({playerData: playerData}),
    );
    const response2 = await dispatch(
      updatePlayerScoreAsync({playerData: currentStricker}),
    );
    const response3 = await dispatch(
      teamScoresBowlerAsync({teamScore: wholeTeamScore}),
    );
    const response4 = await dispatch(
      updatePlayerScoreAsync({playerData: bowlerWholeScore}),
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

    // const playerData = {
    //     playerId: player?.id,
    //     gameId: tossWin?.game?.id,
    //     teamId: player?.teamId, // Use teams[1] for bowlers
    //     userId: player?.userId,
    // };

    // const lbwPlayerData = {
    //     playerId: selectedUserData[0]?.playerId,
    //     gameId: selectedUserData[0]?.gameId,
    //     teamId: selectedUserData[0]?.teamId,
    //     userId: selectedUserData[0]?.userId,
    //     isOut: true,
    //     wicketfall: 'LBW',
    //     ballfaced: 1,
    //     // bowler name still need to be done.
    // };

    // TODO: if I have to make one ball added to bowler tally, i need to updated, runsConcided above 0, only then, bowler bowler increase, but if it if directly bold, there no any run. so how can I bowler run Increase.
    // const bowlerUserData = {
    //     playerId: selectedBowler[0]?.playerData,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     userId: selectedBowler[0]?.userId,
    //     runsConcided: 0
    // };

    // const wholeTeamScore = {
    //     roomId: user?.createdRoom?.id,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     wickets: 1,
    // };

    // try {
    //     const response = await dispatch(selectBatsManAsync({ playerData: playerData }));
    //     const bowlerResponse = await dispatch(updatePlayerScoreAsync({ playerData: bowlerUserData }));
    //     if (response.payload && !response.payload.error) {
    //         showMessage({
    //             message: "New batter updated successfully!",
    //             type: 'success',
    //             floating: true,
    //         });
    //         await dispatch(teamScoresBowlerAsync({ teamScore: wholeTeamScore }));
    //         dispatch(setSelectedStrAndNonStr(response.payload));
    //         dispatch(setSelectedStrAndNonStr(bowledResponse.payload));
    //         dispatch(setBowler(bowlerResponse.payload));
    //         setSelectedPlayerId(player.id);
    //         setModal(false);
    //     } else if (response.payload && response.payload.error) {
    //         showMessage({
    //             message: "Select new player! Don't choose existing Player!",
    //             type: 'info',
    //             floating: true
    //         });
    //         setSelectedPlayerId(player.id);
    //         setModal(false);
    //     } else {
    //         showMessage({
    //             message: 'Something went wrong! Try Again!',
    //             type: 'danger',
    //             floating: true
    //         })
    //     }
    // } catch (error) {
    //     console.log(error);
    //     showMessage({
    //         message: 'Something went wrong!',
    //         type: 'danger',
    //         floating: true
    //     })
    // }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => chooseBatsMan(item)}
      className={`${
        selectedPlayerId === item.id ? 'bg-[#a9f77f]' : 'bg-[#FFFFFF2B]'
      }  flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
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
  return (
    <View
      View
      className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
      <Text
        className="text-[16px] text-[#59ff00] p-2"
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
  );
};

export default LBW;
