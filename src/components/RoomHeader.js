import { StyleSheet, Text, View, TouchableOpacity, Linking, Modal, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';

//icons
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Exit from './Exit';
import { useState } from 'react';

const RoomHeader = ({ route, showConfirmation, setMakeCohostModal }) => {
    const { goBack } = useNavigation();
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const handleBack = () => {
        if (showConfirmation) {
            setConfirmationVisible(true);
        } else {
            goBack();
        }
    };

    const confirmBack = async () => {
        setConfirmationVisible(false);
        setMakeCohostModal(true);
    };

    const cancelBack = () => {
        setConfirmationVisible(false);
    };

    return (
        <View className="flex-row justify-between items-center">
            <View className="flex-row space-x-6">
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-back-outline" size={25} color="#fff" />
                </TouchableOpacity>
                <Text className="text-[#fff] text-[18px]" style={{ fontFamily: 'Poppins-Regular' }}>{route}{" "} room's</Text>

                <Modal
                    animationType="slide"
                    transparent={true}
                    // visible={true}
                    visible={isConfirmationVisible}>
                    <TouchableWithoutFeedback onPress={() => setConfirmationVisible(false)}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}></View>
                    </TouchableWithoutFeedback>
                    <Exit onConfirm={confirmBack}
                    onCancel={cancelBack}  />
                    <TouchableWithoutFeedback onPress={() => setConfirmationVisible(false)}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}></View>
                    </TouchableWithoutFeedback>

                </Modal>

            </View>
        </View>
    )
}

export default RoomHeader;