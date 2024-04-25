import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Share from 'react-native-share';
import {HistoryData, data} from '../../constants';

import {
  Bars3BottomRightIcon,
  BookmarkSlashIcon,
  CameraIcon,
  Cog6ToothIcon,
  PhotoIcon,
  ShareIcon,
} from 'react-native-heroicons/outline';
import {
  BadmintonStates,
  CricketStates,
  PostComponent,
  RoomHeader,
} from '../../components';

import {showMessage} from 'react-native-flash-message';
import * as ImagePicker from 'react-native-image-picker';
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Modals from '../../Modals';
import {useAuthStore} from '../../store/useAuthStore';
import {Column, Container, Row} from '../../ui';
import {
  selectProfileUpdate,
  uploadBannerAsync,
  uploadProfileAsync,
} from './profileSlice';
import {
  getUserPostAsync,
  selectUserPost,
  selectUserPostLoading,
} from '../authScreens/authSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import themes from '../../themes';

const Profile = () => {
  const dispatch = useDispatch();
  const setUser = useAuthStore(state => state.setUser);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const user = useAuthStore(state => state.user);
  const [stateType, setStateType] = useState('badminton');
  const [cameraPress, setCameraPress] = useState('');
  const loading = useSelector(selectProfileUpdate);
  const userPostLoading = useSelector(selectUserPostLoading);
  const userPost = useSelector(selectUserPost);
  const navigation = useNavigation();
  const [modalVisible2, setVisible2] = useState(false);
  const [modalVisible3, setVisible3] = useState(false);
  const [modalVisible4, setVisible4] = useState(false);
  const [stats, setCreate] = useState(false);
  const [history, setHistory] = useState(false);
  const [post, setPost] = useState(true);

  const handleShare = async () => {
    const shareOption = {
      message: 'Sharing profile',
    };
    try {
      await Share.open(shareOption);
    } catch (error) {
      console.log(error, 'This is err');
    }
  };

  const clickImageCameraProfile = useCallback(async () => {
    let option = {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await ImagePicker.launchCamera(option);

      try {
        const userProfileUpdate = {
          id: user?.user?.id,
          result: result,
        };
        const response = await dispatch(
          uploadProfileAsync({userProfileUpdate}),
        );
        console.log('response of updated profile', response?.payload?.data);

        if (response.payload.status) {
          setUser({
            user: response?.payload?.data,
          });
          setVisible3(false);
        }
      } catch (error) {
        console.log('Error updating profile:', error.message);
      }
    } else {
      showMessage({
        message: 'Not able to open Camera. Try Again!',
        type: 'danger',
        floating: true,
      });
    }
  }, []);

  const selectImageFromGalleryProfile = useCallback(async () => {
    let options = {
      title: 'Select Image',
      type: 'library',
      options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    const result = await ImagePicker.launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      try {
        const userProfileUpdate = {
          id: user?.user?.id,
          result: result,
        };
        const response = await dispatch(
          uploadProfileAsync({userProfileUpdate}),
        );
        console.log('response of updated profile', response?.payload?.data);

        if (response.payload.status) {
          setUser({
            user: response?.payload?.data,
          });
          setVisible3(false);
        }
      } catch (error) {
        console.log('Error updating profile:', error.message);
      }
    }
  }, []);

  const clickImageCameraBanner = useCallback(async () => {
    let option = {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await ImagePicker.launchCamera(option);

      try {
        const userProfileUpdate = {
          id: user?.user?.id,
          result: result,
        };
        const response = await dispatch(uploadBannerAsync({userProfileUpdate}));
        console.log('response of updated banner', response?.payload?.data);

        if (response.payload.status) {
          setUser({
            user: response?.payload?.data,
          });
          setVisible4(false);
        }
      } catch (error) {
        console.log('Error updating profile:', error.message);
      }
    } else {
      showMessage({
        message: 'Not able to open Camera. Try Again!',
        type: 'danger',
        floating: true,
      });
    }
  }, []);

  const selectImageFromGalleryBanner = useCallback(async () => {
    let options = {
      title: 'Select Image',
      type: 'library',
      options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    const result = await ImagePicker.launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      try {
        const userProfileUpdate = {
          id: user?.user?.id,
          result: result,
        };

        const response = await dispatch(uploadBannerAsync({userProfileUpdate}));
        console.log('response of updated banner', response?.payload?.data);

        if (response.payload.status) {
          setUser({
            user: response?.payload?.data,
          });
          setVisible4(false);
        }
      } catch (error) {
        console.log('Error updating profile:', error.message);
      }
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setUser({
        user: {},
      });
      setIsLoggedIn(false);
    } catch (error) {
      showMessage({
        message: 'failed to log out!',
        type: 'danger',
        floating: true,
      });
    }
  }, [navigation]);

  const modalContent1 = [
    {
      label: 'Saved',
      icon: <Cog6ToothIcon name="save" color="white" size={25} />,
      onPress: () => {},
    },
    {
      label: 'Invite Friends',
      icon: <ShareIcon name="report" color="white" size={25} />,
      onPress: () => {},
    },
    {
      label: 'Logout',
      icon: <MaterialCommunity name="logout" size={25} color="white" />,
      onPress: handleLogout,
    },
  ];

  const modalContent2 = [
    {
      label: 'Take Photo',
      icon: <CameraIcon color="white" size={25} />,
      onPress: clickImageCameraProfile,
    },
    {
      label: 'Select Photo',
      icon: <PhotoIcon color="white" size={25} />,
      onPress: selectImageFromGalleryProfile,
    },
  ];

  const modalContent3 = [
    {
      label: 'Take Photo For Banner',
      icon: <CameraIcon color="white" size={25} />,
      onPress: clickImageCameraBanner,
    },
    {
      label: 'Select Photo For Banner',
      icon: <PhotoIcon color="white" size={25} />,
      onPress: selectImageFromGalleryBanner,
    },
  ];

  useEffect(() => {
    dispatch(getUserPostAsync({userId: user.user.id}));
  }, []);

  return (
    // Navbar
    <View className="flex-1 bg-[#05080d]">
      <Row style={{padding: 24}}>
        <RoomHeader route="Ankit" />
        <View className="flex-row justify-center items-center space-x-5">
          <TouchableOpacity onPress={() => setVisible2(true)}>
            <Bars3BottomRightIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Row>

      <ScrollView>
        <View className="flex-1 w-full">
          {user?.user?.coverPicture ? (
            <Image
              style={{position: 'absolute', width: '100%', height: 170}}
              source={{uri: user?.user?.coverPicture}}
            />
          ) : (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: 170,
                backgroundColor: '#191919',
              }}
            />
          )}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="absolute right-4 top-4 bg-[#ffffffc5]  rounded-full p-2"
              onPress={() => {
                setVisible4(true);
              }}>
              <CameraIcon size={20} color="#000" />
            </TouchableOpacity>

            <View className="mt-[25%] items-center p-2">
              <Image
                style={{
                  borderColor: '#86d957',
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 2,
                }}
                source={{uri: user?.user?.profile}}
              />
              <TouchableOpacity
                className="absolute left-20 bg-[#ffffffc5] top-[5%] p-[3px] rounded-full"
                onPress={() => {
                  setVisible3(true);
                }}>
                <CameraIcon size={18} color="#000" />
              </TouchableOpacity>

              <Text
                style={{fontFamily: 'Livvic-Regular'}}
                className="text-[#fff] text-[18px] font-medium leading-normal">
                {user?.user?.fname}
              </Text>
            </View>

            <TouchableOpacity className="mt-40 items-center p-4">
              <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                <Text style={{color: 'white', fontFamily: 'Inter-Regular'}}>
                  {user?.user?.posts}
                </Text>
              </View>
              <Text
                style={{fontFamily: 'Overlock-Regular'}}
                className="text-[#fff] text-[15px] leading-6 font-normal">
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-40 items-center p-4"
              onPress={() =>
                navigation.navigate('FollowersFollowing', {
                  Followers: 'Followers',
                })
              }>
              <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                <Text style={{color: 'white', fontFamily: 'Inter-Regular'}}>
                  {user?.user?.followers}
                </Text>
              </View>
              <Text
                style={{fontFamily: 'Overlock-Regular'}}
                className="text-[#fff] text-[15px] leading-6 font-normal">
                Followers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-40 items-center p-4"
              onPress={() =>
                navigation.navigate('FollowersFollowing', {
                  Following: 'Following',
                })
              }>
              <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                <Text style={{color: 'white', fontFamily: 'Inter-Regular'}}>
                  {user?.user?.following}
                </Text>
              </View>
              <Text
                style={{fontFamily: 'Overlock-Regular'}}
                className="text-[#fff] text-[15px] leading-6 font-normal">
                Following
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Container>
            <View>
              <Text
                style={{fontFamily: 'Livvic-Regular'}}
                className="text-[#fff] leading-5 text-[15px] font-normal">
                {user?.user?.bio == ''
                  ? ' Bio not available.'
                  : user?.user?.bio}
              </Text>
            </View>

            {/* Edit Profile & Share Profile */}
            <Column
              style={{
                marginTop: 24,
              }}>
              <View className="flex-row space-x-4">
                <View className="border border-[#86D957] p-2 rounded-lg">
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    className="items-center justify-center flex">
                    <Text
                      style={{fontFamily: 'livvic-Regular'}}
                      className="text-[#fff] font-normal leading-normal">
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="border border-[#86D957] p-2 rounded-lg">
                  <TouchableOpacity onPress={handleShare}>
                    <Text
                      style={{fontFamily: 'livvic-Regular'}}
                      className="text-[#fff] font-normal leading-normal">
                      Share Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Column>

            {/* middle line through  start*/}
            <View className="border-b border-[#FFFFFF1A] pt-2"></View>
            {/* middle line through  end*/}

            <Column
              style={{
                marginTop: 24,
              }}>
              <View className="flex-row justify-between items-center">
                <View className="items-center">
                  <TouchableOpacity
                    onPress={() => {
                      setPost(true);
                      setHistory(false);
                      setCreate(false);
                    }}>
                    <Text
                      className="text-white text-[18px] leading-5"
                      style={{fontFamily: 'Inter-Regular'}}>
                      Post
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={post ? ['#D8E60E', '#4C9402'] : ['black', 'black']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="h-1 rounded-sm w-[59px]"></LinearGradient>
                </View>

                <View className="items-center">
                  <TouchableOpacity
                    onPress={() => {
                      {
                        setCreate(true);
                        setHistory(false);
                        setPost(false);
                      }
                    }}>
                    <Text
                      className="text-white text-[18px] leading-5"
                      style={{fontFamily: 'Inter-Regular'}}>
                      Stats
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={stats ? ['#D8E60E', '#4C9402'] : ['black', 'black']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="h-1 rounded-sm w-[65px]"></LinearGradient>
                </View>

                <View className="px-4 items-center">
                  <TouchableOpacity
                    onPress={() => {
                      {
                        setHistory(true);
                        setCreate(false);
                        setPost(false);
                      }
                    }}>
                    <Text
                      className="text-white text-[18px] leading-5"
                      style={{fontFamily: 'Inter-Regular'}}>
                      History
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={
                      history ? ['#D8E60E', '#4C9402'] : ['black', 'black']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="h-1 rounded-sm w-[80px]"></LinearGradient>
                </View>
              </View>
            </Column>
          </Container>

          {/* My own profile Post */}
          {post && (
            <Container>
              {userPostLoading ? (
                <SafeAreaView style={{flex: 1, marginVertical: 50}}>
                  <ActivityIndicator size="large" color="#86D957" />
                </SafeAreaView>
              ) : userPost?.data && userPost.data.length === 0 ? (
                <SafeAreaView style={{flex: 1, marginVertical: 50}}>
                  <View className="flex-1 flex-col justify-center items-center space-y-4">
                    <BookmarkSlashIcon color={themes.lightGreen} size={40} />
                    <Text className="text-white">
                      There is no Post to show right now
                    </Text>
                    <Text className="text-[#86D957] text-[20px]">
                      Create one to engage people
                    </Text>
                  </View>
                </SafeAreaView>
              ) : (
                <FlatList
                  data={userPost?.data}
                  nestedScrollEnabled={true}
                  renderItem={({item}) => {
                    return <PostComponent item={item} />;
                  }}
                  keyExtractor={item => item.id}
                />
              )}
            </Container>
          )}

          {/* This are my own profile history */}
          {history && (
            <Container>
              {/* profile History, it basically has different UI so that why we can use same data to display but make entire new UI to display */}
              <FlatList
                data={HistoryData}
                renderItem={({item}) => (
                  <View className="flex-row space-x-4 bg-[#FFFFFF0F] p-2 m-2 rounded-lg">
                    <TouchableOpacity>
                      <Image
                        style={{width: 50, height: 50, borderRadius: 25}}
                        source={require('../../assets/images/profile.png')}
                      />
                    </TouchableOpacity>
                    <View className="flex-row items-center justify-between">
                      <View className="w-[271px]">
                        <Text
                          style={{fontFamily: 'Inter-Regular'}}
                          className="text-[#fff] text-[15px] leading-normal">
                          Priti mondal has played with Piku Mondal and 3 others.
                        </Text>
                        <Text
                          className="text-[#86D957] text-[12px] mt-2"
                          style={{fontFamily: 'Poppins-Regular'}}>
                          14.04.2023
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </Container>
          )}

          {/* This components is incomplete */}
          {stats && (
            <Container>
              <Row style={{paddingTop: 24}}>
                <TouchableOpacity
                  onPress={() => setStateType('badminton')}
                  className="w-[50%]">
                  <LinearGradient
                    colors={
                      stateType === 'badminton'
                        ? ['#265F06', '#000000']
                        : ['#FFFEFE33', '#FFFEFE33']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="items-center p-2 rounded-l-3xl">
                    <Text className="text-white font-bold text-[18px]">
                      Badminton
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setStateType('cricket')}
                  className="w-[50%]">
                  <LinearGradient
                    colors={
                      stateType === 'cricket'
                        ? ['#265F06', '#000000']
                        : ['#FFFEFE33', '#FFFEFE33']
                    }
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    className="items-center p-2 rounded-r-3xl">
                    <Text className="text-white font-bold text-[18px]">
                      Cricket
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Row>
              {stateType === 'cricket' ? (
                <CricketStates />
              ) : (
                <BadmintonStates />
              )}
            </Container>
          )}
        </View>
      </ScrollView>

      <Modals
        visible={modalVisible2}
        onRequestClose={() => setVisible2(false)}
        content={modalContent1}
      />

      <Modals
        visible={modalVisible4}
        onRequestClose={() => setVisible4(false)}
        content={modalContent3}
      />

      <Modals
        visible={modalVisible3}
        onRequestClose={() => setVisible3(false)}
        content={modalContent2}
      />
    </View>
  );
};

export default Profile;
