import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions} from 'react-native';
import {Row} from '../ui';

import {useNavigation} from '@react-navigation/native';
import {ChatBubbleBottomCenterIcon} from 'react-native-heroicons/outline';
import {FireIcon as FireIconSolid} from 'react-native-heroicons/solid';
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {useAuthStore} from '../store/useAuthStore';
import {likePostAsync} from './Cricket/cricketSlice';
import { Comments } from '../screens';

const SocialActionButton = ({setModalType, setVisible, item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const [likes, setLikes] = useState(item?.like);
  const {width, height} = useWindowDimensions();
  const [modal, setModal] = useState(false);
  const fontSize = width * 0.04;

  const userId = user.user.id;
  const hasLikePost = item.like.find(like => like.userId === userId);

  const handlelike = () => {
    if (item?.GameIds[0]?.postId == undefined) {
      return;
    }

    const likeData = {
      userId: userId,
      postId: item?.GameIds[0]?.postId,
      method: hasLikePost ? 'DELETE' : 'POST',
    };

    dispatch(likePostAsync({likeData}));

    if (hasLikePost) {
      setLikes(likes.filter(id => id.userId !== userId));
    } else {
      setLikes([...item.like, userId]);
    }
  };

  return (
    <Row
      style={{
        paddingTop: 15,
      }}>
      <TouchableOpacity
        onPress={handlelike}
        className="flex-row bg-[#FEFEFE24] px-4 py-2 rounded-full items-center">
        <FireIconSolid
          size={25}
          color={likes.find(like => like.userId === userId) ? 'orange' : '#fff'}
        />
        <Text
          style={{fontFamily: 'Inter-Regular', fontSize: fontSize}}
          className="not-italic font-normal text-[#fff]">
          {likes?.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModal(true)}
        className=" flex-row space-x-2 bg-[#FEFEFE24] px-4 py-2 rounded-full items-center">
        <ChatBubbleBottomCenterIcon size={25} color="white" />
        <Text
          style={{fontFamily: 'Inter-Regular', fontSize: fontSize}}
          className="not-italic font-normal text-[#fff]">
          {item?.comments?.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true), setModalType('share');
        }}
        className="flex-row bg-[#FEFEFE24] px-4 py-2 rounded-full items-center">
        <MaterialCommunity name="share" size={25} color="white" />
        <Text
          style={{fontFamily: 'Inter-Regular', fontSize: fontSize}}
          className="not-italic font-normal text-[#fff]">
          10k
        </Text>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={modal}>
        <TouchableWithoutFeedback
          onPress={() => setModal(false)}>
          <View style={{backgroundColor: 'rgba(0,0,0,.6)', flex: 1}}></View>
        </TouchableWithoutFeedback>

        <Comments item={item} />
      </Modal>
    </Row>
  );
};

export default SocialActionButton;
