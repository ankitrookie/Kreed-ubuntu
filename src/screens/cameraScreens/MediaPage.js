import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const MediaPage = ({ navigation }) => {
  function handleButtonClick() {
    try {
      navigation.navigate("CameraPage");
    } catch (error) {
      console.error("An error occurred in handleButtonClick:", error);
    }
  }
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="bg-blue-900 p-4  rounded-xl"
        onPress={handleButtonClick}
      >
        <Text className="text-white">Go Backkkk</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MediaPage;
