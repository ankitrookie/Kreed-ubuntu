import { StyleSheet, Text, View, Image, FlatList, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectGetScoreBoard, selectSelectedSingleBowler, setBowlerCount } from './Cricket/cricketSlice';

const PlayerNameAndRunInScoreBoard = () => {
    const scoreboardData = useSelector(selectGetScoreBoard);

    const bowler = scoreboardData?.data[0]?.scores[1]?.cricScore;

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View>
                    <View className="flex-row items-center rounded-xl pr-2 bg-[#464B4E]">
                        <Image source={require('../assets/images/MSD.jpg')} style={{ width: 20, height: 20, borderRadius: 25, borderColor: '#86D957', borderWidth: 1 }} />
                        <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>{item?.fname}</Text>
                    </View>
                </View>
                <View className="text-white text-[12px] ml-2 flex-col">
                    <Text className="text-[#fff] text-center">O -</Text>
                    <Text className="text-[#5eff00]">{item?.ballBowled}</Text>
                </View>
                <View className="text-white text-[12px] ml-2">
                    <Text className="text-[#fff] text-center">R -</Text>
                    <Text className="text-[#5eff00]">{item?.runsConcided}</Text>
                </View>
                <View className="text-white text-[12px] ml-2">
                    <Text className="text-[#fff] text-center">W</Text>
                    <Text className="text-[#5eff00]">{item?.totalWicket}</Text>
                </View>
            </View>
        );
    };

    return (
        <>
            <FlatList
                data={bowler}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
            />
        </>
    )
}

export default PlayerNameAndRunInScoreBoard;