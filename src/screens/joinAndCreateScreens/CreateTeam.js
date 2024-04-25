import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// icons
import Entypo from 'react-native-vector-icons/dist/Entypo';

// linear
import LinearGradient from 'react-native-linear-gradient';
import {RoomHeader, RoomInfoBox} from '../../components';

import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {showMessage} from 'react-native-flash-message';
import {UserMinusIcon, UserPlusIcon} from 'react-native-heroicons/outline';
import {useDispatch, useSelector} from 'react-redux';
import {
  makeCoHostAsync,
  selectCoHostLoading,
} from '../../components/Badminton/badmintionSlice';
import usePermission from '../../hooks/usePermission';
import {ActionButton} from '../../ui';
import {
  getRoomDetailsAsync,
  leaveRoomAsync,
  selectLeaveLoading,
  selectRoom,
  selectRoomDetails,
  selectStartGameLoading,
  startGameAsync,
} from '../RoomScreen/roomSlice';

const CreateTeam = () => {
  const dispatch = useDispatch();
  const {requestPermission} = usePermission();
  const navigation = useNavigation();
  const [selectedPlayers, setSelectedPlayers] = useState('');
  const loadingLeaveRoom = useSelector(selectLeaveLoading);
  const loadingCoHost = useSelector(selectCoHostLoading);
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector(selectStartGameLoading);
  const roomDetails = useSelector(selectRoomDetails);
  const [backModal, setBackModal] = useState(false);
  const [makeCoHostModal, setMakeCohostModal] = useState(false);
  const [modal, setModal] = useState(false);
  const user = useSelector(selectRoom);
  const [selectedUserId, setSelectedId] = useState('');
  const [startButtonDisabled, setStartButtonDisabled] = useState(true);

  const roomId = user?.data?.id;
  const allUsers = roomDetails?.data?.userRoom;

  const fetchData = async () => {
    try {
      if (roomId.length > 0) {
        await dispatch(getRoomDetailsAsync(roomId));
      }
    } catch (error) {
      showMessage({
        message: 'Not able to get the data. Try Again please!',
        type: 'danger',
        floating: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (allUsers?.length >= 4) {
      setStartButtonDisabled(false);
    } else {
      setStartButtonDisabled(true);
    }
  }, [allUsers]);

  // refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (roomDetails && roomDetails.data && roomDetails.data.id) {
        await dispatch(getRoomDetailsAsync(roomDetails.data.id));
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStartGame = async () => {
    try {
      //   await fetchData();
      const numUsers = allUsers.length;

      if (numUsers < 4) {
        showMessage({
          message: 'You need at least four users to start the game.',
          type: 'warning',
          floating: true,
        });
        return;
      }

      const response = await dispatch(startGameAsync(roomId));
      console.log('response of start game', response);
      if (response.payload.data.isGameStarted) {
        showMessage({
          message: 'Game Started!',
          type: 'success',
          floating: true,
        });
        if (response.payload.data.sportType === 'Badminton') {
          navigation.navigate('MakeBadmintonTeam');
        } else {
          navigation.navigate('MakeTeam');
        }
      } else {
        showMessage({
          message: 'Failed to start game! Try Again..',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error starting game!',
        type: 'danger',
        floating: true,
      });
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const response = await dispatch(
        leaveRoomAsync({
          roomId: roomDetails?.room?.id,
          userId: selectedPlayers,
        }),
      );
      console.log('Removed Response', response);
      if (response.payload.status) {
        showMessage({
          message: 'Player Removed SuccessFully!',
          type: 'success',
          floating: true,
        });
        setBackModal(false);
        fetchData();
      } else {
        showMessage({
          message: 'Something when wrong while removing player! Try Again!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error leaving room',
        type: 'danger',
        floating: true,
      });
    }
  };

  const handleCoHost = async () => {
    try {
      const response = await dispatch(
        makeCoHostAsync({roomId: roomId, userId: selectedPlayers}),
      );
      if (response.payload.status) {
        showMessage({
          message: 'User is now a co-host for the room!',
          type: 'success',
          floating: true,
        });
        setBackModal(false);
      } else {
        showMessage({
          message: 'User is already a co-host or owner for this room!',
          type: 'warning',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error making cohost',
        type: 'danger',
        floating: true,
      });
    }
  };

  const handleBackCoHost = async () => {
    try {
      const response = await dispatch(
        makeCoHostAsync({roomId: roomId, userId: selectedUserId}),
      );
      if (response.payload.status) {
        setBackModal(false);
        navigation.goBack();
      } else {
        showMessage({
          message: 'User is already a co-host or owner for this room!',
          type: 'warning',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Something went wrong, Try Again!',
        type: 'danger',
        floating: true,
      });
    }
  };

  const MemberList = ({item}) => {
    return (
      <View className="w-[50%] p-1">
        <LinearGradient
          colors={['#EFF30F', '#308400']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 6,
            borderRadius: 8,
            justifyContent: 'space-between',
          }}>
          <View className="flex-row items-center justify-center">
            <Image
              source={require('../../assets/images/MSD.jpg')}
              style={{width: 22, height: 22, borderRadius: 25}}
            />

            <Text
              numberOfLines={1}
              className="text-[12px] ml-2 font-semibold text-[#1b1b1be0]">
              {item?.myUser?.fname}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setBackModal(true), setSelectedPlayers(item?.myUser?.id);
            }}>
            <Entypo
              name="dots-three-vertical"
              size={10}
              color="#000"
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const MemberListCoHost = ({item}) => (
    <TouchableOpacity className="flex-row items-center flex-1 justify-between p-1">
      <Image
        source={require('../../assets/images/MSD.jpg')}
        style={{width: 25, height: 25, borderRadius: 25}}
      />
      <Text style={{color: 'white', fontSize: 12, marginLeft: 5}}>
        {item?.myUser?.fname}
      </Text>
      <BouncyCheckbox
        size={15}
        fillColor="#86d957"
        iconStyle={{borderRadius: 0}}
        innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
        onPress={() => {
          setSelectedId(item?.myUser?.id);
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#05080D] p-4">
      {/* Navbar */}
      <View className="flex-row items-center justify-between">
        <View>
          <RoomHeader
            route={roomDetails?.data?.roomname}
            showConfirmation={true}
            setMakeCohostModal={setMakeCohostModal}
          />
        </View>

        <TouchableOpacity onPress={requestPermission}>
          <Image
            source={require('../../assets/images/Camera.png')}
            className="h-[25] w-[25]"
          />
        </TouchableOpacity>
      </View>

      <View className="mt-4 flex-1">
        <FlatList
          ListHeaderComponent={() => (
            <View className="mb-4">
              {/* Room Info */}
              <RoomInfoBox
                roomName={roomDetails?.data?.roomname}
                password={roomDetails?.data?.password}
              />
            </View>
          )}
          data={allUsers}
          renderItem={MemberList}
          numColumns={2}
          keyExtractor={item => item.id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={() => (
            <View className="flex-col m-2">
              <ActionButton
                style={{paddingHorizontal: 10}}
                disabled={startButtonDisabled}
                loading={loading}
                title="Start Game"
                onPress={handleStartGame}
              />
            </View>
          )}
        />
      </View>

      <Modal
        animationType="slide"
        visible={modal}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModal(false);
          }}>
          <View style={{backgroundColor: 'rgba(0,0,0,.3)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        <View className="bg-[#000000] h-[280px] w-[100%] rounded-[15px] border-2 border-t-[#86D957] border-opacity-80 p-4 items-center justify-center">
          <Text style={styles.ModalPlayerButton}>Player 1</Text>
          <Text style={styles.ModalPlayerButton}>Player 2</Text>
          <Text style={styles.ModalPlayerButton}>Player 3</Text>

          <TouchableOpacity
            className="items-center pt-5 w-[40%] self-end"
            onPress={() => navigation.navigate('MakeTeam')}>
            <LinearGradient
              colors={['#86D957', '#20341D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="rounded-[10px] p-4 w-[100%] items-center">
              <Text
                className="text-[15px] text-white font-extrabold"
                style={{fontFamily: 'Inter-Regular'}}>
                Save
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Remove user and make co-host popup */}
      <Modal aanimationType="slide" transparent={true} visible={backModal}>
        <TouchableWithoutFeedback onPress={() => setBackModal(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,.6)', flex: 1}}></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            marginHorizontal: 50,
            borderRadius: 10,
            backgroundColor: 'black',
            borderColor: '#A9F77F',
            borderWidth: 1,
            padding: 10,
            paddingBottom: 24
          }}>
          <ActionButton
            style={{paddingHorizontal: 30}}
            loading={loadingLeaveRoom}
            title="Remove player"
            onPress={handleLeaveRoom}
          />

          <ActionButton
            style={{paddingHorizontal: 30}}
            loading={loadingCoHost}
            title="Make-Co Host"
            onPress={handleCoHost}
          />
          
        </View>
        <TouchableWithoutFeedback onPress={() => setBackModal(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.5)'}}></View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* back button make co-host modal */}
      <Modal animationType="slide" transparent={true} visible={makeCoHostModal}>
        <TouchableWithoutFeedback onPress={() => setMakeCohostModal(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.5)'}}></View>
        </TouchableWithoutFeedback>
        <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-2">
          <Text
            className="text-[16px] text-[#a9f77f] p-2"
            style={{fontFamily: 'Poppins-Regular'}}>
            Make Co-host
          </Text>
          <View>
            <FlatList
              data={allUsers}
              renderItem={MemberListCoHost}
              numColumns={2}
              keyExtractor={item => item.id}
            />
          </View>

          <ActionButton
            style={{paddingHorizontal: 64}}
            loading={loadingCoHost}
            title="Save"
            onPress={handleBackCoHost}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreateTeam;

const styles = StyleSheet.create({
  ModalPlayerButton: {
    color: 'rgba(255,255,255,.8)',
    fontSize: 16,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,.5)',
    borderWidth: 1,
    marginVertical: 10,
  },
  LinearGradientButton: {
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    width: '100%',
  },
});
