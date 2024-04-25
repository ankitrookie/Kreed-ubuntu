import React, { View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import User from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Foundation';
import Game from 'react-native-vector-icons/MaterialCommunityIcons';

import { Home, Profile, Room } from '../screens';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'black',
            height: 70,
          },
        }}>
        {/* Home Navigation */}
  
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: '#77C04E',
                        width: 50,
                        alignItems: 'center',
                        paddingVertical: 3,
                        borderRadius: 5,
                      }
                    : null
                }>
                <Icon name="home" size={30} color="#fff" />
              </View>
            ),
          }}
        />
        {/* Room Navigation */}
  
        <Tab.Screen
          name="Games"
          component={Room}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: '#77C04E',
                        width: 50,
                        alignItems: 'center',
                        paddingVertical: 3,
                        borderRadius: 5,
                      }
                    : null
                }>
                <Game name="gamepad-variant" size={30} color="#fff" />
              </View>
            ),
          }}
        />
        {/* Profile Navigation */}
  
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: '#77C04E',
                        width: 50,
                        alignItems: 'center',
                        paddingVertical: 3,
                        borderRadius: 5,
                      }
                    : null
                }>
                <User name="user" size={30} color="#fff" />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  