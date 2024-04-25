import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Home & Auth navigation
import AuthNavigation from './AuthStack';
import HomeNavigation from './AppStack';

import {useAuthStore, useOnboardingStore} from '../store/useAuthStore';
import {OnBoarding} from '../screens';
import {ActivityIndicator, View} from 'react-native';
import themes from '../themes';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const onboardingCompleted = useOnboardingStore(
    state => state.onboardingCompleted,
  );
  const isLoggedIn = useAuthStore(state => state.user);

  if (!isLoggedIn) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={40} color={themes.lightGreen} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}>
          {isLoggedIn ? (
            <Stack.Screen name="home-stack" component={HomeNavigation} />
          ) : (
            <Stack.Screen name="auth-stack" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default RootNavigation;

// {onboardingCompleted ? (
//   isLoggedIn ? (
//     <Stack.Screen name="home-stack" component={HomeNavigation} />
//   ) : (
//     <Stack.Screen name="auth-stack" component={AuthNavigation} />
//   )
// ) : (
//   <Stack.Screen name="OnBoarding" component={OnBoarding} />
// )}
