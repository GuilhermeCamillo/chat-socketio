import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const AppStack = createNativeStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'none',
      animationDuration: 200,
    }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="Chat" component={ChatScreen} />
  </AppStack.Navigator>
);

export default AppRoutes;
