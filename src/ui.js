import React, {useState} from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput as ReactNativeTextInput,
  ActivityIndicator,
} from 'react-native';
import themes, {colors} from './themes';

// icons :
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

export const Container = ({children, style}) => (
  <View
    style={{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: '#000',
      paddingLeft: 20,
      paddingRight: 20,
      ...style,
    }}>
    {children}
  </View>
);

export const SubContainer = ({children, style}) => {
  const screenWidth = Dimensions.get('window').width;
  const boxWidth = screenWidth * 0.8;

  return (
    <LinearGradient
      colors={colors}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 40,
          width: boxWidth,
          ...style,
        }}>
        {children}
      </View>
    </LinearGradient>
  );
};

export const Row = ({children, style}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...style,
    }}>
    {children}
  </View>
);

export const Column = ({children, style}) => (
  <View
    style={{
      flexDirection: 'col',
      ...style,
    }}>
    {children}
  </View>
);

export const ActionButton = ({
  title,
  style,
  onPress,
  fontSizeStyle = 20,
  loading,
  disabled,
}) => (
  <TouchableOpacity
    style={{
      ...style,
    }}
    disabled={disabled}
    onPress={onPress}>
    <LinearGradient
      colors={[
        disabled ? themes.buttonDisableStart : themes.buttonStart,
        disabled ? themes.buttonDisableEnd : themes.buttonEnd,
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{padding: 16, borderRadius: 100, marginTop: 24}}>
      {loading ? (
        <ActivityIndicator size={24} color={themes.lightText} />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: disabled ? themes.gray : themes.lightText,
            fontFamily: 'Outfit-Regular',
            fontSize: fontSizeStyle,
          }}>
          {title}
        </Text>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export const SubActionButton = ({onPress, style, fontSizeStyle, title}) => {
  <TouchableOpacity
    onPress={onPress}>
    <LinearGradient
      colors={[themes.buttonStart, themes.buttonEnd]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{padding: 16, borderRadius: 100, marginTop: 24}}>
        <Text
          style={{
            textAlign: 'center',
            color: themes.lightText,
            fontFamily: 'Outfit-Regular',
            fontSize: fontSizeStyle,
          }}>
          {title}
        </Text>
    </LinearGradient>
  </TouchableOpacity>;
};

export const Paragraph = ({children, style, textColor}) => (
  <Text
    style={{
      color: textColor,
      fontWeight: '400',
      fontSize: 14,
      fontFamily: 'Outfit-Regular',
      ...style,
    }}>
    {children}
  </Text>
);

export const AuthTextInput = ({
  placeHolderText,
  isPassword,
  keyboard,
  customMarginHorizontal,
  customBorderRadius,
  bioText,
  value,
  width,
  marginTop = 15,
  ...otherProps
}) => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <View
      style={[
        {
          backgroundColor: '#33363A',
          marginHorizontal: customMarginHorizontal,
          borderRadius: customBorderRadius,
          marginTop: marginTop,
          paddingHorizontal: 20,
        },
        isPassword && {
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}>
      <ReactNativeTextInput
        placeholder={placeHolderText}
        placeholderTextColor={'#9191916b'}
        value={value}
        style={{
          color: themes.lightText,
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
          width: width,
        }}
        secureTextEntry={passwordShow}
        keyboardType={keyboard}
        {...(bioText && {
          textAlignVertical: 'top',
          multiline: true,
          numberOfLines: 5,
        })}
        {...otherProps}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setPasswordShow(!passwordShow)}>
          <Ionicons
            name={passwordShow ? 'eye' : 'eye-off'}
            size={20}
            color={themes.darkGray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const DropDownInputText = ({onChange, style}) => {
  return (
    <Dropdown
      style={{
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF29',
        color: '#FFFFFF',
      }}
    />
  );
};

export const ShadowBox = ({children, style}) => (
  <View
    style={{
      padding: 5,
      borderRadius: 8,
      borderColor: themes.startColor,
      borderWidth: 1,
      shadowColor: themes.endColor,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
      backgroundColor: '#01010101',
      blurRadius: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...style,
    }}>
    {children}
  </View>
);
