import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {RootState, useAppDispatch} from '../../store';
import {login} from '../../store/reducers/authReducer';
import {useSelector} from 'react-redux';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.auth.loading.login);

  return (
    <View style={{padding: 16, gap: 12}}>
      <Text>LoginScreen</Text>
      <TextInput mode="outlined" placeholder="e-mail" />
      <TextInput mode="outlined" placeholder="senha" />
      <Button
        loading={loading === 'loading'}
        disabled={loading === 'loading'}
        onPress={() =>
          dispatch(
            login({email: 'robertinho@outlook.com', password: 'Teste123!'}),
          )
        }>
        LOGAR
      </Button>
      <Text>{loading}</Text>
    </View>
  );
};

export default LoginScreen;
