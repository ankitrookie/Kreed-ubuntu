import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import themes from '../themes';
import {ShadowBox} from '../ui';

const History = ({item}) => {
  return (
    <ShadowBox>
      <View className="flex-col items-center">
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.img} source={item.View1.Image1.source} />
          <Image style={styles.img} source={item.View1.Image2.source} />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 100,
        }}>
        <Text style={{color: 'white'}}>{item.View2.Text1.content}</Text>
        <Text className="text-[#86D957] font-bold">
          {item.View2.Text2.content}
        </Text>
        <Text style={{color: 'white'}}>{item.View2.Text3.content}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.img} source={item.View3.Image1.source} />
          <Image style={styles.img} source={item.View3.Image1.source} />
        </View>
      </View>
    </ShadowBox>
  );
};
const styles = StyleSheet.create({
  shadow: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    shadowColor: '#86D95744',
    shadowOffset: {
      width: 0,
      height: -10, // Adjust this value to make the glow more prominent upwards
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'yellow',
    marginHorizontal: 2,
  },
});

export default History;

// <View className="flex-row justify-between">
//                     <Text className="text-[#86D957] font-bold text-[14px]">{item.team1.name}</Text>
//                     <View>
//                       <Text className="text-[#fff] font-bold text-[14px]">{item.team1.score}</Text>
//                       <Text className="text-[#fff] font-bold text-[14px]">{item.team1.overs}</Text>
//                     </View>
//                     <View className="flex-col justify-center items-center">
//                       <MaterialCommunity name="trophy" size={20} color="gold" />
//                       <Text className="text-[#FEC119] text-[11px]">Won</Text>
//                       <Text className="text-[#FEC119] text-[11px]">Against</Text>
//                     </View>

//                     <View>
//                       <Text className="text-[#fff] font-bold text-[14px]">{item.team2.score}</Text>
//                       <Text className="text-[#fff] font-bold text-[14px]">{item.team2.overs}</Text>
//                     </View>
//                     <Text className="text-[#86D957] font-bold text-[14px]">{item.team2.name}</Text>
//                   </View>

//                   <View className="border-b border-[#FFFFFF99] w-full"></View>

//                   <View style={{ justifyContent: "space-between", flexDirection: "row"}}>
//                     <View className="flex-row items-center space-x-6">
//                       <Image source={item.player1.imageSource} style={{ height: 30, width: 30, borderRadius: 30 }} />

//                       <View className="">
//                         <MaterialCommunity name="cricket" size={20} color="yellow" />
//                         <MaterialCommunity name="bowling" size={20} color="red" />
//                       </View>

//                       <View className="space-y-1">
//                         <Text className="text-[#fff] font-bold text-[12px]">{item.player1.stats.runs}</Text>
//                         <Text className="text-[#fff] font-bold text-[12px]">{item.player1.stats.wickets}</Text>
//                         <Text className="text-[#fff] font-bold text-[12px]">{item.player1.stats.extras}</Text>
//                       </View>
//                     </View>

//                     <View className="bg-[#FFFFFF99] w-[1px]"></View>

//                     <View className="flex-row items-center justify-between">
//                       <Image source={item.player2.imageSource} className="h-[15px] w-[15px] rounded-full" />
//                       <Text className="text-[14px] text-[#86d957]" style={{ fontFamily: 'Inter-Regular' }}>MVP</Text>
//                       <View className="bg-[#FFFDFD1F] w-[75px] rounded-2xl flex-row items-center space-x-2">
//                         <View className="border border-[#86d957] rounded-full">
//                           <Image source={item.player2.avatarSource} className="h-[22px] w-[22px] rounded-full" />
//                         </View>
//                         <Text className="text-[#fff] p-1">{item.player2.name}</Text>
//                       </View>
//                     </View>
//                   </View>
