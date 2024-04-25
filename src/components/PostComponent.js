import {
  FlatList,
  Image,
  Modal,
  Share,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from 'react-native';

// icons
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  BellIcon,
  BookmarkIcon,
  UserMinusIcon
} from 'react-native-heroicons/outline';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from 'react-native-heroicons/solid';
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// image
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { HistoryData } from '../constants';
import { selectGetPostLoading } from '../screens/authScreens/authSlice';
import CustomeDate from './CustomeDate';
import History from './History';
import SocialActionButton from './SocialActionButton';

const PostComponent = ({item}) => {
  console.log("all items", item.postData);
  const {width, height} = useWindowDimensions();
  const fontSize = width * 0.04;
  const navigation = useNavigation();
  const [numItemsToRender, setNumItemsToRender] = useState(3);
  const [numberOfLineToRender, setNumberOfLineToRender] = useState(90);
  const loading = useSelector(selectGetPostLoading);
  const maxItemsToShow = HistoryData.length;
  const maxLine = item?.caption?.length;
  const [showAll, setShowAll] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [modalVisible, setVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalType, setModalType] = useState();
  const [message, setMessage] = useState();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleShare = () => {
    Share.share({
      message: 'Check out this amazing content!', // The content you want to share
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Content shared successfully
            console.log('Content shared successfully');
          } else {
            // Share was dismissed
            console.log('Share dismissed');
          }
        } else if (result.action === Share.dismissedAction) {
          // Share was dismissed
          console.log('Share dismissed');
        }
      })
      .catch(error => {
        // Error occurred while sharing
        console.log('Share error:', error);
      });
  };

  const toggleHistory = () => {
    if (showAll) {
      setNumItemsToRender(3);
    } else {
      setNumItemsToRender(maxItemsToShow);
    }
    setShowAll(!showAll);
  };

  const toggleLine = () => {
    if (showLine) {
      setNumberOfLineToRender(100);
    } else {
      setNumberOfLineToRender(maxLine);
    }
    setShowLine(!showLine);
  };

  return (
    <SafeAreaView style={{flex: 1, marginVertical: 10}}>
      <View className="flex-row py-2 justify-between">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OthersProfile', {
              item: item,
            })
          }>
          <View className="border mr-4 border-[#86d957] rounded-full">
            <Image
              className="h-[40px] w-[40px] rounded-full"
              source={
                item?.profile
                  ? {uri: item.profile}
                  : require('../assets/images/banner.png')
              }
            />
          </View>
        </TouchableOpacity>
        <View className="flex-1">
          <Text
            style={{fontFamily: 'Inter-Regular', fontSize: fontSize}}
            className={`text-[#fff]`}>
            <Text className="font-semibold">{item?.username} </Text>
            <Text className="font-normal">has played with</Text>
            <Text className="font-semibold"> Parth</Text>
            <Text className="font-normal"> and </Text>
            <Text className="font-semibold">3 others.</Text>
          </Text>
          <CustomeDate dateString={item.createdAt} />
        </View>

        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            setModalType('options');
          }}>
          <MaterialCommunity name="dots-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* History */}

      <FlatList
        data={HistoryData.slice(0, numItemsToRender)}
        keyExtractor={item => item?.id}
        renderItem={({item}) => <History item={item} />}
      />
      {HistoryData.length > 3 && (
        <TouchableOpacity onPress={toggleHistory}>
          <Text
            style={{fontFamily: 'Inter-Regular'}}
            className="text-[#86D957] not-italic py-2 font-black ml-auto">
            {showAll ? 'See less...' : 'See more...'}
          </Text>
        </TouchableOpacity>
      )}

      <View>
        <Image
          source={
            item?.postData[0]?.image
              ? {uri: item?.postData[0]?.image}
              : require('../assets/images/banner.png')
          }
          className="rounded-lg w-full h-[199px]"
          resizeMode="cover"
        />
        <Text
          style={{fontFamily: 'Poppins-Regular', fontSize: 14}}
          className="text-white mt-2 tracking-widest leading-[18px] font-normal">
          {item?.caption?.slice(0, numberOfLineToRender)}
        </Text>
        {item?.caption?.length > 100 && (
          <TouchableOpacity
            onPress={toggleLine}
            className="absolute bottom-0 right-2">
            {showLine ? (
              <ChevronDoubleUpIcon color="#86d957" size={25} />
            ) : (
              <ChevronDoubleDownIcon color="#86d957" size={25} />
            )}
          </TouchableOpacity>
        )}
      </View>

      <SocialActionButton
        setModalType={setModalType}
        setVisible={setVisible}
        item={item}
      />

      {/* Share Modal */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.2)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        {modalType == 'options' ? (
          <View className="bg-[#05080d] border-t-2 rounded-t-md border-[#7BF13B42] p-4 space-y-4">
            {/* Save */}
            <View className="flex-row item-center space-x-5">
              <BookmarkIcon color="white" size={25} />
              <TouchableOpacity>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{fontFamily: 'Inter-Regular'}}>
                  Save Post
                </Text>
              </TouchableOpacity>
            </View>

            {/* Share */}
            <View className="flex-row item-center space-x-5">
              <UserMinusIcon color="white" size={25} />
              <TouchableOpacity onPress={handleShare}>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{fontFamily: 'Inter-Regular'}}>
                  UnFollow
                </Text>
              </TouchableOpacity>
            </View>

            {/* Hide Post */}
            <View className="flex-row item-center space-x-5">
              <EyeSlashIcon color="white" size={25} />
              <TouchableOpacity>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{fontFamily: 'Inter-Regular'}}>
                  Hide Post
                </Text>
              </TouchableOpacity>
            </View>

            {/* Notification */}
            <View className="flex-row item-center space-x-5">
              <BellIcon color="white" size={25} />
              <TouchableOpacity>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{fontFamily: 'Inter-Regular'}}>
                  Notification for this post{' '}
                </Text>
              </TouchableOpacity>
              <Switch
                trackColor={{false: '#70b64a', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : 'rgba(255,255,255,0.9)'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            {/* Report */}
            <View className="flex-row item-center space-x-5">
              <InformationCircleIcon color="red" size={25} />
              <TouchableOpacity>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{fontFamily: 'Inter-Regular'}}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-[#05080d] border-t-2 rounded-t-md border-[#7BF13B42] p-4 space-y-4">
            <TextInput
              placeholder="Write a message..."
              placeholderTextColor={'white'}
              className="border border-[#747474] rounded-xl px-4 text-[#FFFFFFB2]"
              value={message}
              onChangeText={txt => setMessage(txt)}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'white'}
              className=" bg-[#FFFFFF1F] rounded-2xl px-4 text-white"
              value={message}
              onChangeText={e => setMessage(e)}
            />

            {/* friends to send or share 1 / we can loop afterward when we get actual friends */}
            <View className="flex-row justify-between items-center space-x-4">
              <View className="flex-row items-center space-x-4">
                <Image
                  className="h-[39px] w-[40px]"
                  source={require('../assets/images/download1.png')}
                />
                <Text className="text-white text-[13px]">Akash Datta</Text>
              </View>

              <TouchableOpacity
                className={` flex-row items-center justify-center`}>
                <LinearGradient
                  colors={['#86D957', '#203912']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="p-2 rounded-xl px-6">
                  <Text className="text-white text-[12px] font-medium">
                    Send
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default PostComponent;
