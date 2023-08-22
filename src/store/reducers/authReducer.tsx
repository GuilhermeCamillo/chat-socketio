import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from '..';
import {authApi} from '../../services';
import {UserTypes} from '../types/userTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthTypes {
  user: UserTypes;
}

const initialState: AuthTypes = {
  user: {email: '', firstName: '', id: '', lastName: '', token: ''},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER(state, {payload}) {
      state.user = payload;
    },
  },
});

export const {SET_USER} = authSlice.actions;

export const login =
  (payload: {email: string; password: string}) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log(payload);
      const response = await authApi.post('/login', payload);

      await AsyncStorage.setItem('token', JSON.stringify(response.data.token));

      if (response && response.data) {
        dispatch(SET_USER(response.data));
      }
    } catch (error) {
      throw error;
    }
  };

export default authSlice.reducer;
