import {useEffect, useState} from 'react';
import {UserTypes} from '../store/types/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = () => {
  const [user, setUser] = useState<UserTypes | null>(null);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUserData: UserTypes = JSON.parse(userData);
        setUser(parsedUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return user;
};

export default getUserData;
