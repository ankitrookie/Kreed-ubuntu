import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Chat,
  EditProfile,
  EndLiveRoom,
  HostLivePlayroomChooseModal3,
  MakeBadmintonTeam,
  MakeTeam,
  Publish,
  PublishReview,
  ScoreBoarding,
  SelectSpecificationOfCricket,
  Settings
} from '../components';
import {
  CameraPage,
  Comments,
  CreateTeam,
  FollowersFollowing,
  JoinTeam,
  MediaPage,
  Messages,
  Notification,
  OthersProfile
} from '../screens';
import { BottomTab } from './BottomTab';

// configuring navigation
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SelectSpecificationOfCricket"
        component={SelectSpecificationOfCricket}
      />
      <Stack.Screen
        name="HostLivePlayroomChooseModal3"
        component={HostLivePlayroomChooseModal3}
      />
      <Stack.Screen name="FollowersFollowing" component={FollowersFollowing} />
      <Stack.Screen name="MakeBadmintonTeam" component={MakeBadmintonTeam} />
      <Stack.Screen name="ScoreBoarding" component={ScoreBoarding} />
      <Stack.Screen name="PublishReview" component={PublishReview} />
      <Stack.Screen name="OthersProfile" component={OthersProfile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="EndLiveRoom" component={EndLiveRoom} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen name="CreateTeam" component={CreateTeam} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="MediaPage" component={MediaPage} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="MakeTeam" component={MakeTeam} />
      <Stack.Screen name="JoinTeam" component={JoinTeam} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Message" component={Messages} />
      <Stack.Screen name="Publish" component={Publish} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
