import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { HostLivePlayroomChooseModal, RoomHeader } from "../../components";

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthStore } from '../../store/useAuthStore';
import { getRoomDetailsAsync, leaveRoomAsync, selectJoinRoom, selectLeaveLoading, selectRoomDetails } from '../RoomScreen/roomSlice';

const JoinTeam = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const myUser = useAuthStore((state) => state.user);
    const loading = useSelector(selectLeaveLoading)
    const user = useSelector(selectJoinRoom);
    const roomDetails = useSelector(selectRoomDetails);
    console.log("RoomDetails", roomDetails);
    const [refreshing, setRefreshing] = useState(false);

    const roomId = user?.data?.id;
    const allUsers = roomDetails?.data?.userRoom;

    const allCoHosts = roomDetails?.data?.coHosts?.map(userId => userId?.userId);
    const isUserCoHost = allUsers?.some(user => allCoHosts?.includes(user?.userId));

    const fetchData = async () => {
        try {
            await dispatch(getRoomDetailsAsync(roomId));

        } catch (error) {
            showMessage({
                message: 'Not able to get the data. Try Again please!',
                type: 'danger',
                floating: true
            })
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);


    // refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            if (roomDetails && roomDetails.room && roomDetails.data.id) {
               const response =  await dispatch(getRoomDetailsAsync(roomId));
               console.log(response);
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLeaveRoom = async () => {
        try {
            const response = await dispatch(leaveRoomAsync({ roomId: user.joinedRoom.id, userId: myUser.user.id }))
            console.log("Leave Room Response", response);
            if (response.payload.success) {
                showMessage({
                    message: "Lived Room Successfully!",
                    type: "success",
                    floating: true
                });
                navigation.goBack();
            } else {
                showMessage({
                    message: "Failed to leave Room! Try Again..",
                    type: "danger",
                    floating: true
                })
            }
        } catch (error) {
            showMessage({
                message: 'Error leaving room',
                type: 'danger',
                floating: true
            })
        }
    }

    const MemberList = ({ item }) => {
        return (
            <TouchableOpacity style={{ width: '50%', padding: 6 }}>
                <LinearGradient
                    colors={['#EFF30F', '#308400']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 6,
                        borderRadius: 8,
                    }}>
                    <Image
                        source={require("../../assets/images/MSD.jpg")}
                        style={{ width: 22, height: 22, borderRadius: 25 }}
                    />

                    <Text
                        numberOfLines={1}
                        style={{ color: 'black', fontSize: 14, marginLeft: 5 }}>
                        {item?.myUser?.fname}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    };

    const navigateToScoreBoarding = () => {
        if (user?.joinedRoom?.isGameStarted) {
            navigation.navigate("ScoreBoarding");
        } else {
            showMessage({
                message: "Game is not started yet!",
                type: "danger",
                floating: true
            })
        }

    }

    return (
        <View className="flex-1 bg-[#05080D] p-4">
            {/* Navbar */}
            <RoomHeader route={user?.joinedRoom?.roomname} showConfirmation={true} />


            {/* {isUserCoHost && (
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity className="mb-5" onPress={navigateToScoreBoarding}>
                        <LinearGradient
                            colors={["#62BD6B", "#517355", "#343D35"]}
                            start={{ x: 0.2, y: 0 }}
                            className="rounded-lg border border-[#5a5a5a]"
                        >
                            <View className="flex-row justify-center items-center w-[100] h-[35]">
                                <Text className="text-white">Admin Access</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity className="absolute justify-center items-center top-10 pl-[100px]">
                        <InformationCircleIcon size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            )} */}

            <View className="mt-4">
                <FlatList
                    data={allUsers}
                    renderItem={MemberList}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => (
                        <HostLivePlayroomChooseModal modal={modal} setModal={setModal} />
                    )}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}>
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}></View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        height: 200,
                        backgroundColor: 'rgba(0,0,0,.5)',
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            width: '90%',
                            backgroundColor: 'black',
                            borderWidth: 0.5,
                            borderColor: 'green',
                            borderRadius: 20,
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 35,
                                backgroundColor: '#86d957',
                                marginTop: -35,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Ionicons name="exit-outline" color="white" size={27} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 18, width: '90%', marginTop: 20 }}>
                            Are you sure you would like to Leave Room?
                        </Text>
                        {loading ? (
                            <View className="flex-1 flex-row justify-end w-[90%] mt-10">
                                <Text className="text-[14px] text-[#d9d9d9]">Wait...</Text>
                            </View>
                        ) : (
                            <View style={{ flex: 1, flexDirection: "row", width: "90%", marginTop: 40 }}>
                                <TouchableOpacity className="bg-[#d9d9d9] w-[45px] h-[25px] rounded-md justify-center items-center ml-auto" onPress={handleLeaveRoom}>
                                    <Text style={{ color: "black" }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-[#d9d9d9] w-[45px] h-[25px] rounded-md justify-center items-center ml-5" onPress={() => setModal(false)}>
                                    <Text style={{ color: "black" }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}></View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

export default JoinTeam;