import React from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { selectUserData } from "../screens/RoomScreen/roomSlice";

const SelectPlayerForTeam = ({ setStatus, setSelectedPlayers, selectedPlayers, team }) => {
    const userData = useSelector(selectUserData);

    const togglePlayerSelection = (user) => {
        console.log("userDetails", user.fname);
        setSelectedPlayers((prevState) => {
            const teamKey = team === "Team 1" ? "firstTeam" : "secondTeam";

            const isUserSelected = prevState[teamKey].some((selectedUser) => selectedUser?.id === user?.id);

            const updatedTeam = isUserSelected
                ? prevState[teamKey].filter((selectedUser) => selectedUser?.id !== user?.id)
                : [...prevState[teamKey], { id: user?.id, fname: user?.fname, profile: user?.profile }];

            const otherTeamKey = team === "Team 1" ? "secondTeam" : "firstTeam";
            const remainingPlayers = userData.filter((userData) => !updatedTeam.some((selectedUser) => selectedUser?.id === userData?.data?.id));

            const updatedOtherTeam = remainingPlayers.map((userData) => ({
                id: userData?.data?.id,
                fname: userData?.data?.fname,
                profile: userData?.data?.profile,
            }));

            return {
                ...prevState,
                [teamKey]: updatedTeam,
                [otherTeamKey]: updatedOtherTeam,
            };
        });
    };


    const MemberList = ({ item }) => (
        <View className="flex-row items-center flex-1 justify-between p-1">
            <Image
                source={require("../assets/images/MSD.jpg")}
                style={{ width: 24, height: 25, borderRadius: 25 }}
            />

            <Text className="text-[#fff] text-[12px]" style={{ fontFamily: "Inter-Regular" }}>
                {item?.data?.fname}
            </Text>
            <BouncyCheckbox
                size={15}
                fillColor="#86d957"
                iconStyle={{ borderRadius: 0 }}
                innerIconStyle={{ borderRadius: 0, borderColor: 'white' }}
                onPress={() => togglePlayerSelection(item.data)}
            />
        </View>
    );

    return (
        <View className="bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42] p-2">
            <View className="flex-row justify-between items-center">
                <Text
                    className="text-[16px] text-[#a9f77f] p-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                >
                    {`Select Player For Team ${team === "Team 1" ? '1' : '2'}`}
                </Text>

                <Text
                    className="text-[16px] text-[#a9f77f] p-2"
                    style={{ fontFamily: "Poppins-Regular" }}
                >
                    No of Players : {selectedPlayers[team === "Team 1" ? "firstTeam" : "secondTeam"].length} / 6
                </Text>
            </View>
            <View>
                <FlatList
                    data={userData}
                    renderItem={MemberList}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    keyExtractor={(item) => item.data.id}
                    ListFooterComponent={() => (
                        <TouchableOpacity className="p-4"
                            onPress={() => setStatus("confirm")}
                        >
                            <LinearGradient
                                colors={["#86D957", "#20341D"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="rounded-[10px] p-2 self-end w-[40%]"
                            >
                                <Text className="text-[15px] text-white font-extrabold text-center" style={{ fontFamily: "Inter-Regular" }}>
                                    Save
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default SelectPlayerForTeam;
