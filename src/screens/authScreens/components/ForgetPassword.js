import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import themes from '../../../themes';
import {
  ActionButton,
  AuthTextInput,
  Paragraph,
  SubContainer,
} from '../../../ui';

const ForgetPassword = ({navigation}) => {
  const [username, setUserName] = useState();

  return (
    <SubContainer style={{padding: 30}}>
      <Paragraph
        textColor={themes.lightText}
        style={{textAlign: 'center', fontSize: 20}}>
        Trouble with logging in?
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
        Enter your email or phone number and we’ll send you a link to get back
        into your account
      </Paragraph>

      <AuthTextInput
        placeHolderText="Email or Phone Number"
        isPassword={false}
        onChangeText={text => setUserName(text)}
        value={username}
        customBorderRadius={20}
      />

      <ActionButton
        style={{paddingHorizontal: 64}}
        title="Send Link"
        onPress={() => {}}
      />

      <View className="flex-row items-center justify-center mt-5">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Paragraph textColor={themes.skyBlue}>Terms And Policy</Paragraph>
        </TouchableOpacity>
      </View>
    </SubContainer>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  Box: {
    backgroundColor: 'black',
    borderRadius: 40,
    width: 320,
    height: 360,
  },
  LoginHeading: {
    color: 'white',
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowRadius: 5,
  },
  TextInputBox: {
    backgroundColor: '#33363A',
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 40,
    paddingHorizontal: 15,
  },
  IconBox: {
    marginTop: 15,
    marginHorizontal: 50,
    backgroundColor: '#0D1D12',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  ForgetText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 15,
  },
  LoginButton: {
    backgroundColor: '#436A2E',
    paddingHorizontal: 5,
    paddingVertical: 7,
    alignItems: 'center',
    width: 150,

    borderRadius: 20,
    marginTop: 25,
  },
  LoginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
