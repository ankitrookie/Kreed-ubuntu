import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { showMessage } from 'react-native-flash-message';
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from '.';
import { HistoryData, scoreBoardData } from '../constants';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { ShadowBox } from '../ui';
import { getRoomScoreAsync, selectRoomScore } from './Badminton/badmintionSlice';
import Moments from './Moments';

const PublishReview = () => {
  const user = useSelector(selectRoom);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const score = useSelector(selectRoomScore);
  const [status, setStatus] = useState('score');
  const maxItemsToShow = scoreBoardData.length;
  const [numItemsToRender, setNumItemsToRender] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const {width} = Dimensions.get('window');
  const [modal, setModal] = useState(false);

  const [selectedGameForPost, setSelectedGameForPost] = useState([]);
  const [selectedMomentsForPost, setSelectedMomentsForPost] = useState([]);

  const fetchUserData = async () => {
    dispatch(getRoomScoreAsync({roomId: user?.data?.id}));
  };

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  const toggleItem = () => {
    if (showAll) {
      setNumItemsToRender(3);
    } else {
      setNumItemsToRender(maxItemsToShow);
    }
    setShowAll(!showAll);
  };

  const handlePubish = () => {
    if (selectedGameForPost.length > 0 && selectedMomentsForPost.length > 0) {
      setModal(true);
    } else {
      showMessage({
        message: 'Choose you Game and moments to publish',
        type: 'warning',
        floating: true,
      });
    }
  };

  return (
    <View className="flex-1 bg-[#000] p-4">
      <View className="flex-row justify-between p-4">
        <View>
          <TouchableOpacity onPress={() => setStatus('score')}>
            <View className="flex-col items-center">
              <Text className="text-white text-[19px] text-center">
                ScoreBoard
              </Text>
              {status == 'score' ? (
                <LinearGradient
                  colors={['#308400', '#EFF30F']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="rounded-md h-2 w-full"
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => setStatus('moment')}>
            <View className="flex-col items-center">
              <Text className="text-white text-[19px] text-center">
                Moments
              </Text>
              {status == 'moment' ? (
                <LinearGradient
                  colors={['#308400', '#EFF30F']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="rounded-md h-2 w-full"
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {status == 'score' ? (
        <>
          {user?.data?.sportType == 'Badminton' ? (
            <View className="flex-1">
              <FlatList
                data={score?.data}
                keyExtractor={item => item?.gameId}
                renderItem={({item}) => {
                  const profileImage1 =
                    item?.scores[0]?.players[0]?.user?.profile;
                  const profileImage2 =
                    item?.scores[0]?.players[1]?.user?.profile;
                  const profileImage3 =
                    item?.scores[1]?.players[0]?.user?.profile;
                  const profileImage4 =
                    item?.scores[1]?.players[1]?.user?.profile;

                  const noProfile = require('../assets/images/noProfile.png');
                  return (
                    <View className="flex-row justify-between">
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
                                  profileImage2
                                    ? {uri: profileImage2}
                                    : noProfile
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
                                  profileImage4
                                    ? {uri: profileImage4}
                                    : noProfile
                                }
                              />
                            )}
                          </View>
                        </View>
                      </ShadowBox>
                      <BouncyCheckbox
                        size={15}
                        fillColor="#86D95795"
                        iconStyle={{borderRadius: 0}}
                        innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
                        onPress={isChecked => {
                          if (isChecked) {
                            setSelectedGameForPost(prevSelectedGames => [
                              ...prevSelectedGames,
                              item,
                            ]);
                          } else {
                            setSelectedGameForPost(prevSelectedGames =>
                              prevSelectedGames.filter(
                                selectedItem =>
                                  selectedItem?.gameId !== item?.gameId,
                              ),
                            );
                          }
                        }}
                      />
                    </View>
                  );
                }}
                ListFooterComponent={() => (
                  <View className="p-2">
                    {HistoryData.length > 3 && (
                      <TouchableOpacity onPress={toggleItem}>
                        <Text
                          style={{fontFamily: 'Inter-Regular'}}
                          className="text-[#86d957] not-italic text-[12px] font-black ml-auto">
                          {showAll ? 'See less...' : 'See more...'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
              <TouchableOpacity
                onPress={handlePubish}
                className="flex-row top-3 justify-end">
                <LinearGradient
                  colors={['#20341D', '#86D957']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="text-white items-center py-3 rounded-2xl w-[35%]">
                  <Text className="text-slate-50 text-[18px] font-bold">
                    Publish
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-1 my-4">
              <FlatList
                data={scoreBoardData.slice(0, numItemsToRender)}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View className="flex-row justify-between mb-2">
                    <ShadowBox style={{width: width * 0.8}}>
                      <View>
                        <View className="flex-row justify-between w-full p-2">
                          <Text className="text-[#86D957] font-bold text-[10px]">
                            {item.team1.name}
                          </Text>
                          <View>
                            <Text className="text-[#fff] font-bold text-[10px]">
                              {item.team1.score}
                            </Text>
                            <Text className="text-[#fff] font-bold text-[10px]">
                              {item.team1.overs}
                            </Text>
                          </View>
                          <View className="flex-col justify-center items-center">
                            <MaterialCommunity
                              name="trophy"
                              size={18}
                              color="gold"
                            />
                            <Text className="text-[#FEC119] text-[11px]">
                              Won
                            </Text>
                            <Text className="text-[#FEC119] text-[11px]">
                              Against
                            </Text>
                          </View>

                          <View>
                            <Text className="text-[#fff] font-bold text-[10px]">
                              {item.team2.score}
                            </Text>
                            <Text className="text-[#fff] font-bold text-[10px]">
                              {item.team2.overs}
                            </Text>
                          </View>
                          <Text className="text-[#86D957] font-bold text-[10px]">
                            {item.team2.name}
                          </Text>
                        </View>

                        <View className="border-t border-[#ffffff52] w-full"></View>

                        <View className="flex-row justify-evenly">
                          <View className="flex-row space-x-4 p-2">
                            <View>
                              <View className="border border-[#86d957] rounded-full">
                                <Image
                                  source={item.player2.avatarSource}
                                  className="h-[20px] w-[20px] rounded-full"
                                />
                              </View>
                            </View>

                            <View className="">
                              <MaterialCommunity
                                name="cricket"
                                size={18}
                                color="yellow"
                              />
                              <MaterialCommunity
                                name="bowling"
                                size={18}
                                color="red"
                              />
                            </View>

                            <View>
                              <Text className="text-[#fff] font-bold text-[10px]">
                                {item.player1.stats.runs}
                              </Text>
                              <Text className="text-[#fff] font-bold text-[10px]">
                                {item.player1.stats.wickets}
                              </Text>
                              <Text className="text-[#fff] font-bold text-[10px]">
                                {item.player1.stats.extras}
                              </Text>
                            </View>
                          </View>

                          <View className="bg-[#ffffff52] w-[1px]"></View>

                          <View className="flex-row items-center space-x-2 p-2">
                            <Image
                              source={item.player2.imageSource}
                              className="h-[14px] w-[14px] rounded-full"
                            />
                            <Text
                              className="text-[10px] text-[#86d957]"
                              style={{fontFamily: 'Inter-Regular'}}>
                              MVP
                            </Text>
                            <View className="bg-[#FFFDFD1F] w-[65px] rounded-2xl flex-row items-center space-x-2">
                              <View className="border border-[#86d957] rounded-full">
                                <Image
                                  source={item.player2.avatarSource}
                                  className="h-[20px] w-[20px] rounded-full"
                                />
                              </View>
                              <Text className="text-[#fff] text-[12px]">
                                {item.player2.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </ShadowBox>
                    <BouncyCheckbox
                      size={15}
                      fillColor="#86d957"
                      iconStyle={{borderRadius: 0}}
                      innerIconStyle={{borderRadius: 0, borderColor: 'white'}}
                      onPress={isChecked => {
                        console.log(isChecked);
                      }}
                    />
                  </View>
                )}
                ListFooterComponent={() => (
                  <View>
                    {scoreBoardData.length > 3 && (
                      <TouchableOpacity onPress={toggleItem}>
                        <Text
                          style={{fontFamily: 'Inter-Regular'}}
                          className="text-[#86d957] not-italic text-[12px] font-black ml-auto">
                          {showAll ? 'See less...' : 'See more...'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />

              <TouchableOpacity
                onPress={() => {}}
                className="flex-row top-1 justify-end">
                <LinearGradient
                  colors={['#20341D', '#86D957']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="text-white items-center py-3 rounded-2xl w-[35%]">
                  <Text className="text-slate-50 text-[18px] font-bold">
                    Publish
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View className="flex-1">
          <Moments
            setSelectedMomentsForPost={setSelectedMomentsForPost}
            handlePubish={handlePubish}
          />
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModal(false),
              setSelectedGameForPost([]),
              setSelectedMomentsForPost([]);
          }}>
          <View style={{backgroundColor: 'rgba(0,0,0,.6)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        <Publish
          selectedMomentsForPost={selectedMomentsForPost}
          selectedGameForPost={selectedGameForPost}
          setSelectedGameForPost={setSelectedGameForPost}
          setSelectedMomentsForPost={setSelectedMomentsForPost}
          navigation={navigation}
        />
      </Modal>
    </View>
  );
};

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

export default PublishReview;
