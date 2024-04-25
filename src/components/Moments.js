import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Video from 'react-native-video';

import { VESDK } from 'react-native-videoeditorsdk';

// icons
import { PencilIcon, VideoCameraIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { getMomentsAsync, selectGetMoments } from './Cricket/cricketSlice';

const Moments = ({setSelectedMomentsForPost, handlePubish}) => {
  const dispatch = useDispatch();
  const selectMoments = useSelector(selectGetMoments);
  console.log('all moments', selectMoments?.data[0]);
  const screenWidth = Dimensions.get('window').width;
  const roomId = useSelector(selectRoom);
  const [editedVideos, setEditedVideos] = useState({});

  useEffect(() => {
    dispatch(getMomentsAsync({roomId: roomId?.data?.id}));
  }, [dispatch]);

  const handleEdit = async (videoURL, id) => {
    try {
      const remoteURL = videoURL;
      console.log('remoteURL', remoteURL);
      const result = await VESDK.openEditor(remoteURL);

      if (result != null) {
        console.log('edited', result?.video);
        setEditedVideos(prevState => ({
          ...prevState,
          [id]: result?.video,
        }));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{width: '50%'}}>
        {item?.roomMomPic.map(pic => (
          <View key={pic.id}>
            {pic.image.endsWith('.mp4') ? (
              <View>
                {editedVideos[pic.id] ? (
                  <Video
                    source={{uri: editedVideos[pic.id]}}
                    style={{flex: 1, width: '100%', aspectRatio: 1}}
                    resizeMode="cover"
                    isLooping
                    paused={false}
                    repeat={false}
                  />
                ) : (
                  <Video
                    source={{uri: pic.image}}
                    style={{flex: 1, width: '100%', aspectRatio: 1}}
                    resizeMode="cover"
                    isLooping
                    paused={false}
                    repeat={true}
                  />
                )}
                <View style={{position: 'absolute', left: 5, top: 5}}>
                  <BouncyCheckbox
                    size={15}
                    fillColor="#86d957"
                    iconStyle={{borderRadius: 0}}
                    innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
                    onPress={isChecked => {
                      if (isChecked) {
                        setSelectedMomentsForPost(prevSelectedGames => [
                          ...prevSelectedGames,
                          editedVideos[pic.id]
                            ? editedVideos[pic.id]
                            : pic.image,
                        ]);
                      } else {
                        setSelectedMomentsForPost(prevSelectedGames =>
                          prevSelectedGames.filter(
                            selectedItem =>
                              selectedItem !==
                              (editedVideos[pic.id]
                                ? editedVideos[pic.id]
                                : pic.image),
                          ),
                        );
                      }
                    }}
                  />
                </View>
                <View style={{position: 'absolute', right: 5, top: 5}}>
                  <TouchableOpacity
                    className="flex-row justify-center items-center space-x-1 px-1 rounded-sm bg-[#FFFFFF]"
                    onPress={() => handleEdit(pic.image, pic.id)}>
                    <PencilIcon size={12} color="#000000" />
                    <Text
                      className="text-[#000000] text-[12px]"
                      style={{fontFamily: 'Poppins-Regular'}}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
                <VideoCameraIcon
                  size={24}
                  color="white"
                  style={{position: 'absolute', left: 5, bottom: 5}}
                />
              </View>
            ) : (
              <View>
                <Image
                  source={{uri: pic.image}}
                  style={{width: '100%', aspectRatio: 1}}
                  resizeMode="cover"
                />
                <View style={{position: 'absolute', left: 5, top: 5}}>
                  <BouncyCheckbox
                    size={15}
                    fillColor="#86d957"
                    iconStyle={{borderRadius: 0}}
                    innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
                    onPress={isChecked => {
                      if (isChecked) {
                        setSelectedMomentsForPost(prevSelectedGames => [
                          ...prevSelectedGames,
                          pic.image,
                        ]);
                      } else {
                        setSelectedMomentsForPost(prevSelectedGames =>
                          prevSelectedGames.filter(
                            selectedItem => selectedItem !== pic.image,
                          ),
                        );
                      }
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <FlatList
        data={selectMoments?.data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => String(item.id)}
      />

      <TouchableOpacity
        onPress={handlePubish}
        className="flex-row top-3 justify-end">
        <LinearGradient
          colors={['#20341D', '#86D957']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="text-white items-center py-3 rounded-2xl w-[35%]">
          <Text className="text-slate-50 text-[18px] font-bold">Publish</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Moments;
