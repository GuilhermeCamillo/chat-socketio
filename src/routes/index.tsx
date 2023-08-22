import React, {useEffect, useState} from 'react';
import AuthRoutes from './authStack';
import AppRoutes from './appStack';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
  goBack: () => void;
};

export const useAppNavigation = () => useNavigation<Nav>();

const Routes = () => {
  const [isAthenticated, setIsAthenticated] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const hasToken = useSelector((state: RootState) => state.auth.user.token);

  const getUserToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
  };

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      const token = await getUserToken();
      setIsAthenticated(token);
      setLoading(false);
    };
    fetchToken();
  }, [hasToken]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return isAthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
