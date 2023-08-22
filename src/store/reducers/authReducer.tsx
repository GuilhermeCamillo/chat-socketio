import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from '..';
import {authApi} from '../../services';
import {UserTypes} from '../types/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthTypes {
  user: UserTypes;
  loading: {login: '' | 'loading' | 'fulfilled' | 'error'};
}

const initialState: AuthTypes = {
  user: {email: '', firstName: '', id: '', lastName: '', token: ''},
  loading: {
    login: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER(state, {payload}) {
      state.user = payload;
    },
    SET_LOADING(state, {payload}) {
      state.loading = {...state, ...payload};
    },
  },
});

export const {SET_USER, SET_LOADING} = authSlice.actions;

export const login =
  (payload: {email: string; password: string}) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(SET_LOADING({login: 'loading'}));
      const response = await authApi.post('/login', payload);

      if (response && response.data) {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response.data.token),
        );
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        dispatch(SET_LOADING({login: 'fulfilled'}));
        dispatch(SET_USER(response.data));
      }
    } catch (error) {
      dispatch(SET_LOADING({login: 'error'}));
      throw error;
    }
  };

export default authSlice.reducer;
