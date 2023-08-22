import {MD3LightTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
};

export const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};
