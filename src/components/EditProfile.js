import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {RoomHeader} from '.';

import {Dropdown} from 'react-native-element-dropdown';
import {showMessage} from 'react-native-flash-message';
import {
  CameraIcon,
  ChevronDoubleDownIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUpdateUserLoading,
  updateUserAsync,
} from '../screens/authScreens/authSlice';
import {useAuthStore} from '../store/useAuthStore';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setUser = useAuthStore(state => state.setUser);

  const user = useAuthStore(state => state.user);
  console.log('users', user.user.fname);

  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const loading = useSelector(selectUpdateUserLoading);
  const [modalVisible, setVisible] = useState(false);
  const [stateType, setStateType] = useState('badminton');
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState(user.user.fname);
  const [username, setUsername] = useState(user.user.username);
  const [bio, setBio] = useState(user.user.bio);
  const [gender, setGender] = useState('');
  const [value, setValue] = useState({
    gripValue: null,
    addPlayingBadminton: null,
    addPlayingcricket: null,
    bowlingStyle: null,
    battingStyle: null,
  });

  const [tempValue, setTempValue] = useState(null);
  console.log("value of games", tempValue);

  const saveValues = () => {
    setTempValue(value);
    setVisible(false);
  };

  const handleSaveButton = async () => {
    let updateUserData = {
      storedId: user.user.id,
      fname: name,
      username: username,
      bio: bio,
      gender: gender,
      grip: tempValue.gripValue,
      profile: image,
      addPlayingBadminton: tempValue.addPlayingBadminton,
      addPlayingcricket: tempValue.addPlayingcricket,
      bowlingStyle: tempValue.bowlingStyle,
      battingStyle: tempValue.battingStyle
    };
    try {
      const response = await dispatch(updateUserAsync({updateUserData}));
      console.log('edited data', response);
      if (response.payload.status) {
        showMessage({
          message: 'Profile updated successfully',
          type: 'success',
          floating: true,
        });
        setUser({
          user: response.payload.data,
        });
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
        navigation.goBack();
      } else if (response.payload.message === 'Username already in use') {
        showMessage({
          message: 'user name already exist! please try to make it unique.',
          type: 'warning',
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
      showMessage({
        message: 'Profile update failed! Please try again.',
        type: 'danger',
        floating: true,
      });
    }
  };

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
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await ImagePicker.launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      setImage(result.assets[0].uri);
    }
  });

  return (
    <ScrollView style={[styles.container]}>
      <View className="flex-row items-center justify-between p-4">
        {/* Header  */}
        <RoomHeader route="Ankit" />

        <TouchableOpacity onPress={handleSaveButton}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-[#86D957] bg-[#FFFFFF26] px-4 py-2 rounded-xl">
              SAVE
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <View className="flex-row justify-center items-center">
          <TouchableOpacity onPress={selectImageFromGallery}>
            {image ? (
              <Image
                source={{uri: image}}
                className="rounded-full w-[80] h-[80]"
              />
            ) : (
              <View className="bg-[#D9D9D9] w-[80] h-[80] rounded-full items-center justify-center">
                <CameraIcon size={25} color={'#000'} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="p-4">
          {/* Name input */}
          <View>
            <Text
              className="text-[#fff] text-[13px] p-2"
              style={{fontFamily: 'Poppins-Regular'}}>
              Name
            </Text>
            <TextInput
              className="bg-[#FFFFFF29] rounded-lg p-2 text-white"
              defaultValue={name}
              onChangeText={setName}
            />
          </View>

          {/* Username input */}
          <View>
            <Text
              className="text-[#fff] text-[13px] p-2"
              style={{fontFamily: 'Poppins-Regular'}}>
              Username
            </Text>
            <TextInput
              className="bg-[#FFFFFF29] rounded-lg p-2 text-white"
              defaultValue={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Bio input */}
          <View>
            <Text
              className="text-[#fff] text-[13px] p-2"
              style={{fontFamily: 'Poppins-Regular'}}>
              Bio
            </Text>
            <TextInput
              className="bg-[#FFFFFF29] rounded-xl p-4 text-[#fff]"
              style={{fontFamily: 'Poppins-Regular'}}
              placeholderTextColor={'#9191916b'}
              textAlignVertical="top"
              placeholder="Try adding a short bio to tell people mor about yourself in 150 characters"
              defaultValue={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={5}
            />
          </View>
        </View>

        {/* Gender selection */}
        <View style={[styles.fieldContainer, {backgroundColor: 'black'}]}>
          <Text style={styles.label}>Select Gender:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'male' && styles.selectedOption,
                ]}
                onPress={() => setGender('male')}>
                <Text
                  style={[
                    styles.optionText,
                    gender === 'male' && styles.selectedText,
                  ]}></Text>
              </TouchableOpacity>
              <Text style={{fontSize: 15, color: 'white', marginLeft: 10}}>
                Male
              </Text>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'female' && styles.selectedOption,
                ]}
                onPress={() => setGender('female')}>
                <Text
                  style={[
                    styles.optionText,
                    gender === 'female' && styles.selectedText,
                  ]}></Text>
              </TouchableOpacity>
              <Text style={{fontSize: 15, color: 'white', marginLeft: 10}}>
                Female
              </Text>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'other' && styles.selectedOption,
                ]}
                onPress={() => setGender('other')}>
                <Text
                  style={[
                    styles.optionText,
                    gender === 'other' && styles.selectedText,
                  ]}></Text>
              </TouchableOpacity>
              <Text style={{fontSize: 15, color: 'white', marginLeft: 10}}>
                Others
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          className="flex-row items-center justify-between m-4 p-4 rounded-lg bg-[#FFFFFF1C]">
          <Text className="text-[#86D957] text-[15px]">
            Edit Game Information
          </Text>
          <ChevronRightIcon size={25} color="#86D957" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.2)', flex: 1}}></View>
        </TouchableWithoutFeedback>
        <View className="bg-[#05080D] h-[450px] mt-auto border-t rounded-t-2xl p-2 border-[#86D957]">
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

          {/* cricket and badmention */}
          {stateType === 'badminton' ? (
            <View className="flex-1">
              <Text
                className="text-[#fff] text-[13px] p-1"
                style={{fontFamily: 'Poppins-Regular'}}>
                Grip
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

              <View className="mt-2">
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

              <View className="mt-2">
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
            className="items-center w-[40%] self-end"
            onPress={saveValues}>
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
    </ScrollView>
  );
};

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
  container: {
    flex: 1,
    backgroundColor: '#05080D',
  },
  input: {
    backgroundColor: '#2d3034',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    height: 50,
    width: '90%',

    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fieldContainer: {
    backgroundColor: '#2d3034', // Adjust the opacity as needed
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    color: 'white',
  },
  blurredBackground: {
    backgroundColor: 'transparent',
    // For iOS, adjust the blur radius as needed
    paddingHorizontal: 10,
  },
  bioInput: {
    textAlignVertical: 'top',
    height: 80,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genderOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    margin: 2,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  selectedOption: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  optionText: {
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'green',
    marginLeft: 'auto',
    marginRight: 20,
    width: 80,
    padding: 5,
    borderRadius: 4,
    alignItems: 'center',

    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfile;
