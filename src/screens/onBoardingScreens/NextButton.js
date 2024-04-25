import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'

const NextButton = ({ scrollTo, currentPageIndex }) => {
    const { width } = useWindowDimensions()
    return (
        <View className="flex-row h-20">
        <TouchableOpacity onPress={scrollTo} style={{ width, paddingHorizontal: 64 }}>
            <LinearGradient
                colors={['#86D957', '#060606A3',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="p-5 rounded-full"
            >
                <Text className="text-[#fff] text-[20px] text-center" style={{ fontFamily: 'Outfit-Regular' }}>{currentPageIndex === 3 ? 'Finish' : 'Next'}</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    )
}

export default NextButton