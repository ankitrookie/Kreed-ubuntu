import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";

// icons 
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import { NotificationData } from "../../constants/index"
import { useNavigation } from "@react-navigation/native";
import { RoomHeader } from "../../components";

// device width
const windowWidth = Dimensions.get('window').width;

const Notification = () => {
    const navigation = useNavigation();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalValue, setModalValue] = useState('');
    const [modalVisible, setVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const handleShare = () => {
        Share.share({
            message: 'Check out this amazing content!', // The content you want to share
        })
            .then((result) => {
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        console.log('Content shared successfully');
                    } else {
                        console.log('Share dismissed');
                    }
                } else if (result.action === Share.dismissedAction) {
                    console.log('Share dismissed');
                }
            })
            .catch((error) => {
                console.log('Share error:', error);
            });
    };

    return (
        <View className="flex-1 bg-[#05080D]">
            <View className="p-4">
                <RoomHeader route='Notification' />
            </View>

            {/* <View className="flex-row justify-center items-center mt-20">
                <Text className="text-[#8d8c8c] text-[30px]">No Notification yet..</Text>
            </View> */}

            {/* Notification */}
            <FlatList
                data={NotificationData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="flex-row flex-1 justify-between px-4 py-2">
                        <View className="flex-row ">
                            <TouchableOpacity>
                                <View className="border border-[#fff] rounded-full">
                                    <Image
                                        style={{ width: 30, height: 30, borderRadius: 25, borderWidth: .5, padding: 0 }}
                                        source={item.image1}
                                    />
                                </View>
                                {item.image2 && (
                                    <View className="absolute top-0 left-5 border border-[#fff] rounded-full">
                                        <Image
                                            style={{ width: 30, height: 30, borderRadius: 25, borderWidth: .5, padding: 0 }}
                                            source={item.image2}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setVisible(true)} className="w-[210px] items-center">
                            <Text className="text-white text-[14px]" style={{ fontFamily: 'Poppins-Regular' }}>
                                {item.dis}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }} className={`h-[27px] w-[72px] items-center justify-center ${item.followed ? 'bg-[#F9FDF71F]' : 'bg-[#86D957]'} rounded-lg`}>
                            <Text className="text-white text-[12px]">{item.followed ? 'Following' : 'View'}</Text>
                        </TouchableOpacity>
                    </View>
                )} />

            {/* notification modal */}
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={[styles.ModalOverlay, { paddingBottom: modalValue == "options" ? 300 : 10 }]}></View>
                </TouchableWithoutFeedback>
                {modalValue === 'notification' ? (

                    <View style={styles.Modal}>
                        <View style={styles.ModalContainer}>
                            <View
                                style={{
                                    backgroundColor: '#0c0f14',
                                    width: '98%',
                                    height: 50,
                                    borderRadius: 10,
                                    margin: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ width: 35, height: 35, borderRadius: 17.5, marginLeft: 10 }}
                                    source={require("../../assets/images/download1.png")}
                                />
                                <Text style={{ color: 'white', fontSize: 17, marginLeft: 10 }}>
                                    Ankit
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }}>
                                    <AntDesign name="adduser" size={30} color="green" />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#0c0f14',
                                    width: '98%',
                                    height: 50,
                                    borderRadius: 10,
                                    margin: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ width: 35, height: 35, borderRadius: 17.5, marginLeft: 10 }}
                                    source={require('../../assets/images/download1.png')}
                                />
                                <Text style={{ color: 'white', fontSize: 17, marginLeft: 10 }}>
                                    Sampati Datta
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }}>
                                    <AntDesign name="adduser" size={30} color="green" />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#0c0f14',
                                    width: '98%',
                                    height: 50,
                                    borderRadius: 10,
                                    margin: 2,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ width: 35, height: 35, borderRadius: 17.5, marginLeft: 10 }}
                                    source={require('../../assets/images/download1.png')}
                                />
                                <Text style={{ color: 'white', fontSize: 17, marginLeft: 10 }}>
                                    Sampati Datta
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }}>
                                    <AntDesign name="adduser" size={30} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <ScrollView style={[{ paddingTop: 20, height: 250, backgroundColor: "black", borderWidth: 1, borderTopColor: 'green', borderRadius: 10 }]}>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="block" color="white" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Block</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="share" color="white" size={25} />
                            <TouchableOpacity onPress={handleShare}><Text style={[styles.Text, { marginLeft: 20 }]}>Share Profile</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="save" color="white" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Save</Text></TouchableOpacity>
                        </View>

                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="notifications-active" color="white" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Notification for this post </Text></TouchableOpacity>
                            <Switch

                                trackColor={{ false: '#70b64a', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : 'rgba(255,255,255,0.9)'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="edit" color="white" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Edit Post</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="report" color="red" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Report</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.flex, { marginLeft: 40, marginRight: 'auto', marginBottom: 10 }]}>
                            <MaterialIcon name="delete-outline" color="red" size={25} />
                            <TouchableOpacity><Text style={[styles.Text, { marginLeft: 20 }]}>Delete</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
                {modalValue === 'notification' && (
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.ModalOverlay}></View>
                    </TouchableWithoutFeedback>
                )}
            </Modal>
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    LinearGradientButton: {
        borderRadius: 20,
        alignItems: 'center',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ModalContainer: {
        width: '90%',
        height: 230,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Modal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        height: 250,
        backgroundColor: 'black',
    },
    ModalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,

        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',
    },
    NavbarIcon: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    LoginButton: {
        backgroundColor: '#436A2E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        width: 200,
        marginLeft: 55,
        borderRadius: 20,
        marginTop: 15,
    },
    LoginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    Text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});
