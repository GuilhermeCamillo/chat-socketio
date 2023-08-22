import React from 'react';
import AuthRoutes from './authStack';
import AppRoutes from './appStack';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const Routes = () => {
  const isAthenticated = useSelector(
    (state: RootState) => state.auth.user.token,
  );

  return isAthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
