import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PaperProvider} from 'react-native-paper';
import {theme} from './src/theme/fonts';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {store} from './src/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Routes />
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
