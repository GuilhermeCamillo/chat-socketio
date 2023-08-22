import {combineReducers} from 'redux';
import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import authSlice from './reducers/authReducer';
import usersSlice from './reducers/usersReducer';

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
});
