import React, {memo, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {
  SET_SELECTED_USER,
  getAllUsers,
} from '../../store/reducers/usersReducer';
import {RootState, useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {useAppNavigation} from '../../routes';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item, index}) => (
          <TouchableRipple
            onPress={() => {
              dispatch(SET_SELECTED_USER(item));
              navigation.navigate('Chat');
            }}
            style={{
              height: 60,
              width: '100%',
              justifyContent: 'center',
              padding: 8,
              backgroundColor: '#A3A3A3',
              borderRadius: 4,
            }}>
            <React.Fragment>
              <Text>{item?.firstName + ' ' + item?.lastName}</Text>
              <Text>{item?.email}</Text>
            </React.Fragment>
          </TouchableRipple>
        )}
        contentContainerStyle={{gap: 8}}
        style={{padding: 8}}
      />
    </View>
  );
};

export default memo(HomeScreen);
