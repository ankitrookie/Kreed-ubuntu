import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const OnBoardingItem = ({item, setOnboardingCompleted}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width * 0.9;

  const handleSkipButton = () => {
    setOnboardingCompleted(true);
  };

  return (
    <View style={[styles.container, {width}]}>
      {item.skip && (
        <TouchableOpacity
          className="absolute top-3 right-10"
          onPress={handleSkipButton}>
          <Text className="text-white bg-[#D9D9D933] p-2 rounded-full">
            {item.skip}
          </Text>
        </TouchableOpacity>
      )}
      <Image source={item.img} style={[styles.image, {width: imageWidth}]} />

      <View className="flex-[0.3]">
        <Text
          className="text-[#83D457] text-[28px] leading-normal text-center mb-[10px] mt-5"
          style={{fontFamily: 'Outfit-Regular'}}>
          {item.title}
        </Text>
        <Text
          className="text-center text-[#fff] text-[12px] font-normal leading-normal mb-5"
          style={{paddingHorizontal: 64, fontFamily: 'Inter-Regular'}}>
          {item.description}
        </Text>
        {item.description2 && (
          <Text
            className="text-center text-[#fff] text-[12px] font-normal leading-normal"
            style={{paddingHorizontal: 64, fontFamily: 'Inter-Regular'}}>
            {item.description2}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
    borderRadius: 50,
  },
});
