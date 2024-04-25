import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectedBattingTeamData} from './Cricket/cricketSlice';
import {selectRoomScore} from './Badminton/badmintionSlice';

const ChooseBatsman = () => {
  const teamData = useSelector(selectedBattingTeamData);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const getRoomResponse = useSelector(selectRoomScore);

  const handleChoose = player => {
    const batterOutEnd = getRoomResponse?.data[0]?.scores[0]?.cricScore;
    let gotOutEnd = null;

    // the stricker one has bolde so it will trun isStriker: false and isOut true
    for (const player of batterOutEnd) {
      if (player.isOut) {
        gotOutEnd = {
          outEnd: player?.outEnd,
        };
        break;
      }
    }

    console.log("is out : ", gotOutEnd);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleChoose(item)}
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
      </TouchableOpacity>
    );
  };

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

export default ChooseBatsman;
