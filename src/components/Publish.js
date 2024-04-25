import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { VideoCameraIcon, XMarkIcon } from 'react-native-heroicons/outline';

// video
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthStore } from '../store/useAuthStore';
import themes from '../themes';
import { Column, Container, ShadowBox } from '../ui';
import {
  postPublishAsync,
  selectPostPublishloading,
} from './Cricket/cricketSlice';

const Publish = ({
  selectedGameForPost,
  selectedMomentsForPost,
  setSelectedGameForPost,
  setSelectedMomentsForPost,
  navigation,
}) => {
  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  const user = useAuthStore(state => state.user);
  const loading = useSelector(selectPostPublishloading);
  const gameIds = selectedGameForPost.map(item => item.gameId);
  const [caption, setCaption] = useState('');

  const [imagesVideos, setImagesVideos] = useState([]);
  const [videosEdited, setVideosEdited] = useState([]);

  // this function is for saperting out edited videos, noraml https urls, and normal image urls
  const updateImagesAndVideos = selectedMomentsForPost => {
    const updatedImagesandVideos = [];
    const editedVideos = [];

    for (const moment of selectedMomentsForPost) {
      if (moment.startsWith('file://')) {
        if (moment.endsWith('.mp4')) {
          editedVideos.push(moment);
        }
      } else {
        if (
          moment.endsWith('.jpg') ||
          moment.endsWith('.jpeg') ||
          moment.endsWith('.png') ||
          moment.endsWith('.mp4') ||
          moment.includes('video.mp4')
        ) {
          updatedImagesandVideos.push(moment);
        }
      }
    }
    setImagesVideos(prevImages => [...prevImages, ...updatedImagesandVideos]);
    setVideosEdited(prevEditedVideos => [...prevEditedVideos, ...editedVideos]);
  };

  useEffect(() => {
    updateImagesAndVideos(selectedMomentsForPost);
  }, [selectedMomentsForPost]);

  const handlePublish = async () => {
    const imageVieosUrl = imagesVideos.map(item => item);

    const postData = {
      GameIds: gameIds,
      userId: user.user.id,
      caption: caption,
      imageAndVideos: imageVieosUrl,
      videosEdited: videosEdited,
    };

    // console.log('handle publish', postData);

    try {
      const response = await dispatch(postPublishAsync({postData}));
      console.log('respone of post created', response);
      if (response?.payload?.status) {
        navigation.navigate('BottomTab', {screen: 'Home'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMoment = index => {
    const updatedMoments = [...selectedMomentsForPost];
    updatedMoments.splice(index, 1);
    setSelectedMomentsForPost(updatedMoments);
  };

  const handleDeleteGames = index => {
    const updatedGames = [...selectedGameForPost];
    updatedGames.splice(index, 1);
    setSelectedGameForPost(updatedGames);
  };

  return (
    <Container
      style={{
        paddingTop: 20,
        borderTopColor: themes.lightGreen,
        borderTopWidth: 1,
        borderRadius: 10,
      }}>
      <ScrollView nestedScrollEnabled={true}>
        {/* // score card preview */}
        <Column>
          <View style={{marginBottom: 24}}>
            {selectedGameForPost.map((item, index) => {
              const profileImage1 = item?.scores[0]?.players[0]?.user?.profile;
              const profileImage2 = item?.scores[0]?.players[1]?.user?.profile;
              const profileImage3 = item?.scores[1]?.players[0]?.user?.profile;
              const profileImage4 = item?.scores[1]?.players[1]?.user?.profile;
              const noProfile = require('../assets/images/noProfile.png');

              return (
                <View className="flex-row justify-between" key={item?.gameId}>
                  <ShadowBox style={{width: width * 0.8}}>
                    <View className="flex-col items-center">
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={styles.img}
                          source={
                            profileImage1 ? {uri: profileImage1} : noProfile
                          }
                        />
                        {item?.scores[0]?.players[1] && (
                          <Image
                            style={styles.img}
                            source={
                              profileImage2 ? {uri: profileImage2} : noProfile
                            }
                          />
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: 100,
                      }}>
                      <Text style={{color: 'white'}}>
                        {item?.scores[0]?.scores[0].score}
                      </Text>
                      <Text className="text-[#86D957] font-bold">vs</Text>
                      <Text style={{color: 'white'}}>
                        {item?.scores[1]?.scores[0]?.score}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={styles.img}
                          source={
                            profileImage3 ? {uri: profileImage3} : noProfile
                          }
                        />
                        {item?.scores[1]?.players[1] && (
                          <Image
                            style={styles.img}
                            source={
                              profileImage4 ? {uri: profileImage4} : noProfile
                            }
                          />
                        )}
                      </View>
                    </View>
                  </ShadowBox>
                  <TouchableOpacity
                    onPress={() => handleDeleteGames(index)}
                    className="justify-center items-center">
                    <XMarkIcon color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </Column>

        {/* // choosen images and videos */}
        <Column>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {selectedMomentsForPost.map((item, index) => (
              <View key={item} style={{width: '50%', aspectRatio: 1}}>
                {item.endsWith('.mp4') ? (
                  <View style={{flex: 1}}>
                    <Video
                      source={{uri: item}}
                      style={{flex: 1}}
                      resizeMode="cover"
                      isLooping
                      paused={false}
                      repeat={true}
                    />
                    <View style={{position: 'absolute', right: 5, top: 5}}>
                      <TouchableOpacity
                        className="flex-row justify-center items-center space-x-1 px-1 rounded-sm bg-[#FFFFFF]"
                        onPress={() => {}}>
                        <XMarkIcon color="black" size={20} />
                      </TouchableOpacity>
                    </View>
                    <VideoCameraIcon
                      size={24}
                      color="white"
                      style={{position: 'absolute', left: 5, bottom: 5}}
                    />
                  </View>
                ) : (
                  <View style={{flex: 1}}>
                    <Image
                      source={{uri: item}}
                      style={{flex: 1}}
                      resizeMode="cover"
                    />
                    <View style={{position: 'absolute', right: 5, top: 5}}>
                      <TouchableOpacity
                        className="flex-row justify-center items-center space-x-1 px-1 rounded-sm bg-[#FFFFFF]"
                        onPress={() => handleDeleteMoment(index)}>
                        <XMarkIcon color="black" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </Column>

        <Column
          style={{
            marginTop: 24,
          }}>
          <TextInput
            placeholder="Add Captions..."
            placeholderTextColor="#99989879"
            onChangeText={text => setCaption(text)}
            value={caption}
            textAlignVertical="top"
            numberOfLines={4}
            className="bg-[#22222280] border-2 border-[#99989879] rounded-lg text-white px-4"
          />
          <TouchableOpacity
            onPress={handlePublish}
            className="flex-row py-4 justify-end">
            <LinearGradient
              colors={['#20341D', '#86D957']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="text-white items-center py-3 rounded-2xl w-[35%]">
              {loading ? (
                <ActivityIndicator color="#fff" size={30} />
              ) : (
                <Text className="text-slate-50 text-[18px] font-bold">
                  Publish
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Column>
      </ScrollView>
    </Container>
  );
};

export default Publish;

const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 16,
  },
  table: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'green',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 3,
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  LinearGradientJoinCreateLine: {
    height: 6,
    width: 100,
  },
  img: {
    width: 32,
    height: 32,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'yellow',
    marginHorizontal: 2,
  },
});
