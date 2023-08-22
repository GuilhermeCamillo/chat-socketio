import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from '..';
import appApi from '../../services';
import {UsersTypes as UserObjectType} from '../types/usersTypes';

interface UsersTypes {
  users: UserObjectType[];
  selectedUser: UserObjectType;
}

const initialState: UsersTypes = {
  users: [],
  selectedUser: {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    SET_USERS(state, {payload}) {
      state.users = payload;
    },
    SET_SELECTED_USER(state, {payload}) {
      state.selectedUser = payload;
    },
  },
});

export const {SET_USERS, SET_SELECTED_USER} = usersSlice.actions;

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await appApi.get('/users');

    if (response && response.data) {
      dispatch(SET_USERS(response.data));
    }
  } catch (error) {
    throw error;
  }
};

export default usersSlice.reducer;
