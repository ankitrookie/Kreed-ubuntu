import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import themes from '../themes';
import {
  getRoomScoreForScoreBoardAsync,
  selectGetScoreBoard
} from './Cricket/cricketSlice';
import BatsmanScoreBoard from './BatsmanScoreBoard';
import PlayerNameAndRunInScoreBoard from './PlayerNameAndRunInScoreBoard';

const ScoreBoard = () => {
  // here we have two condition to meet isOut
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const scoreboardData = useSelector(selectGetScoreBoard);

  const wholeTeamScore = scoreboardData?.data[0]?.scores[0]?.teamScore[0];

  const fetchRoomScore = async () => {
    try {
      await dispatch(getRoomScoreForScoreBoardAsync({roomId: user?.data?.id}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomScore();
  }, [dispatch]);

  const handleRefresh = async () => {
    try {
      await fetchRoomScore();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mx-4 bg-[#ffffff07]">
      <TouchableOpacity
        onPress={handleRefresh}
        style={{
          backgroundColor: themes.darkGreen,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          padding: 3,
          borderRadius: 100,
        }}>
        <Ionicons name="refresh" size={18} color={themes.lightText} />
      </TouchableOpacity>

      <View className="bg-[#FFFFFF0F] p-6 space-y-5 rounded-lg">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="border border-[#2e6212] px-6 rounded-md">
            <Text className="text-[#fff] text-[12px]">Team 1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-[#2e6212] px-6 rounded-md">
            <Text className="text-[#fff] text-[12px]">Team 2</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-evenly">
          <Text style={{color: 'white'}}>
            {wholeTeamScore ? wholeTeamScore?.runs : 0} -{' '}
            {wholeTeamScore ? wholeTeamScore?.wickets : 0}
   
          </Text>
          <Text style={{color: 'white'}}>VS</Text>
          {/* // TODO:  */}
          <Text style={{color: 'white'}}>8 Overs</Text>
        </View>
      </View>
      <View className="flex-row justify-between p-2">
        <View><BatsmanScoreBoard /></View>
        <View><PlayerNameAndRunInScoreBoard /></View>
      </View>
    </View>
  );
};

export default ScoreBoard;
