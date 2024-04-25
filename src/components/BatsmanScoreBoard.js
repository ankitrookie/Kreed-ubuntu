import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectGetScoreBoard } from './Cricket/cricketSlice';

const BatsmanScoreBoard = () => {
    const scoreboardData = useSelector(selectGetScoreBoard);

    const batsman = scoreboardData?.data[0]?.scores[0]?.cricScore;

    const filteredBatsman = batsman?.filter(item => !item?.isOut);

    const renderItem = ({ item }) => {
        const isStriker = item?.isStriker;
        return (
            <View>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View className={`flex-row items-center rounded-xl pr-2 bg-[#464B4E]`}>
                        <Image source={require('../assets/images/MSD.jpg')} style={{ width: 20, height: 20, borderRadius: 25, borderColor: '#86D957', borderWidth: 1 }} />
                        <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>{item?.fname}</Text>
                        {isStriker && <Text className="absolute right-0 text-[18px] bottom-1 text-[#86d957]">*</Text>}
                    </View>
                    <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>{item?.runs}</Text>
                    <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>({item?.ballfaced})</Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={filteredBatsman}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id}
        />
    );
};

export default BatsmanScoreBoard;

// 
