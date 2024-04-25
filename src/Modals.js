import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  
  const Modals = ({ visible, onRequestClose, content }) => {
    return (
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        onRequestClose={onRequestClose}
      >
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.2)", flex: 1 }}></View>
        </TouchableWithoutFeedback>
  
        <View className="bg-[#05080d] border-t-2 rounded-t-md border-[#7BF13B42] p-4 space-y-4">
          {content.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row item-center space-x-5"
              onPress={item.onPress}
            >
              {item.icon}
              <View>
                <Text
                  className="text-[#fff] text-[18px] leading-normal"
                  style={{ fontFamily: "Inter-Regular" }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  };
  
  export default Modals;
  