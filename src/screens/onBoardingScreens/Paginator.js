import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React from 'react'

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View className="flex-row h-16">
            {data.map((_, i) => {
                // this is the var for the input range
                // it says current index - 1 times the width, index times the width, index - 1 times a width
                // this correspond to the previous dot the current dot and the next dot
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 10, 10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    // this extrapolate, is responsible for showing the total slid we need to slid, if it is not set, it will only show the current slide nad upcoming slide
                    extrapolate: 'clamp',
                })

                return (
                    <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />
                )
            })}
        </View>
    )
}

export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 8,
    }
})