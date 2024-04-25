import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectedBowlingTeamData } from './Cricket/cricketSlice';

const ChooseBowler = () => {
    const teamData = useSelector(selectedBowlingTeamData);


    const renderItem = ({ item }) => (
        <TouchableOpacity className={`flex-1 justify-evenly rounded-md flex-row items-center w-[45%] m-2 p-1 bg-[#FFFFFF2B] }`}>
            <Image source={require("../assets/images/MSD.jpg")} style={{ height: 25, width: 25, borderRadius: 20 }} />
            <Text className="text-[#fff] text-[12px]"
                style={{ fontFamily: "Inter-Regular" }}>{item?.user?.fname}
            </Text>
        </TouchableOpacity>
    );

    const keyExtractor = item => item.id.toString();

    return (
        <View style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: 'black', borderColor: '#5eff00ab', borderWidth: 1 }}>

            <Text className="text-[18px] text-[#5eff00] p-2 text-center"
                style={{ fontFamily: "Poppins-Regular" }}>Choose Next Bowler
            </Text>

            <View>
                <FlatList
                    data={teamData?.players}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            </View>
        </View>
    )
}

export default ChooseBowler;

const styles = StyleSheet.create({
    StartGameButton: {
        backgroundColor: '#436A2E',
        alignItems: 'center',
        width: '40%',
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
        marginTop: 30
    },
    StartGameButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    LinearGradientStartGameButtonButton: {
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        width: '100%'
    },
    RunCircle: {
        borderColor: '#86D957',
        borderWidth: 1,
        borderRadius: 25,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    RunCircleText: {
        color: 'white'
    },
    Button: {
        borderColor: '#86D957',
        borderWidth: 1,
        borderRadius: 10,
        width: 83,
        alignItems: 'center',
        marginHorizontal: '1.21%',
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    },
})