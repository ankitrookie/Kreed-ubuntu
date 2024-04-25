import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom, selectUserData} from '../../screens/RoomScreen/roomSlice';
import {selectSingleLoading, singleTeamAsync} from './badmintionSlice';

const SelectPlayerForSinglesBadminton = ({
  setSelectedPlayers2,
  setModalVisible,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectSingleLoading);
  const [isChecked, setIsChecked] = useState(false);
  const [activeTeam, setActiveTeam] = useState('firstTeamPlayer');
  const [players, setPlayers] = useState({
    firstTeamPlayer: [],
    secondTeamPlayer: [],
  });
  const userData = useSelector(selectUserData);
  const user = useSelector(selectRoom);

  const togglePlayerSelection = user => {
    const playerName = user.fname;
    const playerId = user.id;

    const isInFirstTeam = players.firstTeamPlayer.some(p => p.id === playerId);
    const isInSecondTeam = players.secondTeamPlayer.some(
      p => p.id === playerId,
    );

    if (!isInFirstTeam && !isInSecondTeam) {
      const activeTeamPlayers = players[activeTeam];

      if (activeTeamPlayers.length < 1) {
        setPlayers({
          ...players,
          [activeTeam]: [
            ...activeTeamPlayers,
            {id: playerId, name: playerName},
          ],
        });
      } else {
        console.log('Can only choose one player for each team.');
      }
    } else if (isInFirstTeam) {
      setPlayers({
        ...players,
        firstTeamPlayer: players.firstTeamPlayer.filter(p => p.id !== playerId),
      });
    } else if (isInSecondTeam) {
      setPlayers({
        ...players,
        secondTeamPlayer: players.secondTeamPlayer.filter(
          p => p.id !== playerId,
        ),
      });
    }
  };

  const roomId = user?.data?.id;

  const saveTeams = async () => {
    const firstTeamIds = players.firstTeamPlayer.map(player => player.id);
    const secondTeamIds = players.secondTeamPlayer.map(player => player.id);

    const firstTeamNames = players.firstTeamPlayer.map(player => player.name);
    const secondTeamNames = players.secondTeamPlayer.map(player => player.name);

    if (
      activeTeam === 'firstTeamPlayer' &&
      players.firstTeamPlayer.length === 1
    ) {
      console.log('firstSave');
      setIsChecked(true);
      setActiveTeam('secondTeamPlayer');
    } else if (
      activeTeam === 'secondTeamPlayer' &&
      players.secondTeamPlayer.length === 1
    ) {
      console.warn('second save');
      const response = await dispatch(
        singleTeamAsync({
          roomId,
          userId1: firstTeamIds[0],
          userId2: secondTeamIds[0],
        }),
      );
      if (response.payload.status) {
        showMessage({
          message: 'Single room created successfully!',
          type: 'success',
          floating: true,
        });
        setSelectedPlayers2({
          firstTeam: firstTeamNames,
          secondTeam: secondTeamNames,
        });
        setModalVisible(false);
      }
    }
  };

  const isPlayerChosen = item => {
    return (
      players.firstTeamPlayer.some(p => p.id === item.id) ||
      players.secondTeamPlayer.some(p => p.id === item.id)
    );
  };

  const MemberList = ({item}) => {
    const imageSize = isChecked && isPlayerChosen(item.data) ? 16 : 25;
    const checkBoxSize = isChecked && isPlayerChosen(item.data) ? 10 : 15;
    return (
      <View className="flex-row items-center flex-1 justify-between p-1">
        <Image
          source={require('../../assets/images/MSD.jpg')}
          style={{width: imageSize, height: imageSize, borderRadius: 25}}
        />

        <Text
          className={`text-white ${
            isChecked && isPlayerChosen(item) ? 'text-[#a59e9e]' : 'text-[15px]'
          }`}
          style={{fontFamily: 'Inter-Regular'}}>
          {item?.data?.fname}
        </Text>
        <BouncyCheckbox
          size={checkBoxSize}
          fillColor="#86d957"
          iconStyle={{borderRadius: 10}}
          innerIconStyle={{borderRadius: 10, borderColor: 'white'}}
          onPress={() => togglePlayerSelection(item?.data)}
          disabled={isChecked && isPlayerChosen(item?.data)}
        />
      </View>
    );
  };

  return (
    <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-2">
      <Text
        className="text-[16px] text-[#a9f77f] p-2"
        style={{fontFamily: 'Poppins-Regular'}}>
        Select Player For Team
      </Text>
      <View>
        <FlatList
          data={userData}
          renderItem={MemberList}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={item => item.data.id}
          ListFooterComponent={() => (
            <TouchableOpacity className="p-4" onPress={saveTeams}>
              <LinearGradient
                colors={['#86D957', '#20341D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="rounded-[10px] p-2 self-end w-[40%]">
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    className="text-[15px] text-white font-extrabold text-center"
                    style={{fontFamily: 'Inter-Regular'}}>
                    Save
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SelectPlayerForSinglesBadminton;
