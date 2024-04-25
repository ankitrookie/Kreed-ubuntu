import React, { useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import NextButton from './NextButton';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import Slides from './Slides';

import { useOnboardingStore } from '../../store/useAuthStore';

const OnBoarding = () => {
    const setOnboardingCompleted = useOnboardingStore((state) => state.setOnboardingCompleted);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    // This useRef creates a notee to hold our onViewableItemsChanged function.
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        // Check if theres at least one item currently visible on the screen.
        if (viewableItems.length > 0) {
            // Get the number of the first visible item and make sure it's a whole number.
            const currentIndex = Math.floor(viewableItems[0].index);
            console.log(currentIndex);
            // Update the current page index with the visible item's number.
            setCurrentPageIndex(currentIndex);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentPageIndex < Slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentPageIndex + 1 })
        } else {
            try {
                setOnboardingCompleted(true);
            } catch (error) {
                console.log(error, "error");
            }
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
            <LinearGradient
                colors={["#000", "#154015", "#154015", "#154015", "#154015", "#000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="items-center"
            >
                <View className="flex-[3]">
                    <FlatList
                        data={Slides}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <OnBoardingItem item={item} setOnboardingCompleted={setOnboardingCompleted} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        scrollEventThrottle={32}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                            useNativeDriver: false
                        })}
                        viewabilityConfig={viewConfig}
                        ref={slidesRef}
                        onViewableItemsChanged={onViewableItemsChanged}
                    />
                </View>

                <Paginator data={Slides} scrollX={scrollX} />
                <NextButton scrollTo={scrollTo} currentPageIndex={currentPageIndex} />
            </LinearGradient>
        </View>

    )
}

export default OnBoarding