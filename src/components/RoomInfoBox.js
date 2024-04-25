import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import Octicons from 'react-native-vector-icons/dist/Octicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';


const RoomInfoBox = ({ roomName, password }) => {
    const { width } = useWindowDimensions()
    const fontSize = width * 0.04;

    return (
        <View className="border-[1px] border-[#86D957] rounded-3xl p-4">
            <View className="flex-row">
                <Text className="text-[#fff]" style={{ fontFamily: 'Inter-Regular', fontSize: fontSize }}>Room Name:{' '}</Text>
                <Text className="text-[#fff]" style={{ fontFamily: 'Inter-Regular', fontSize: fontSize }}>
                    {roomName}
                </Text>
                <TouchableOpacity style={styles.infoBoxIcon}>
                    <Octicons name="paper-airplane" size={15} color="#fff" style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text className="text-[#fff]" style={{ fontFamily: 'Inter-Regular', fontSize: fontSize }}>Room Password:{' '}</Text>
                <Text className="text-[#86d957]" style={{ fontFamily: 'Inter-Regular', fontSize: fontSize }}>
                    {password}
                </Text>
                <TouchableOpacity style={styles.infoBoxIcon}>
                    <FontAwesome name="whatsapp" size={20} color="white" backgroundColor="green" style={{ borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: width * 0.03 }} className="text-white text-center mt-1 font-normal">
                Share your joining credentials with friends
            </Text>
        </View>
    )
}

export default RoomInfoBox

const styles = StyleSheet.create({
    infoBox: {
        borderColor: '#154015',
        borderWidth: 3,
        alignSelf: 'center',
        padding: 20,
        width: '90%',
        borderRadius: 20,
        marginBottom: 10
    },
    infoBoxIcon: {
        marginLeft: 'auto',
        marginBottom: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
})