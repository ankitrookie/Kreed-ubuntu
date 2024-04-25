import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectGetScoreBoard,
  selectSelectedStrAndNonStr,
  selectedBowlingTeamData,
  teamRunsAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';
import LinearGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';
import {selectRoom} from '../screens/RoomScreen/roomSlice';

const end = [
  {id: 1, end: 'Batting End'},
  {id: 2, end: 'Bowling End'},
];

const runs = ['.', 1, 2, 3, 4, 5, 6];

const RunOut = ({setRunEffectTrigger, setModal, setData}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const batters = useSelector(selectSelectedStrAndNonStr);

  const scoreboardData = useSelector(selectGetScoreBoard);

  const batsman = scoreboardData?.data[0]?.scores[0]?.cricScore;

  const filteredBatsman = batsman?.filter(
    item => !item?.isOut && item?.isStriker !== null,
  );

  const teamData = useSelector(selectedBowlingTeamData);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedEndPoint, setSelectedEndPoint] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    runs: null,
    byes: null,
    legByes: null,
  });
  const [selectRunOutByWho, setSelectRunOutByWho] = useState(null);


  const toggleBatsmanSelection = player => {
    setSelectedPlayer(player);
  };

  const toggleEndPoint = endPoint => {
    setSelectedEndPoint(endPoint);
  };

  const selectOption = (type, value) => {
    const sanitizedValue = value === '.' ? 0 : value;
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [type]: sanitizedValue,
    }));
  };

  const toggleRunOutByWho = player => {
    setSelectRunOutByWho(player);
  };


  const handleSave = async () => {
    if (selectedPlayer === null || selectedEndPoint === null) {
      showMessage({
        message: 'Please select all the fields!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    // if some body gets out in bowling end he should come in bowling end, and visa versa
    // if they take runs, through running, it will upodated to specific batter tally and to team tally
    // for byes and leg-bys it will go to team tally

    const runOutPlayerData = {
      playerId: selectedPlayer?.playerId,
      gameId: selectedPlayer?.gameId,
      teamId: selectedPlayer?.teamId,
      userId: selectedPlayer?.userId,
      isOut: true,
      isStricker: false,
      ballfaced: 1,
      outEnd: selectedEndPoint?.end,
      ...(selectedOptions.runs !== null && {runs: selectedOptions.runs}),
      whoRunCatch: ''
    };

    const wholeTeamScore = {
      roomId: user?.data?.id,
      gameId: selectedPlayer?.gameId,
      teamId: selectedPlayer?.teamId,
      ...(selectedOptions.byes !== null && {runs: selectedOptions.byes}),
      ...(selectedOptions.legByes !== null && {runs: selectedOptions.legByes}),
      ...(selectedOptions.runs !== null && {runs: selectedOptions.runs}),
    };

    // const runOutByData = {
    //   playerId: selectRunOutByWho?.playerId,
    //   gameId: selectRunOutByWho?.gameId,
    //   teamId: selectRunOutByWho?.teamId,
    //   userId: selectRunOutByWho?.userId,
    // }
    
    setData('ChooseBatsman')

    const isOutBatsmanResponse = await dispatch(
      updatePlayerScoreAsync({playerData: runOutPlayerData}),
    );

    const teamScore = await dispatch(
      teamRunsAsync({teamScore: wholeTeamScore}),
    );

    if (isOutBatsmanResponse.payload.status && teamScore.payload.status) {
        setRunEffectTrigger(true);
        setData('ChooseBatsman')
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleBatsmanSelection(item)}
        className={`${
          selectedPlayer?.id === item.id ? 'bg-[#59ff00]' : 'bg-[#FFFFFF2B] '
        } flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
        <Image
          source={require('../assets/images/MSD.jpg')}
          style={{height: 25, width: 25, borderRadius: 20}}
        />
        <Text
          className="text-[#fff] text-[12px]"
          style={{fontFamily: 'Inter-Regular'}}>
          {item?.fname}
        </Text>
      </TouchableOpacity>
    );
  };

  const endPoint = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleEndPoint(item)}
        className={`${
          selectedEndPoint?.id === item.id ? 'bg-[#59ff00]' : 'bg-[#FFFFFF2B] '
        } flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1`}>
        <Image
          source={require('../assets/images/MSD.jpg')}
          style={{height: 25, width: 25, borderRadius: 20}}
        />
        <Text
          className="text-[#fff] text-[12px]"
          style={{fontFamily: 'Inter-Regular'}}>
          {item?.end}
        </Text>
      </TouchableOpacity>
    );
  };

  const bowlerRenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => toggleRunOutByWho(item)}
      className={`flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1 ${
        selectRunOutByWho?.id === item.id ? 'bg-[#59ff00]' : 'bg-[#FFFFFF2B] '
      }`}>
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

  return (
    <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-4">
      <View className="justify-center items-center p-2">
        <Text
          className="text-[16px] text-[#59ff00]"
          style={{fontFamily: 'Poppins-Regular'}}>
          Run Out
        </Text>
      </View>

      <View>
        <Text className="text-[#cfcfcf] text-[16px] pl-2">Out Batsman:</Text>
        <FlatList
          data={filteredBatsman}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>

      <View>
        <Text className="text-[#cfcfcf] text-[16px] pl-2">End:</Text>
        <FlatList
          data={end}
          renderItem={endPoint}
          keyExtractor={item => item?.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>

      <View
        className={`${
          selectedOptions.byes === null && selectedOptions.legByes === null
            ? ''
            : 'hidden'
        }
        }`}>
        <Text className="text-[#cfcfcf] text-[16px] pl-2">Number of Runs:</Text>
        <View className={`flex-row justify-center`}>
          {runs.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => selectOption('runs', item)}
              className={`${
                selectedOptions.runs === item
                  ? 'bg-[#59ff00]'
                  : 'border border-[#86d957]'
              } rounded-full items-center justify-center w-8 h-8 m-3`}>
              <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedOptions.runs === null && selectedOptions.legByes === null && (
        <>
          <Text className="text-[#cfcfcf] text-[16px] pl-2">Byes:</Text>
          <View className="flex-row justify-center">
            {runs.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => selectOption('byes', item)}
                className={`border border-[#86d957] rounded-full items-center justify-center w-8 h-8 m-3 ${
                  selectedOptions.byes === item ? 'bg-[#59ff00]' : ''
                }`}>
                <Text style={{fontSize: 15, color: 'white'}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {selectedOptions.runs === null && selectedOptions.byes === null && (
        <>
          <Text className="text-[#cfcfcf] text-[16px] pl-2">Leg Byes:</Text>
          <View className="flex-row justify-center">
            {runs.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => selectOption('legByes', item)}
                className={`border border-[#86d957] rounded-full items-center justify-center w-8 h-8 m-3 ${
                  selectedOptions.legByes === item ? 'bg-[#59ff00]' : ''
                }`}>
                <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View>
        <Text className="text-[#cfcfcf] text-[16px] pl-2">Run Out By:</Text>
        <FlatList
          data={teamData?.players}
          renderItem={bowlerRenderItem}
          keyExtractor={item => item?.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>

      <TouchableOpacity style={styles.StartGameButton} onPress={handleSave}>
        <LinearGradient
          colors={['#59ff00', '#111C0B']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="rounded-[10px] px-10 py-3 w-[100%] items-center">
          <Text
            className="text-[15px] text-white font-bold"
            style={{fontFamily: 'Inter-Regular'}}>
            Save
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default RunOut;

const styles = StyleSheet.create({
  StartGameButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});
