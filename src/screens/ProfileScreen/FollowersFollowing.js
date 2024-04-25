import { View, Text } from 'react-native'
import React from 'react'
import { RoomHeader } from '../../components'

const FollowersFollowing = ({ route }) => {
    const { Followers, Following } = route.params;
    console.log(Followers, Following);
    return (
        <View className="flex-1 bg-[#05080d]">
            <View className="p-4">
                <RoomHeader route={"Ankit Mukhia"} />
            </View>

        {Followers && (
            <View>
                <Text className="text-white">Followers</Text>
            </View>
        )}

        {Following && (
            <View>
                <Text className="text-white">Following</Text>
            </View>
        )}
        </View>
    )
}

export default FollowersFollowing