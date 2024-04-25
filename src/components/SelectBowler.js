import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {
  selectBowlerAsync,
  selectBowlerLoading,
  selectTossWin,
  selectedBowlingTeamData,
} from './Cricket/cricketSlice';

import {ActionButton} from '../ui';

const SelectBowler = () => {
  const teamData = useSelector(selectedBowlingTeamData);
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const navigation = useNavigation();
  const tossWin = useSelector(selectTossWin);
  const loading = useSelector(selectBowlerLoading);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const togglePlayerSelection = player => {
    setSelectedPlayer(player);
  };

  const handleSave = async () => {
    const playerData = {
      playerId: selectedPlayer?.id,
      gameId: tossWin?.data?.id,
      teamId: selectedPlayer?.teamId, // Use teams[1] for bowlers
      userId: selectedPlayer?.userId,
    };
    console.log(playerData);

    try {
    const response = await dispatch(selectBowlerAsync({playerData: playerData}));
    console.log('selected Bowler', response);

    if(response.payload.status){
      navigation.navigate("ScoreBoarding");
    } else if(!response.data.status){
      showMessage({
        message: 'Player already chosen.',
        type: 'warning',
        floating: true
      })
    } else {
      showMessage({
        message: 'omething went wrong! Try Again!',
        type: "danger",
        floating: true
      })
    }
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
        floating: true,
      });
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      className={`flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1 ${
        selectedPlayer?.id === item.id ? 'bg-[#87d957de]' : 'bg-[#FFFFFF2B] '
      }`}
      onPress={() => togglePlayerSelection(item)}>
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
    <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
      <Text
        className="text-[16px] text-[#a9f77f] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Select Bowler
      </Text>
      <View>
        <FlatList
          data={teamData?.players}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
        />
      </View>

      <ActionButton
        style={{paddingHorizontal: 50}}
        loading={loading}
        title="Save"
        onPress={handleSave}
      />
    </View>
  );
};

export default SelectBowler;
