import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { selectRoomScore } from './Badminton/badmintionSlice';
import {
  selectBatsManAsync,
  selectBatsManLoading,
  selectBowlerTeamScores,
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  selectTossWin,
  selectedBattingTeamData,
  teamScoresBowlerAsync,
  updatePlayerScoreAsync
} from './Cricket/cricketSlice';

// TODO:
const Bowled = ({setModal, setRunEffectTrigger}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const teamData = useSelector(selectedBattingTeamData);
  const getRoomResponse = useSelector(selectRoomScore);
  const selectedUserData = useSelector(selectSelectedStrAndNonStr);
  const bowlerTeamScoree = useSelector(selectBowlerTeamScores);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  console.log("selectedUserData", teamData);
  const loadingPlayerId = useSelector(selectBatsManLoading);
  const tossWin = useSelector(selectTossWin);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const allbatterPlayerData = getRoomResponse?.data[0]?.scores[0]?.players;
  const currentBatterData = getRoomResponse?.data[0]?.scores[0]?.cricScore;

  const [filteredData, setFilteredData] = useState([]);


  // in thi data we dont have userId, so we are not meeting the struture that we have 
  // to send to backend cause we need playerId, userId, gameId, gameId

  useEffect(() => {
    const filteredPlayers = allbatterPlayerData?.filter(player => {
      return !currentBatterData.some(
        newPlayer => newPlayer?.playerId === player.playerId,
      );
    });
    setFilteredData(filteredPlayers);
  }, []);

  const chooseBatsMan = async player => {
    if (loadingPlayerId) {
      return;
    }
    
    const bowledPlayerData = getRoomResponse?.data[0]?.scores[0]?.cricScore;
    let currentStricker = null;

    // the stricker one has bolde so it will trun isStriker: false and isOut true
    for (const player of bowledPlayerData) {
      if (player.isStriker) {
        currentStricker = {
          playerId: player.playerId,
          gameId: player.gameId,
          teamId: player.teamId,
          userId: player.userId,
          isStriker: false,
          isOut: true,
          wicketfall: 'bowled',
        };
        break;
      }
    }

    // the new choosen one will come to the strike
    const playerData = {
      playerId: player?.user?.id,
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

    // api for player who is being choosen next
    const response1 = await dispatch(
      selectBatsManAsync({playerData: playerData}),
    );
    // api for current stricker who is being out
    const response2 = await dispatch(
      updatePlayerScoreAsync({playerData: currentStricker}),
    );
    // bowler team whole score update
    const response3 = await dispatch(
      teamScoresBowlerAsync({teamScore: wholeTeamScore}),
    );
    // bolwler
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

    // // TODO: if I have to make one ball added to bowler tally, i need to updated, runsConcided above 0, only then, bowler bowler increase, but if it if directly bold, there no any run. so how can I bowler run Increase.
    // const bowlerUserData = {
    //     playerId: selectedBowler[0]?.playerData,
    //     gameId: selectedBowler[0]?.gameId,
    //     teamId: selectedBowler[0]?.teamId,
    //     userId: selectedBowler[0]?.userId,
    //     runsConcided: 0,
    //     totalWicket: 1
    // }

    // try {
    //     const response = await dispatch(selectBatsManAsync({ playerData: playerData }));
    //     const bowledPlayerResponse = await dispatch(updatePlayerScoreAsync({ playerData: bowledPlayerData }));
    //     const bowlerResponse = await dispatch(updatePlayerScoreAsync({ playerData: bowlerUserData }));
    //     if (response.payload && !response.payload.error) {
    //         showMessage({
    //             message: "New batter updated successfully!",
    //             type: 'success',
    //             floating: true,
    //         });
    //         await dispatch(teamScoresBowlerAsync({ teamScore: wholeTeamScore }));
    //         dispatch(setSelectedStrAndNonStr(response.payload));
    //         dispatch(setSelectedStrAndNonStr(bowledPlayerResponse.payload));
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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => chooseBatsMan(item)}
        className={`${
          selectedPlayerId === item.id ? 'bg-[#59ff00]' : 'bg-[#FFFFFF2B]'
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
        {loadingPlayerId === item.id && (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </TouchableOpacity>
    );
  };

  // const keyExtractor = item => item?.playerId.toString();
 const keyExtractor = item => item?.id.toString();
  return (
    <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
      <Text
        className="text-[16px] text-[#59ff00] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Choose Next Batsman
      </Text>

      <FlatList
        data={teamData.players}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />
    </View>
  );
};

export default Bowled;
