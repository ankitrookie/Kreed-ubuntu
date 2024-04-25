import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { cricketGameAsync, selectCricketLoading } from './Cricket/cricketSlice';

const ConfirmPlayerInTeam = ({ selectedPlayers, setStatus, setSelectedPlayers }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectRoom);
    const loading = useSelector(selectCricketLoading);

    const MemberList = ({ item }) => (
        <TouchableOpacity className="flex-row items-center flex-1 justify-between p-1">
            <Image
                source={require("../assets/images/MSD.jpg")}
                style={{ width: 24, height: 25, borderRadius: 25, marginRight: 10 }}
            />
            <Text
                className="text-[#fff] text-[12px]"
                style={{ fontFamily: "Inter-Regular" }}
            >
                {item?.fname}
            </Text>
        </TouchableOpacity>
    );

    const handleCricketTeam = async () => {
        const roomId = user?.data?.id;
        const roomPlayers1 = selectedPlayers?.firstTeam?.map(player => player?.id);
        const roomPlayers2 = selectedPlayers?.secondTeam?.map(player => player?.id);
        const roomPlayers = {
            team1PlayerIds: roomPlayers1,
            team2PlayerIds: roomPlayers2
        };
        try {
            const response = await dispatch(cricketGameAsync({ roomId, roomPlayers }));
            console.log("Created Team Response", response);
            if (response.payload.status) {
                showMessage({
                    message: 'Cricket Team Created Successfully!',
                    type: 'success',
                    floating: true
                });
                setStatus('host')
            } else {
                showMessage({
                    message: 'Failed to create Team! Try Again..',
                    type: 'danger',
                    floating: true
                })
            }
        } catch (error) {
            showMessage({
                message: "Failed to create Team! Try Again..",
                type: "danger",
                floating: true
            })
        }
    }


    return (
        <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-2">
            <Text className="text-[16px] text-[#a9f77f] p-2" style={{ fontFamily: "Poppins-Regular" }}>
                Confirm Team 1 and Team 2
            </Text>
            <View className="flex-row justify-between p-2">
                <View>
                    <View className="text-white border border-[#86D957] rounded-md m-2">
                        <Text className="text-[#fff] text-center" style={{ fontFamily: 'Poppins-Regular' }}>Team 1</Text>
                    </View>
                    <FlatList
                        data={selectedPlayers.firstTeam}
                        renderItem={MemberList}
                        numColumns={1}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View>
                    <View className="text-white border border-[#86D957] rounded-md m-2">
                        <Text className="text-[#fff] text-center" style={{ fontFamily: 'Poppins-Regular' }}>Team 2</Text>
                    </View>
                    <FlatList
                        data={selectedPlayers.secondTeam}
                        renderItem={MemberList}
                        numColumns={1}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>

            {/* buttons */}
            <View className="flex-row justify-between p-2">
                <TouchableOpacity onPress={() => {setStatus("select"), setSelectedPlayers({ firstTeam: [], secondTeam: [] })}} className="w-[40%]">
                    <LinearGradient colors={['#20341D', '#86D957']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="text-white items-center py-2 rounded-lg">
                        <Text className="text-[15px] text-white font-extrabold text-center" style={{ fontFamily: "Inter-Regular" }}>Undo</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCricketTeam} className="w-[40%]">
                    <LinearGradient colors={['#86D957', '#20341D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="text-white items-center py-2 rounded-lg">
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-[15px] text-white font-extrabold text-center" style={{ fontFamily: "Inter-Regular" }}>Confirm</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )
};

export default ConfirmPlayerInTeam;