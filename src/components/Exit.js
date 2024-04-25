import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';


const Exit = ({  onConfirm, onCancel }) => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: 'rgba(0,0,0,.5)',
        width: '100%',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '90%',
          backgroundColor: 'black',
          borderWidth: 0.5,
          borderColor: 'green',
          borderRadius: 20,
          marginRight: 'auto',
          marginLeft: 'auto',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 65,
            height: 65,
            borderRadius: 35,
            backgroundColor: '#86d957',
            marginTop: -35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="exit-outline" color="white" size={27} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 18, width: '90%', marginTop: 20 }}>
          Are you sure you would like to Leave Room?
        </Text>
        <View style={{ flex: 1, flexDirection: "row", width: "90%", marginTop: 40 }}>
          <TouchableOpacity onPress={onConfirm} style={{ backgroundColor: "#d9d9d9", width: 45, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginLeft: 'auto' }}><Text style={{ color: "black" }}>Yes</Text></TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={{ backgroundColor: "#d9d9d9", width: 45, height: 25, borderRadius: 5, justifyContent: "center", alignItems: "center", marginLeft: 20 }}><Text style={{ color: "black" }}>No</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Exit;
