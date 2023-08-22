import {combineReducers} from 'redux';

import authSlice from './reducers/authReducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
  auth: authSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
});
