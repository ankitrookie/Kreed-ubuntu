import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon, Bars3BottomRightIcon, BookmarkIcon, CameraIcon, Cog6ToothIcon, InformationCircleIcon, MagnifyingGlassIcon, NoSymbolIcon, PaperAirplaneIcon, QrCodeIcon, ShareIcon, SunIcon, UserMinusIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import { RoomHeader } from "../../components";

const OthersProfile = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { item } = route.params;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="flex-1 bg-[#05080d]">
            <View className="flex-row justify-between p-4">
                <RoomHeader route="Ankit" />
                <View className="flex-row justify-center items-center space-x-5">
                    <TouchableOpacity onPress={() => { }}>
                        <MagnifyingGlassIcon
                            size={25}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Bars3BottomRightIcon size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-1 w-full">
                <Image
                    style={{ position: 'absolute', width: '100%' }}
                    source={require('../../assets/images/download.jpg')}
                />
                <View className="flex-row items-center justify-between">
                    <View className="mt-[28%] items-center p-2">
                        <Image
                            style={{
                                borderColor: '#86d957',
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                borderWidth: 2
                            }}
                            source={item.profile}
                        />
                        <Text style={{ fontFamily: 'Livvic-Regular' }} className="text-[#fff] text-[18px] font-medium leading-normal not-italic">
                            {item.userName}
                        </Text>
                    </View>

                    <TouchableOpacity className="mt-40 items-center p-4">
                        <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                            <Text style={{ color: 'white', fontFamily: 'Inter-Regular' }}>80</Text>
                        </View>
                        <Text style={{ fontFamily: 'Overlock-Regular' }} className="text-[#fff] text-[15px] leading-6 font-normal">Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-40 items-center p-4" onPress={() => navigation.navigate('FollowersFollowing', { Followers: "Followers" })}>
                        <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                            <Text style={{ color: 'white', fontFamily: 'Inter-Regular' }}>12k</Text>
                        </View>
                        <Text style={{ fontFamily: 'Overlock-Regular' }} className="text-[#fff] text-[15px] leading-6 font-normal">Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-40 items-center p-4" onPress={() => navigation.navigate('FollowersFollowing', { Following: "Following" })}>
                        <View className="h-[35] w-[35] bg-[#ADFA8261] rounded-lg border border-[#86D957] justify-center items-center">
                            <Text style={{ color: 'white', fontFamily: 'Inter-Regular' }}>30</Text>
                        </View>
                        <Text style={{ fontFamily: 'Overlock-Regular' }} className="text-[#fff] text-[15px] leading-6 font-normal">Following</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1">
                    <View className="px-4">
                        <Text style={{ fontFamily: 'Livvic-Regular' }} className="text-[#fff] leading-5 text-[14px] font-normal">
                            {item.description}
                        </Text>
                    </View>

                    {/* Edit Profile & Share Profile */}
                    <View className="flex-row space-x-4 p-4">
                        <View className="border border-[#86D957] p-2 rounded-lg">
                            <TouchableOpacity
                                onPress={() => { }}
                                className="items-center justify-center flex">
                                <Text style={{ fontFamily: 'livvic-Regular' }} className="text-[#fff] font-normal leading-normal">Following</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="border border-[#86D957] p-2 rounded-lg">
                            <TouchableOpacity className="flex-row items-center space-x-1">
                                <View className="rotate-[-45deg]">
                                    <PaperAirplaneIcon size={20} color="white" />
                                </View>
                                <Text style={{ fontFamily: 'livvic-Regular' }} className="text-[#fff] font-normal leading-normal">
                                    Message
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* middle line through  start*/}
                    <View className="border-b border-[#FFFFFF1A] pt-4"></View>
                    {/* middle line through  end*/}
                </View>
            </View>


            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={{ paddingBottom: 600 }}></View>
                </TouchableWithoutFeedback>

                <ScrollView className="flex-1 space-y-8 p-6 bg-[#05080d] border-t-2 rounded-2xl border-[#7BF13B42]">
                    {/* Share */}
                    <View className="flex-row item-center space-x-5">
                        <InformationCircleIcon color="white" size={25} />
                        <TouchableOpacity>
                            <Text className="text-[#fff] text-[18px] leading-normal" style={{ fontFamily: 'Inter-Regular' }}>Report</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Hide Post */}
                    <View className="flex-row item-center space-x-5">
                        <NoSymbolIcon color="white" size={25} />
                        <TouchableOpacity>
                            <Text className="text-[#fff] text-[18px] leading-normal" style={{ fontFamily: 'Inter-Regular' }}>UnBlock</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Notification */}
                    <View className="flex-row item-center space-x-5">
                        <UserMinusIcon color="white" size={25} />
                        <TouchableOpacity>
                            <Text className="text-[#fff] text-[18px] leading-normal" style={{ fontFamily: 'Inter-Regular' }}>UnFollow</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Report */}
                    <View className="flex-row item-center space-x-5">
                        <ShareIcon name="report" color="white" size={25} />
                        <TouchableOpacity>
                            <Text className="text-[#fff] text-[18px] leading-normal" style={{ fontFamily: 'Inter-Regular' }}>Share Profile</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Modal>
        </View>
    );
};

export default OthersProfile;
