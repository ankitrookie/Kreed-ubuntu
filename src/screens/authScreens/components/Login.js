import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// message
import { showMessage } from 'react-native-flash-message';

import { useDispatch, useSelector } from 'react-redux';
import { useAuthStore } from '../../../store/useAuthStore';
import themes from '../../../themes';
import {
  ActionButton,
  AuthTextInput,
  Paragraph,
  SubContainer,
} from '../../../ui';
import { validateEmail, validatePassword } from '../../../utils/validateInput';
import { loginAsync, selectLoginLoading } from '../authSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginLoading);
  const setUser = useAuthStore(state => state.setUser);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      showMessage({
        message: 'Please fill in all the fields!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      showMessage({
        message: 'Please enter a valid email id!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (!validatePassword(password)) {
      showMessage({
        message: 'Please enter a valid password!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    try {
      const response = await dispatch(loginAsync({email, password}));

      if (response.payload.message === 'login successfull') {
        showMessage({
          message: 'Login successfully!',
          type: 'success',
          floating: true,
        });
        setUser({
          user: response.payload.data,
        });
        setIsLoggedIn(true);
      } else if (!response.payload.success) {
        showMessage({
          message: 'Wrong Credentials',
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
      showMessage({
        showMessage: 'Something is wrong! Please check!',
        type: 'danger',
        floating: true,
      });
    }
  };

  return (
    <SubContainer style={{padding: 30}}>
      <Text className="text-white text-3xl font-bold shadow-white">LOGIN</Text>

      <AuthTextInput
        placeHolderText="Email or Phone Number"
        isPassword={false}
        onChangeText={text => setEmail(text)}
        value={email}
        customBorderRadius={20}
      />

      <AuthTextInput
        placeHolderText="Password"
        isPassword={true}
        onChangeText={text => setPassword(text)}
        value={password}
        customBorderRadius={20}
        width="90%"
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Paragraph
          style={{marginTop: 20, textAlign: 'center'}}
          textColor={themes.lightText}>
          Forgotten your password?
        </Paragraph>
      </TouchableOpacity>

      <ActionButton
        style={{paddingHorizontal: 64}}
        loading={loading}
        title="Login"
        onPress={handleLogin}
      />

      <View className="flex-row items-center justify-center mt-5">
        <Paragraph textColor={themes.lightText}>
          Don’t have an account?
        </Paragraph>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Paragraph textColor={themes.lightGreen}>Sign Up</Paragraph>
        </TouchableOpacity>
      </View>
    </SubContainer>
  );
};

export default Login;
