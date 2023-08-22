import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURLAuth = 'http://localhost:3000/api/auth';
const baseURL = 'http://localhost:3000/api/v1';

export const authApi = axios.create({
  baseURL: baseURLAuth,
  headers: {
    'Content-Type': 'application/json',
  },
});

const appApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

appApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default appApi;
