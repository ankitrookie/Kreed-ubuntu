import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { BellIcon, BookmarkIcon, InformationCircleIcon, NoSymbolIcon, ShareIcon, QuestionMarkCircleIcon, UserPlusIcon } from "react-native-heroicons/outline"
import { RoomHeader } from '.';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';



const Settings = () => {
   const navigation = useNavigation();
   const setUser = useAuthStore((state) => state.setUser);
   const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

   const handleLogout = useCallback(async () => {
      try {
         setUser({
            user: {}
         });
         setIsLoggedIn(false);
      } catch (error) {
         showMessage({
            message: "failed to log out!",
            type: "danger",
            floating: true,
         });
      }
   }, [navigation]);

   return (
      <View className="flex-1 bg-black">
         {/* Navbar */}
         <View className="p-4">
            <RoomHeader route={"Settings"} />
         </View>

         <View className="p-4 space-y-4">
            <Text className="text-[#FFFFFF99] text-[12px] font-normal not-italic">Your Account</Text>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <BellIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <BookmarkIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <NoSymbolIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Blocked</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <ShareIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Follow and invite friends</Text>
            </TouchableOpacity>
         </View>

         <View className="p-4 space-y-4">
            <Text className="text-[#FFFFFF99] text-[12px] font-normal not-italic">More info and Support</Text>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <QuestionMarkCircleIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <InformationCircleIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>About</Text>
            </TouchableOpacity>
         </View>

         <View className="p-4 space-y-4">
            <Text className="text-[#FFFFFF99] text-[12px] font-normal not-italic">Login</Text>
            <TouchableOpacity className="flex-row items-center space-x-4">
               <UserPlusIcon size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Add Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4" onPress={handleLogout}>
               <MaterialCommunity name="logout" size={25} color="white" />
               <Text className="text-white text-[18px] tracking-widest font-medium leading-normal not-italic" style={{ fontFamily: 'Inter-Regular' }}>Log Out Ankit Mukhia</Text>
            </TouchableOpacity>
         </View>

      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      flexDirection: "row",

      padding: 10,
      width: "60%"

   },
   text: {
      color: "white",
      fontSize: 18,
      marginLeft: 10,

   }
})

export default Settings