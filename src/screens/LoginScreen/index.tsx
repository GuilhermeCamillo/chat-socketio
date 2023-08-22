import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {RootState, useAppDispatch} from '../../store';
import {login} from '../../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../../store/reducers/usersReducer';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <View style={{padding: 16, gap: 12}}>
      <Text>LoginScreen</Text>
      <TextInput mode="outlined" placeholder="e-mail" />
      <TextInput mode="outlined" placeholder="senha" />
      <Button
        onPress={() =>
          dispatch(
            login({email: 'gui.camillo@outlook.com', password: 'Teste123!'}),
          )
        }>
        LOGAR
      </Button>
      <Text>{user.email}</Text>
    </View>
  );
};

export default LoginScreen;
