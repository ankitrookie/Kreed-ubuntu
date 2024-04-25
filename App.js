/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import RootNavigation from './src/navigation/root';

// flash message
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { darkTheme, lightTheme } from './src/themes';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  const theme = isDarkMode ? darkTheme : lightTheme;

  const backgroundStyle = {
    backgroundColor: theme.backgroundColor,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={[backgroundStyle, styles.Container]}>
        <StatusBar
          barStyle={theme.statusBarStyle}
          backgroundColor={theme.backgroundColor}
        />
        <RootNavigation />
        <FlashMessage
          position="top"
          animated
          statusBarHeight={10}
          titleStyle={{fontFamily: 'Poppins-Regular', fontSize: 13}}
          duration={3000}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
