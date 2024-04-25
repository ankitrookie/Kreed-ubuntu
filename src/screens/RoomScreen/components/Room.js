import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {useDispatch, useSelector} from 'react-redux';
import {
  createRoomAsync,
  joinRoomAsync,
  selectLoading,
  selectJoinLoading,
  selectRoom,
} from '../roomSlice';
import {useAuthStore} from '../../../store/useAuthStore';
import {
  ActionButton,
  AuthTextInput,
  Paragraph,
  SubContainer,
} from '../../../ui';
import themes from '../../../themes';

const Room = () => {
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const dispatch = useDispatch();
  const loadingCreateRoom = useSelector(selectLoading);
  const createRoom = useSelector(selectRoom);
  const loadingJoinRoom = useSelector(selectJoinLoading);
  const [option, setOption] = useState('Create');

  const [chooseGame, setChooseGame] = useState('Cricket');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  const [joinRoom, setJoinRoom] = useState('');
  const [joinPassword, setJoinPassword] = useState('');

  const handleCreateRoom = async () => {
    if (roomName === '' && password === '') {
      showMessage({
        message: 'Please fill in all the fields!',
        type: 'danger',
        floating: true,
      });
      return;
    }
    try {
      const response = await dispatch(
        createRoomAsync({
          roomname: roomName,
          password: password,
          sportType: chooseGame,
          myUserId: user.user.id,
        }),
      );
      console.log("room create", response);

      if (response.payload.status) {
        showMessage({
          message: 'Room created successfully!',
          type: 'success',
          floating: true,
        });
        navigation.navigate('CreateTeam');
        setRoomName('');
        setPassword('');
      } else if (response.payload.message === "Room name already in use") {
        showMessage({
          message: 'Room name already in use!',
          type: 'danger',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Failed to create Room! Try Again..',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Failed to create Room! Try Again..',
        type: 'danger',
        floating: true,
      });
    }
  };

  const handleJoinRoom = async () => {
    if (joinRoom === '' && joinPassword === '') {
      showMessage({
        message: 'Please fill the valid joining credentials!',
        type: 'info',
        floating: true,
      });
      return;
    }

    try {
      const response = await dispatch(
        joinRoomAsync({
          roomname: joinRoom,
          password: joinPassword,
          userId: user.user.id,
        }),
      );
      if (response.payload.status) {
        showMessage({
          message: 'Successfully joined the room!',
          type: 'success',
          floating: true,
        });

        // Check if the current user is the creator
        const isCreator = response.payload.data.ownerId === user.user.id;

        // Redirect to the appropriate screen based on the user's role
        if (isCreator) {
          navigation.reset({
            index: 0,
            routes: [{name: 'CreateTeam'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'JoinTeam'}],
          });
        }
        setJoinRoom('');
        setJoinPassword('');
      } else {
        showMessage({
          message: 'Room not found or invalid credentials!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error joining room:',
        type: 'danger',
        floating: true,
      });
    }
  };

  return (
    <SubContainer style={{padding: 30}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={styles.joinCreateButton}
          onPress={() => setOption('Create')}>
          <Text
            className="text-[#fff] text-[24px] font-medium"
            style={{fontFamily: 'Poppins-Regular'}}>
            Create
          </Text>
          {option == 'Create' ? (
            <LinearGradient
              colors={['#308400', '#EFF30F']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.LinearGradientJoinCreateLine}></LinearGradient>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinCreateButton}
          onPress={() => setOption('Join')}>
          <Text
            className="text-[#fff] text-[24px] font-medium"
            style={{fontFamily: 'Poppins-Regular'}}>
            Join
          </Text>
          {option == 'Join' ? (
            <LinearGradient
              colors={['#308400', '#EFF30F']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.LinearGradientJoinCreateLine}></LinearGradient>
          ) : null}
        </TouchableOpacity>
      </View>

      {option === 'Create' ? (
        <View>
          <AuthTextInput
            placeHolderText="Room Name"
            isPassword={false}
            value={roomName}
            onChangeText={text => setRoomName(text)}
            customBorderRadius={10}
          />

          <AuthTextInput
            placeHolderText="Room Password"
            isPassword={false}
            onChangeText={text => setPassword(text)}
            value={password}
            customBorderRadius={10}
          />

          <View className="flex-row mt-5">
            <Paragraph textColor={themes.lightText}>Choose Sport</Paragraph>
          </View>

          <View className="flex-row mt-5 items-center">
            <TouchableOpacity
              onPress={() => setChooseGame('Cricket')}
              className={`${
                chooseGame === 'Cricket'
                  ? 'bg-[#86D957]'
                  : 'border border-[#86D957]'
              } p-2 rounded-lg`}>
              <Text
                className="text-[14px] text-[#fff]"
                style={{fontFamily: 'Poppins-Regular'}}>
                Cricket
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChooseGame('Badminton')}
              className={`${
                chooseGame === 'Badminton'
                  ? 'bg-[#86D957]'
                  : 'border border-[#86D957]'
              } p-2 rounded-lg ml-5`}>
              <Text
                className="text-[14px] text-[#fff]"
                style={{fontFamily: 'Poppins-Regular'}}>
                Badminton
              </Text>
            </TouchableOpacity>
          </View>

          <ActionButton
            style={{paddingHorizontal: 5}}
            loading={loadingCreateRoom}
            title="Create Room"
            onPress={handleCreateRoom}
          />
        </View>
      ) : null}

      {option === 'Join' ? (
        <View>
          <AuthTextInput
            placeHolderText="Room Name"
            isPassword={false}
            onChangeText={text => setJoinRoom(text)}
            value={joinRoom}
            customBorderRadius={10}
          />

          <AuthTextInput
            placeHolderText="Room Password"
            isPassword={false}
            onChangeText={text => setJoinPassword(text)}
            value={joinPassword}
            customBorderRadius={10}
          />

          <ActionButton
            style={{paddingHorizontal: 10}}
            loading={loadingJoinRoom}
            title="Join Room"
            onPress={handleJoinRoom}
          />
        </View>
      ) : null}
    </SubContainer>
  );
};

export default Room;

const styles = StyleSheet.create({
  joinCreateButtonText: {
    color: 'white',
    fontSize: 24,
  },
  joinCreateButton: {
    alignItems: 'center',
  },
  TextInputBox: {
    backgroundColor: 'rgba(255, 244, 244, 0.20)',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  LoginButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    width: '85%',
    borderRadius: 20,
    marginTop: 55,
    alignSelf: 'center',
  },
  LinearGradientButton: {
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  LinearGradientJoinCreateLine: {
    height: 8,
    width: 80,
    borderRadius: 10,
  },
});
