import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from '..';
import appApi from '../../services';

interface AuthTypes {
  users: [];
}

const initialState: AuthTypes = {
  users: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USERS(state, {payload}) {
      state.users = payload;
    },
  },
});

export const {SET_USERS} = authSlice.actions;

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await appApi.get('/users');

    console.log(response.data);

    if (response && response.data) {
      dispatch(SET_USERS(response.data));
    }
  } catch (error) {
    throw error;
  }
};

export default authSlice.reducer;
