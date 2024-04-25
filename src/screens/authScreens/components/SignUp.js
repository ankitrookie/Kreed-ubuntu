import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// gradient

// input validation
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../../utils/validateInput';

// message
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
  selectError,
  selectLoading,
  setPhoneNumber,
  setotp,
  signUpUserAsync,
} from '../authSlice';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [passwordShow, setPasswordShow] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    phonenumber: '',
    email: '',
    fname: '',
    password: '',
  });

  // signup button
  const handleSignup = async () => {
    // Frontend Validation
    if (
      userCredentials.phonenumber === '' ||
      userCredentials.email === '' ||
      userCredentials.fname === '' ||
      userCredentials.password === ''
    ) {
      showMessage({
        message: 'Please fill in all the fields!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (!validateEmail(userCredentials.email.trim())) {
      showMessage({
        message: 'Make sure your email is in the right format!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (!validatePassword(userCredentials.password)) {
      showMessage({
        message: 'Please enter a valid password!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (!validatePhoneNumber(userCredentials.phonenumber)) {
      showMessage({
        message: 'Please enter a valid phone number!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    try {
      const response = await dispatch(signUpUserAsync(userCredentials));
      if (response.payload.message === 'Sign-up successfull') {
        showMessage({
          message: 'Signup successful!',
          type: 'success',
          floating: true,
        });
        navigation.navigate('Otp');
        dispatch(setPhoneNumber(response.payload.data.phonenumber));
        setUserCredentials({
          phonenumber: '',
          email: '',
          fname: '',
          password: '',
        });
      } else if (response.payload.message === 'Email already in use') {
        showMessage({
          message: 'Email already exists. Please Login!.',
          type: 'danger',
          floating: true,
        });
      } else if (response.payload.message === 'Invalid password format. Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)') {
        showMessage({
          message: 'Invalid password format',
          type: 'danger',
          floating: true,
        });
      } else if (response.payload.message === 'Phone number already in use') {
        showMessage({
          message: 'Phone number already taken. Please use a different one.',
          type: 'danger',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Signup failed.',
          type: 'danger',
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'An error occurred during signup. Please try again.',
        type: 'danger',
        floating: true,
      });
    }
  };

  return (
    <SubContainer style={{padding: 30}}>
      <Text className="text-white text-3xl font-bold shadow-white">SIGNUP</Text>

      <AuthTextInput
        placeHolderText="Phone Number"
        isPassword={false}
        onChangeText={text =>
          setUserCredentials({...userCredentials, phonenumber: text})
        }
        value={userCredentials.phonenumber}
        customBorderRadius={20}
        keyboardType="numeric"
      />

      <AuthTextInput
        placeHolderText="Email ID"
        isPassword={false}
        onChangeText={text =>
          setUserCredentials({...userCredentials, email: text})
        }
        value={userCredentials.email}
        customBorderRadius={20}
      />

      <AuthTextInput
        placeHolderText="Full Name"
        isPassword={false}
        onChangeText={text =>
          setUserCredentials({...userCredentials, fname: text})
        }
        value={userCredentials.fname}
        customBorderRadius={20}
        keyboardType="numeric"
      />

      <AuthTextInput
        placeHolderText="Password"
        isPassword={true}
        onChangeText={text =>
          setUserCredentials({...userCredentials, password: text})
        }
        value={userCredentials.password}
        customBorderRadius={20}
        width="90%"
      />

      <ActionButton
        style={{paddingHorizontal: 64}}
        title="SignUp"
        loading={loading}
        onPress={handleSignup}
      />

      <View className="flex-row items-center justify-center mt-5">
        <Paragraph textColor={themes.lightText}>
          By signing up, you agree to our
        </Paragraph>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Paragraph textColor={themes.skyBlue}>Terms And Policy</Paragraph>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-center mt-5">
        <Paragraph textColor={themes.lightText}>Have an account?</Paragraph>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Paragraph textColor={themes.lightGreen}>Login</Paragraph>
        </TouchableOpacity>
      </View>
    </SubContainer>
  );
};

export default SignUp;
