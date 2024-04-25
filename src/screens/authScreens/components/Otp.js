import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import themes from '../../../themes';
import {
  ActionButton,
  AuthTextInput,
  Paragraph,
  SubContainer,
} from '../../../ui';
import {
  otpAsync,
  selectOtpLoading,
  selectPhoneNumber,
  selectUser,
  sendOtpAsync,
  setToken,
  setid,
} from '../authSlice';

const Otp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storedPhoneNumber = useSelector(selectPhoneNumber);
  const loading = useSelector(selectOtpLoading);
  const [otp, setOtp] = useState(null);

  // new resent otp
  const [newlySentOtp, setNewlySentOtp] = useState(null);

  const confirmCode = async () => {
    if (otp === '') {
      showMessage({
        message: 'Please fill in fields!',
        type: 'warning',
        floating: true,
      });
      return;
    }
    try {
      const response = await dispatch(
        otpAsync({otp, phonenumber: storedPhoneNumber}),
      );

      if (response.payload.status) {
        showMessage({
          message: 'OTP Authentication successful.',
          type: 'success',
          floating: true,
        });
        navigation.navigate('ProfileDetail');
        dispatch(setid(response.payload.data.id));
      } else if (response.payload.message == 'Invalid OTP') {
        showMessage({
          message: 'Invalid OTP',
          type: 'warning',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Something is wrong!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        showMessage: 'Something is wrong! Please check!',
        type: 'danger',
        floating: true,
      });
    }
  };

  // Todod:
  const resendOtp = async () => {
    try {
      const response = await dispatch(
        sendOtpAsync({phonenumber: storedPhoneNumber}),
      );
      if (response.payload.otp) {
        showMessage({
          message: 'OTP resent successfully',
          type: 'info',
          floating: true,
        });
        setNewlySentOtp(response.payload.otp);
      } else if (!response.payload.otp) {
        showMessage({
          message: 'Something is wrong! Please check!',
          type: 'danger',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Something is wrong!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubContainer style={{padding: 30}}>
      <Paragraph
        textColor={themes.lightText}
        style={{textAlign: 'center', fontSize: 20}}>
        OTP Authentication
      </Paragraph>

      <Paragraph
        textColor={themes.lightText}
        style={{
          textAlign: 'center',
          fontSize: 12,
          paddingHorizontal: 30,
          fontFamily: 'Inter-Regular',
          marginTop: 20,
        }}>
        We have sent a code to
      </Paragraph>

      <Text className="text-[#FFFFFF] text-[20px] text-center">
        {storedPhoneNumber}
      </Text>

      <Paragraph
        textColor={themes.gray}
        style={{
          textAlign: 'center',
          fontSize: 14,
          paddingHorizontal: 10,
          fontFamily: 'Inter-Regular',
          marginTop: 20,
        }}>
        Please enter OTP which has been sent to your Phone
      </Paragraph>

      <AuthTextInput
        placeHolderText="OTP"
        isPassword={false}
        value={otp}
        onChangeText={text => setOtp(text)}
        customBorderRadius={5}
      />

      <TouchableOpacity onPress={resendOtp}>
        <Text
          className="text-[10px] self-end text-[#86D957]"
          style={{fontFamily: 'Inter-Regular'}}>
          Resend
        </Text>
      </TouchableOpacity>

      <ActionButton
        style={{paddingHorizontal: 40}}
        loading={loading}
        title="Create My Account"
        onPress={confirmCode}
        fontSizeStyle={15}
      />
    </SubContainer>
  );
};

export default Otp;
