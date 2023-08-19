import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PaperProvider} from 'react-native-paper';
import ChatScreen from './src/screens/ChatScreen';
import {theme} from './src/theme/fonts';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ChatScreen />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
