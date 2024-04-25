import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FireIcon} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import themes from '../../themes';
import {Container} from '../../ui';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthStore} from '../../store/useAuthStore';
import {
  commentPostAsync,
  selectCommetLoading,
} from '../../components/Cricket/cricketSlice';

const Comments = ({item}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const user = useAuthStore(state => state.user);
  const loading = useSelector(selectCommetLoading);

  const handleCommentPost = async () => {
    const commentData = {
      userId: user?.user?.id,
      postId: item?.GameIds[0]?.postId,
      comment: comment,
    };
    try {
      const response = await dispatch(commentPostAsync({commentData}));
      if (response.payload.status) {
        setComment('');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Container
      style={{
        paddingTop: 20,
        borderTopColor: themes.lightGreen,
        borderTopWidth: 1,
        borderRadius: 10,
      }}>
      <FlatList
        data={item?.comments}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <TouchableOpacity>
                <Image
                  style={{height: 44, width: 44, borderRadius: 22}}
                  source={{uri: item.user.profile}}
                />
              </TouchableOpacity>
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{fontFamily: 'Inter-Regular', color: '#fff'}}>
                  {item.user.username}
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    {item.comment}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <FireIcon size={20} color="white" />
                </TouchableOpacity>
                <Text style={{color: '#fff', fontSize: 12, marginLeft: 5}}>
                  {item.commentsLike}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View className="w-full p-4">
        <View className="flex-row justify-between items-center ">
          <Image
            style={{width: 45, height: 45, borderRadius: 25}}
            source={require('../../assets/images/profile.png')}
          />
          <TextInput
            placeholder="Add a comment..."
            value={comment}
            onChangeText={txt => setComment(txt)}
            placeholderTextColor="#FFFFFF99"
            className="bg-[#FFFFFF1F] w-[70%] rounded-full px-4 text-white"
          />

          <TouchableOpacity onPress={handleCommentPost} className="w-[15%]">
            <LinearGradient
              colors={['#20341D', '#86D957']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="text-white items-center py-2 rounded-2xl">
              {loading ? (
                <ActivityIndicator color="#fff" size={20} />
              ) : (
                <Text className="text-slate-50">Post</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Comments;

const styles = StyleSheet.create({});
