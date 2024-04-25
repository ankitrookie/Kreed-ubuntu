import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { BellIcon } from 'react-native-heroicons/outline';
import { PostComponent } from '../../components/index';

// json data
import { useDispatch, useSelector } from 'react-redux';
import SkeletonUI from '../../SkeletonUI';
import { useAuthStore } from '../../store/useAuthStore';
import { Container } from '../../ui';
import {
  getAllPostAsync,
  selectGetPost,
  selectGetPostLoading,
} from '../authScreens/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const loading = useSelector(selectGetPostLoading);
  const userAllData = useSelector(selectGetPost);

  useEffect(() => {
    dispatch(getAllPostAsync({userId: user?.user?.id}));
  }, [dispatch]);

  return (
    <Container
      style={{
        paddingTop: 24,
        flex: 1,
      }}>
      {/* navbar */}
      <View className="flex-row justify-between">
        <View className="flex-row justify-center items-center">
          <Text
            className="text-[30px] text-white"
            style={{fontFamily: 'ZillaSlab-Regular'}}>
            LOGO
          </Text>
        </View>
        <View className="flex-row justify-center items-center space-x-6">
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <BellIcon size={30} color="white" />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <View className="rotate-[-45deg]">
              <PaperAirplaneIcon size={30} color="white" />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* main content */}
      <View className="flex-1">
        {loading ? (
          <SkeletonUI />
        ) : (
          <FlatList
            data={userAllData?.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <PostComponent item={item} />;
            }}
          />
        )}
      </View>
    </Container>
  );
};

export default Home;
