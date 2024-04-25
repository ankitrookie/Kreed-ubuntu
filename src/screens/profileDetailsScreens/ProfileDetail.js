import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {showMessage} from 'react-native-flash-message';
import {
  CameraIcon,
  ChevronDoubleDownIcon,
} from 'react-native-heroicons/outline';
import * as ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthStore} from '../../store/useAuthStore';
import themes from '../../themes';
import {AuthTextInput, Paragraph} from '../../ui';
import {
  selectId,
  selectUpdateUserLoading,
  updateUserAsync,
} from '../authScreens/authSlice';

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const storedId = useSelector(selectId);
  const setUser = useAuthStore(state => state.setUser);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const loading = useSelector(selectUpdateUserLoading);
  const [image, setImage] = useState('');
  console.log('Images', image);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [value, setValue] = useState({
    gripValue: null,
    addPlayingBadminton: null,
    addPlayingcricket: null,
    bowlingStyle: null,
    battingStyle: null,
  });
  const [isFocus, setIsFocus] = useState(false);
  const [stateType, setStateType] = useState('badminton');

  const GripData = [
    {label: 'Right Hand', value: 'Right Hand'},
    {label: 'Left Hand', value: 'Left Hand'},
  ];

  const LevelData = [
    {label: 'Beginner', value: 'Beginner'},
    {label: 'Intermediate', value: 'Intermediate'},
    {label: 'Advance', value: 'Advance'},
    {label: 'Expert', value: 'Expert'},
  ];

  const selectImageFromGallery = useCallback(async () => {
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
      setImage(result);
    }
  }, []);

  const handleStartButton = async () => {
    let updateUserData = {
      storedId: storedId,
      username: username,
      bio: bio,
      grip: value.gripValue,
      profile: image,
      addPlayingBadminton: value.addPlayingBadminton,
      addPlayingcricket: value.addPlayingcricket,
      bowlingStyle: value.bowlingStyle,
      battingStyle: value.battingStyle,
    };

    try {
      const response = await dispatch(updateUserAsync({updateUserData}));
      if (response.payload.status) {
        showMessage({
          message: 'Profile Created successfully',
          type: 'success',
          floating: true,
        });
        setUser({
          user: response.payload.data,
        });
        setIsLoggedIn(true);
        setUsername('');
        setBio('');
        setImage('');
        setValue({
          gripValue: null,
          addPlayingBadminton: null,
          addPlayingcricket: null,
          bowlingStyle: null,
          battingStyle: null,
        });
      } else if (response.payload.message === 'Username already in use') {
        showMessage({
          message: 'Username already in use',
          type: 'danger',
          floating: true,
        });
      } else if (!response.payload.success) {
        showMessage({
          message: 'Profile update failed! User not found.',
          type: 'danger',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Profile update failed! Please try again.',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
    }

    // try {

    // } catch (error) {
    //   showMessage({
    //     message: 'Profile update failed! Please try again.',
    //     type: 'danger',
    //     floating: true,
    //   });
    // }
  };

  return (
    <ScrollView className="flex-1 bg-[#05080d] p-4">
      <View className="flex-col items-center justify-center">
        <Text
          className="text-white text-[16px] text-center"
          style={{fontFamily: 'Poppins-Regular'}}>
          Almost there ! Let’s shape our sporting profile together
        </Text>
      </View>
      <View className="flex-row justify-center items-center mt-5">
        <TouchableOpacity onPress={selectImageFromGallery}>
          {image ? (
            <Image
              source={{uri: image.assets[0].uri}}
              className="rounded-full w-[80] h-[80]"
              resizeMode="cover"
            />
          ) : (
            <View className="bg-[#D9D9D9] w-[80] h-[80] rounded-full items-center justify-center">
              <CameraIcon size={25} color={'#000'} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Username input */}
      <View>
        <Text
          className="text-[#fff] text-[13px] p-1"
          style={{fontFamily: 'Poppins-Regular'}}>
          Username
        </Text>
        <AuthTextInput
          isPassword={false}
          value={username}
          onChangeText={setUsername}
          customBorderRadius={10}
          marginTop={2}
        />
      </View>

      {/* Bio input */}
      <View>
        <Paragraph textColor={themes.lightText} style={{padding: 4}}>
          Bio
        </Paragraph>
        <AuthTextInput
          placeHolderText="Let's kick off your sports bio! Tell us about your journey in the world of sports. 250 characters"
          isPassword={false}
          value={bio}
          onChangeText={setBio}
          customBorderRadius={10}
          marginTop={2}
          bioText={true}
        />
      </View>

      <View className="flex-row justify-between items-center p-4">
        <View>
          <TouchableOpacity onPress={() => setStateType('badminton')}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                padding: 4,
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 3,
              }}>
              Badminton
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: 100,
              height: 5,
              backgroundColor:
                stateType == 'badminton' ? '#86D957' : 'transparent',
              borderRadius: 5,
            }}></View>
        </View>

        <View>
          <TouchableOpacity onPress={() => setStateType('cricket')}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                padding: 4,
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 3,
                paddingHorizontal: 3,
              }}>
              Cricket
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: 100,
              height: 5,
              backgroundColor:
                stateType == 'cricket' ? '#86D957' : 'transparent',
              borderRadius: 5,
            }}></View>
        </View>
      </View>

      {stateType === 'badminton' ? (
        <View className="flex-1">
          <Paragraph textColor={themes.lightText} style={{padding: 4}}>
            Grip
          </Paragraph>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            activeColor="#86D957"
            itemTextStyle={{color: '#ffff'}}
            containerStyle={{
              backgroundColor: '#000000E5',
              width: '40%',
              alignSelf: 'flex-end',
            }}
            data={GripData}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '' : ''}
            value={value.gripValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue({...value, gripValue: item.value});
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <ChevronDoubleDownIcon
                style={styles.icon}
                color={isFocus ? '#ffffff' : '#fff'}
                size={20}
              />
            )}
          />

          <View className="flex-1 mt-2">
            <Text
              className="text-[#fff] text-[13px] p-1"
              style={{fontFamily: 'Poppins-Regular'}}>
              Add Playing Level
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{color: '#ffff', textAlign: 'center'}}
              containerStyle={{
                backgroundColor: '#000000E5',
                width: '40%',
                alignSelf: 'flex-end',
              }}
              data={LevelData}
              activeColor="#86D957"
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? '' : ''}
              value={value.addPlayingBadminton}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue({...value, addPlayingBadminton: item.value});
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <ChevronDoubleDownIcon
                  style={styles.icon}
                  color={isFocus ? '#ffffff' : '#fff'}
                  size={20}
                />
              )}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1">
          <Text
            className="text-[#fff] text-[13px] p-1"
            style={{fontFamily: 'Poppins-Regular'}}>
            Batting Hand
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            activeColor="#86D957"
            itemTextStyle={{color: '#ffff'}}
            containerStyle={{
              backgroundColor: '#000000E5',
              width: '40%',
              alignSelf: 'flex-end',
            }}
            data={GripData}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? '' : ''}
            value={value.battingStyle}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue({...value, battingStyle: item.value});
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <ChevronDoubleDownIcon
                style={styles.icon}
                color={isFocus ? '#ffffff' : '#fff'}
                size={20}
              />
            )}
          />

          <View className="flex-1 mt-2">
            <Text
              className="text-[#fff] text-[13px] p-1"
              style={{fontFamily: 'Poppins-Regular'}}>
              Balling Hand
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{color: '#ffff', textAlign: 'center'}}
              containerStyle={{
                backgroundColor: '#000000E5',
                width: '40%',
                alignSelf: 'flex-end',
              }}
              data={GripData}
              activeColor="#86D957"
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? '' : ''}
              value={value.bowlingStyle}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue({...value, bowlingStyle: item.value});
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <ChevronDoubleDownIcon
                  style={styles.icon}
                  color={isFocus ? '#ffffff' : '#fff'}
                  size={20}
                />
              )}
            />
          </View>

          <View className="flex-1 mt-2">
            <Text
              className="text-[#fff] text-[13px] p-1"
              style={{fontFamily: 'Poppins-Regular'}}>
              Add Playing Level
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{color: '#ffff', textAlign: 'center'}}
              containerStyle={{
                backgroundColor: '#000000E5',
                width: '40%',
                alignSelf: 'flex-end',
              }}
              data={LevelData}
              activeColor="#86D957"
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? '' : ''}
              value={value.addPlayingcricket}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue({...value, addPlayingcricket: item.value});
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <ChevronDoubleDownIcon
                  style={styles.icon}
                  color={isFocus ? '#ffffff' : '#fff'}
                  size={20}
                />
              )}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        style={{paddingHorizontal: 20}}
        onPress={handleStartButton}>
        <LinearGradient
          colors={['#86D957', '#060606A3']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="p-4 rounded-full mt-5">
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              className="text-[#fff] text-[20px] text-center"
              style={{fontFamily: 'Outfit-Regular'}}>
              Let’s Start
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF29',
    color: '#FFFFFF',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 2,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#e2e2e2',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
