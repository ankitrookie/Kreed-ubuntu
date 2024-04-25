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
import {
  selectRoom,
  selectUserData,
  selectUserDataLoading,
} from '../../screens/RoomScreen/roomSlice';
import {doubleTeamAsync, selectScoreLoading} from './badmintionSlice';

const SelectPlayerForDoubleBadminton = ({
  setSelectedPlayers,
  setModalVisible,
}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [activeTeam, setActiveTeam] = useState('firstTeamPlayer');
  const [players, setPlayers] = useState({
    firstTeamPlayer: [],
    secondTeamPlayer: [],
  });

  const userData = useSelector(selectUserData);
  const userLoading = useSelector(selectUserDataLoading);
  const loading = useSelector(selectScoreLoading);
  const user = useSelector(selectRoom);

  const togglePlayerSelection = user => {
    const playerName = user.fname;
    const playerId = user.id;

    // Check if the player with the provided id is already in the first team.
    const isInFirstTeam = players.firstTeamPlayer.some(p => p.id === playerId);
    const isInSecondTeam = players.secondTeamPlayer.some(
      p => p.id === playerId,
    );

    if (!isInFirstTeam && !isInSecondTeam) {
      const activeTeamPlayers = players[activeTeam];

      // Check if the active team's player array has less than 2 players before adding a new player
      if (activeTeamPlayers.length < 2) {
        // Add the selected player to the active team's player list.
        setPlayers({
          ...players,
          [activeTeam]: [
            ...activeTeamPlayers,
            {id: playerId, name: playerName},
          ],
        });
      } else {
        showMessage({
          message: 'Can only choose two players for each team.',
          type: 'warning',
          floating: true,
        });
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
      players.firstTeamPlayer.length >= 2
    ) {
      console.log('firstSave');
      setIsChecked(true);
      setActiveTeam('secondTeamPlayer');
    } else if (
      activeTeam === 'secondTeamPlayer' &&
      players.secondTeamPlayer.length >= 2
    ) {
      const response = await dispatch(
        doubleTeamAsync({
          roomId,
          userId1: firstTeamIds[0],
          userId2: firstTeamIds[1],
          userId3: secondTeamIds[0],
          userId4: secondTeamIds[1],
        }),
      );
      if (response.payload.status) {
        showMessage({
          message: 'Double room created successfully!',
          type: 'success',
          floating: true,
        });
        setSelectedPlayers({
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
          iconStyle={{borderRadius: 0}}
          innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
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
        {`Select Player For Team ${
          players.firstTeamPlayer.length === 2 ? '2' : '1'
        }`}
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

export default SelectPlayerForDoubleBadminton;
