import React, { useEffect, useState } from 'react';

import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ConfirmPlayerInTeam, MakeCoHost, RoomHeader, RoomInfoBox, SelectPlayerForTeam } from "..";

import { useDispatch, useSelector } from 'react-redux';
import { getUserDataAsync, roomSlice, selectRoom, selectRoomDetails } from '../../screens/RoomScreen/roomSlice';

const MakeTeam = () => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState("select");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const roomDetails = useSelector(selectRoomDetails);
    const user = useSelector(selectRoom);
    const [selectedPlayers, setSelectedPlayers] = useState({
        firstTeam: [],
        secondTeam: []
    });

    console.log("selectedPlayers", selectedPlayers); 

    const userIds = roomDetails?.data?.userRoom?.map(item => item.userId);

    const fetchData = async () => {
        try {
            const response = await dispatch(getUserDataAsync(userIds));
            console.log("response", response);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const openModal = (team) => {
        setSelectedTeam(team);
        setModalVisible(true);
    };

    return (
        <View className="flex-1 bg-[#05080D] p-4">
            {/* Header */}
            <RoomHeader route={user?.data?.roomname} />

            <View className="mt-5">
                <RoomInfoBox roomName={user?.data?.roomname} password={user?.data?.password} />
            </View>

            <Text className="text-[#A9F77F] mt-5 text-[18px]" style={{ fontFamily: 'Poppins-Regular' }}>Choose Team</Text>

            <View className="flex-row justify-between mt-5">
                <TouchableOpacity onPress={() => openModal("Team 1")}>
                    <View className="p-[10px] border border-[#86d957] w-[152px] rounded-md">
                        <Text className="text-center text-[#fff] text-[18px] font-semibold" style={{ fontFamily: 'Inter-Regular' }}>Team 1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal("Team 2")}>
                    <View className="p-[10px] border border-[#86d957] w-[152px] rounded-md">
                        <Text className="text-center text-[#fff] text-[18px] font-semibold" style={{ fontFamily: 'Inter-Regular' }}>Team 2</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Select Player Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(false), setSelectedPlayers({ firstTeam: [], secondTeam: [] }), setStatus('select') }}>
                    <View className="flex-1 bg-[#00000017]"></View>
                </TouchableWithoutFeedback>
                {status === "select" ? <SelectPlayerForTeam status={status} setStatus={setStatus} team={selectedTeam} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} /> :
                    status === "confirm" ? <ConfirmPlayerInTeam status={status} setStatus={setStatus} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} /> :
                        status === "host" ? <MakeCoHost status={status} setStatus={setStatus} selectedPlayers={selectedPlayers} /> : null
                }
            </Modal>

        </View>
    )
}

export default MakeTeam;