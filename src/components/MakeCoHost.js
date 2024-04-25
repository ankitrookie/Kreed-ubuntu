import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../screens/RoomScreen/roomSlice';
import { makeCoHostAsync, selectCoHostLoading } from './Badminton/badmintionSlice';


const MakeCoHost = ({ selectedPlayers }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loading = useSelector(selectCoHostLoading);
    const user = useSelector(selectRoom);
    const [selectedUserId, setSelectedId] = useState('');
    console.log(selectedUserId);

    const handleCoHost = async () => {
        const roomId = user?.data?.id;
        try {
            const response = await dispatch(makeCoHostAsync({ roomId: roomId, userId: selectedUserId }));
            console.log("response from making co-host : ", response);
            if (response.payload.status) {
                showMessage({
                    message: "User is now a co-host!",
                    type: "success",
                    floating: true
                });
                navigation.navigate('SelectSpecificationOfCricket')
            } else {
                showMessage({
                    message: 'User is already a co-host or owner for this room!',
                    type: 'warning',
                    floating: true
                })
            }
        } catch (error) {
            showMessage({
                message: 'Error making cohost',
                type: 'danger',
                floating: true
            })
        }
    }

    const MemberList = ({ item }) => (
        <TouchableOpacity className="flex-row items-center flex-1 justify-between p-1">
            <Image source={require('../assets/images//MSD.jpg')} style={{ width: 25, height: 25, borderRadius: 25 }} />
            <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>{item?.fname}</Text>
            <BouncyCheckbox
                size={15}
                fillColor="#86d957"
                iconStyle={{ borderRadius: 10 }}
                innerIconStyle={{ borderRadius: 10, borderColor: 'white' }}
                onPress={() => { setSelectedId(item?.id) }}
            />
        </TouchableOpacity>
    );

    return (
        <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-2">
            <Text
                className="text-[16px] text-[#a9f77f] p-2"
                style={{ fontFamily: "Poppins-Regular" }}
            >
                Make Co-host from Opponent Team
            </Text>
            <View>
                <FlatList
                    data={selectedPlayers.secondTeam}
                    renderItem={MemberList}
                    numColumns={2}
                    keyExtractor={item => item.id}
                />
            </View>

            <TouchableOpacity className="p-4" onPress={handleCoHost}>
                <LinearGradient
                    colors={["#86D957", "#20341D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="rounded-[10px] p-2 self-end w-[40%]"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-[15px] text-white font-extrabold text-center" style={{ fontFamily: "Inter-Regular" }}>
                            Save
                        </Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default MakeCoHost;