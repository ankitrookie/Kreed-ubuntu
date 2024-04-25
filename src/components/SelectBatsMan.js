import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { ActionButton } from '../ui';
import {
  selectBatsManAsync,
  selectBatsManLoading,
  selectTossWin,
  selectedBattingTeamData
} from './Cricket/cricketSlice';

const SelectBatsMan = ({setModalType}) => {
  const teamData = useSelector(selectedBattingTeamData);
  const loading = useSelector(selectBatsManLoading);
  const dispatch = useDispatch();
  const tossWin = useSelector(selectTossWin);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [hasFailedRequest, setHasFailedRequest] = useState(false);

  const togglePlayerSelection = player => {
    const isSelected = selectedPlayers.some(
      selectedPlayer => selectedPlayer.id === player.id,
    );

    if (isSelected) {
      // If player is already selected, remove it.....
      const updatedPlayers = selectedPlayers.filter(
        selectedPlayer => selectedPlayer.id !== player.id,
      );
      setSelectedPlayers(updatedPlayers);
    } else {
      // If player is not selected, add it
      if (selectedPlayers.length < 2) {
        const updatedPlayers = [...selectedPlayers, player];
        setSelectedPlayers(updatedPlayers);
      } else {
        showMessage({
          message:
            'Have you already chosen your striker and non-striker batsmen.',
          type: 'warning',
          floating: true,
        });
      }
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedPlayers.some(
      selectedPlayer => selectedPlayer.id === item.id,
    );
    return (
      <TouchableOpacity
        onPress={() => togglePlayerSelection(item)}
        className={`${
          isSelected ? 'bg-[#87d957de]' : 'bg-[#FFFFFF2B]'
        }  flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
        <Image
          source={require('../assets/images//MSD.jpg')}
          style={{height: 25, width: 25, borderRadius: 20}}
        />
        <Text
          className="text-[#fff] text-[12px]"
          style={{fontFamily: 'Inter-Regular'}}>
          {item.user.fname}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleSave = async () => {
    if (hasFailedRequest) {
      showMessage({
        message: 'Select Batsman first!',
        type: 'warning',
        floating: true,
      });
      return;
    }

    const playerData1 = {
      playerId: selectedPlayers[0].id,
      gameId: tossWin?.data?.id,
      teamId: selectedPlayers[0].teamId,
      userId: selectedPlayers[0].userId,
      isStriker: true
    };

    const playerData2 = {
      playerId: selectedPlayers[1].id,
      gameId: tossWin?.data?.id,
      teamId: selectedPlayers[1].teamId,
      userId: selectedPlayers[1].userId,
      isStriker: false
    };

    console.log('PlayerData 1', playerData1);
    console.log('PlayerData 2', playerData2);

    try {
      const response1 = await dispatch(
        selectBatsManAsync({playerData: playerData1}),
      );
      const response2 = await dispatch(
        selectBatsManAsync({playerData: playerData2}),
      );

      if (response1.payload.status && response2.payload.status) {
        setModalType('bowler');
      } else if (!response1.payload.status) {
        showMessage({
          message: 'Player already chosen.',
          type: 'warning',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Something Went wrong!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const keyExtractor = item => item.id.toString();
  
  return (
    <View className="bg-[#05080d] border-t-2 rounded-3xl border-[#59ff008e] p-4">
      <Text
        className="text-[16px] text-[#a9f77f] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Select Strike & and Non-Strike Batsman
      </Text>

      <FlatList
        data={teamData?.players}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />

      <ActionButton
        style={{paddingHorizontal: 50}}
        loading={loading}
        title="Save"
        onPress={handleSave}
      />
    </View>
  );
};

export default SelectBatsMan;
