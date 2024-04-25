
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RoomHeader from './RoomHeader';


const EndLiveRoom = ({ setvalue }) => {
    const navigation = useNavigation();
    const [status, setstatus] = useState("m");

    const data = [
        { id: 1, playerName: 'Player 1' },
        { id: 2, playerName: 'Player 2' },
        { id: 3, playerName: 'Player 3' },
        { id: 4, playerName: 'Player 4' },
        { id: 5, playerName: 'Player 5' },
        { id: 6, playerName: 'Player 1' },
        { id: 7, playerName: 'Player 2' },
        { id: 8, playerName: 'Player 3' },
        { id: 9, playerName: 'Player 4' },
        { id: 10, playerName: 'Player 5' },
    ];
    const chooseGame = "Cricket";

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={require("../assets/images/MSD.jpg")} style={{ height: 30, width: 30, borderRadius: 20 }} />
            <Text style={styles.playerName}>{item.playerName}</Text>
        </View>
    );

    return (
        <View className="bg-[#05080D] flex-1">
            <View className="p-4">
                <RoomHeader route="Ankit Mukhia" />
            </View>
            <LinearGradient
                colors={['#afec8b2d', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1 rounded-3xl mx-4"
            >
                <View className="rounded-lg w-[100%] flex-1">
                    <View className="flex-row justify-between p-4">
                        <Text className="text-[#86D957] font-bold text-[14px]">Team 1</Text>
                        <View>
                            <Text className="text-[#fff] font-bold text-[14px]">104/3</Text>
                            <Text className="text-[#fff] font-bold text-[14px]">8 overs</Text>
                        </View>
                        <View className="flex-col justify-center items-center">
                            <MaterialCommunity name="trophy" size={20} color="gold" />
                            <Text className="text-[#FEC119] text-[11px]">Won</Text>
                            <Text className="text-[#FEC119] text-[11px]">Against</Text>
                        </View>

                        <View>
                            <Text className="text-[#fff] font-bold text-[14px]">139/3</Text>
                            <Text className="text-[#fff] font-bold text-[14px]">8 overs</Text>
                        </View>
                        <Text className="text-[#86D957] font-bold text-[14px]">Team 2</Text>
                    </View>

                    <View className="p-4 space-y-4">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center space-x-2">
                                <View className="border border-[#86d957] rounded-full">
                                    <Image source={require('../assets/images/saina.png')} className="h-[25px] w-[25px] rounded-full" />
                                </View>
                                <Text className="text-[#fff] text-[12px] font-normal" style={{ fontFamily: 'Inter-Regular' }}>Ankit{" "}<Text>36* (14)</Text></Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                <View className="border border-[#86d957] rounded-full">
                                    <Image source={require('../assets/images/saina.png')} className="h-[25px] w-[25px] rounded-full" />
                                </View>
                                <Text className="text-[#fff] text-[12px] font-normal" style={{ fontFamily: 'Inter-Regular' }}>Ankit{" "}<Text>36* (14)</Text></Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center space-x-2">
                                <View className="border border-[#86d957] rounded-full">
                                    <Image source={require('../assets/images/saina.png')} className="h-[25px] w-[25px] rounded-full" />
                                </View>
                                <Text className="text-[#fff] text-[12px] font-normal" style={{ fontFamily: 'Inter-Regular' }}>Ankit{" "}<Text>36* (14)</Text></Text>
                            </View>
                            <View className="flex-row items-center space-x-2">
                                <View className="border border-[#86d957] rounded-full">
                                    <Image source={require('../assets/images/saina.png')} className="h-[25px] w-[25px] rounded-full" />
                                </View>
                                <Text className="text-[#fff] text-[12px] font-normal" style={{ fontFamily: 'Inter-Regular' }}>Ankit{" "}<Text>36* (14)</Text></Text>
                            </View>
                        </View>
                    </View>

                    <View className="space-y-4">
                        <View className="flex-row justify-center">
                            <View className="flex-row items-center space-x-4 border border-[#86d957] px-4 py-1 rounded">
                                <MaterialCommunity name="trophy" size={20} color="gold" />
                                <Text className="text-[#fff] text-[14px]">Team 1 Won by 32 Runs</Text>
                                <MaterialCommunity name="trophy" size={20} color="gold" />
                            </View>
                        </View>

                        <View className="flex-row justify-center">
                            <View className="flex-row space-x-2 items-center border border-[#86d957] p-2 rounded-xl">
                                <Image source={require('../assets/images/emojione_sports-medal.png')} className="h-[15px] w-[15px] rounded-full" />
                                <Text className="text-[14px] text-[#86d957]" style={{ fontFamily: 'Inter-Regular' }}>MVP</Text>
                                <View className="bg-[#FFFDFD1F] w-[75px] rounded-2xl flex-row items-center space-x-2">
                                    <View className="border border-[#86d957] rounded-full">
                                        <Image source={require('../assets/images/saina.png')} className="h-[22px] w-[22px] rounded-full" />
                                    </View>
                                    <Text className="text-[#fff] p-1">Guru</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row justify-center">
                            <TouchableOpacity className="border border-[#FFED47] px-6 py-2 rounded-lg bg-[#1eff3c1f]">
                                <Text className="text-center text-[#86d957] font-bold">View Full ScoreCode</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>


            <View className="flex-row justify-between items-center p-4">
                <TouchableOpacity className="border py-1 w-[45%] rounded-xl border-[#86d957]">
                    <Text className="text-center text-[#8fe25e]">Rematch</Text>
                    <Text className="text-[#fff] text-[16px] font-bold text-center">Same Team</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border py-1 w-[45%] rounded-xl border-[#86d957]">
                    <Text className="text-center text-[#86d957]">Rematch</Text>
                    <Text className="text-[#fff] text-[16px] font-bold text-center">Different Team</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                className="m-6"
                onPress={() => navigation.navigate("PublishReview", { chooseGame })}
            >
                <LinearGradient
                    colors={['#86D957', '#00000000',]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="p-4 items-center rounded-xl"
                >
                    <Text className="text-[#fff] text-[16px] font-bold" style={{ fontFamily: 'Inter-Regular' }}>End Live Room</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
    item: {
        borderColor: "#86d957",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
        width: 150,
        justifyContent: "space-evenly",
        borderWidth: .7,
        margin: 5
    },
    Text: {
        color: 'white',
        fontSize: 16,
    },
    table: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'green',
    },
    headerCell: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 3,
        fontWeight: 'bold',
        color: 'white',

    },
    cell: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 3,
        color: 'white',
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    playerName: {
        fontSize: 15,

        color: "rgba(255,255,255,.8)"
    },
    NextButton: {
        backgroundColor: '#436A2E',
        alignItems: 'center',
        width: '85%',
        borderRadius: 10,
        alignSelf: 'center',
    },
    LoginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    LinearGradientButton: {
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '100%',
    },

})

export default EndLiveRoom