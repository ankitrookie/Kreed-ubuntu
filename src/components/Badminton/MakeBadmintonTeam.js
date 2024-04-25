import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserDataAsync,
  selectRoom,
  selectRoomDetails,
} from '../../screens/RoomScreen/roomSlice';
import HostLivePlayroomChooseModal3 from '../HostLivePlayroomChooseModal3';
import RoomHeader from '../RoomHeader';
import usePermission from '../../hooks/usePermission';

const MakeBadmintonTeam = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const roomDetails = useSelector(selectRoomDetails);
  const { requestPermission } = usePermission();
  const user = useSelector(selectRoom);

  const allUsers = roomDetails?.data?.userRoom;
  const userIds = roomDetails?.data?.userRoom?.map(item => item.userId);

  const fetchData = () => {
    dispatch(getUserDataAsync(userIds));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const MemberList = ({item}) => {
    return (
      <TouchableOpacity style={{width: '50%', padding: 6}}>
        <LinearGradient
          colors={['#EFF30F', '#308400']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 6,
            borderRadius: 8,
          }}>
          <Image
            source={require('../../assets/images/MSD.jpg')}
            style={{width: 22, height: 22, borderRadius: 25}}
          />

          <Text className="text-[12px] ml-2 font-semibold text-[#1b1b1be0]">
            {item?.myUser?.fname}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#05080D] p-4">
      {/* Navbar */}
      <View className="flex-row items-center justify-between">
        <View>
          <RoomHeader route={user.data.roomname} showConfirmation={false} />
        </View>

        <TouchableOpacity onPress={requestPermission}>
          <Image
            source={require('../../assets/images/Camera.png')}
            className="h-[25] w-[25]"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-4">
        <FlatList
          data={allUsers}
          renderItem={MemberList}
          numColumns={2}
          keyExtractor={item => item.id}
          ListFooterComponent={() => (
            <HostLivePlayroomChooseModal3 modal={modal} setModal={setModal} />
          )}
        />
      </View>
    </View>
  );
};

export default MakeBadmintonTeam;
