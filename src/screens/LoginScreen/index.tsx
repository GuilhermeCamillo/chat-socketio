import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {RootState, useAppDispatch} from '../../store';
import {login} from '../../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {Container, ContainerInputs, Scroll, styles} from './styles';
import {Circle, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import {Icons} from '../../theme';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.auth.loading.login);

  return (
    <Scroll>
        <Svg width="123" height="123" viewBox="0 0 123 123" fill="none">
          <G clip-path="url(#clip0_1_3)">
            <Path
              d="M61.5 123C95.4655 123 123 95.4655 123 61.5C123 27.5345 95.4655 0 61.5 0C27.5345 0 0 27.5345 0 61.5C0 95.4655 27.5345 123 61.5 123Z"
              fill="#1C98F7"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M62.5763 89.6555C65.2809 89.4675 67.9625 89.03 70.5866 88.3486C73.8251 89.3368 77.2486 89.5605 80.5881 89.002C80.7202 88.9807 80.8539 88.9704 80.9878 88.9713C82.1794 88.9713 83.7438 89.6632 86.0231 91.1238V88.7214C86.0236 88.3058 86.1345 87.8978 86.3446 87.5391C86.5546 87.1805 86.8563 86.8841 87.2185 86.6804C88.2102 86.1192 89.1327 85.4735 89.9745 84.7624C93.2955 81.9487 95.1713 78.1972 95.1713 74.2228C95.1713 72.889 94.9598 71.5937 94.5601 70.356C95.5633 68.4841 96.3743 66.5161 96.9701 64.4751C98.8964 67.3617 99.9286 70.7524 99.9375 74.2228C99.9375 79.6233 97.4237 84.6586 93.0764 88.3409C92.3508 88.955 91.5869 89.5225 90.7894 90.0398V95.6556C90.7894 97.589 88.56 98.6998 86.9879 97.5505C85.5013 96.4392 83.962 95.4002 82.3754 94.4371C81.9211 94.1652 81.4484 93.925 80.9609 93.7183C79.654 93.9143 78.3164 94.0143 76.9673 94.0143C71.5399 94.0143 66.5238 92.3884 62.5763 89.6555ZM33.8788 78.424C27.0216 72.6084 23.0625 64.6865 23.0625 56.1956C23.0625 38.8488 39.4292 24.9844 59.4128 24.9844C79.4003 24.9844 95.767 38.8488 95.767 56.1956C95.767 73.5463 79.3965 87.4107 59.4128 87.4107C57.1681 87.4107 54.9464 87.2377 52.7708 86.8918C51.8291 87.1147 48.0661 89.3518 42.6426 93.3109C40.6784 94.7484 37.8917 93.3608 37.8917 90.9431V81.3645C36.4872 80.479 35.1463 79.4965 33.8788 78.424ZM52.9015 80.984C53.0668 80.984 53.2359 80.9955 53.4012 81.0224C55.3615 81.353 57.3757 81.5221 59.4128 81.5221C76.2946 81.5221 89.8054 70.0754 89.8054 56.1956C89.8054 42.3197 76.2946 30.873 59.4128 30.873C42.5388 30.873 29.0203 42.3197 29.0203 56.1956C29.0203 62.9068 32.176 69.2259 37.7572 73.9537C39.1601 75.1376 40.7015 76.2139 42.3543 77.1517C43.2806 77.6745 43.8533 78.6508 43.8533 79.704V85.2275C48.143 82.3485 50.9643 80.984 52.9015 80.984ZM43.9187 62.0881C41.2857 62.0881 39.1524 59.974 39.1524 57.3757C39.1524 54.7734 41.2857 52.6632 43.9187 52.6632C46.5517 52.6632 48.6849 54.7734 48.6849 57.3757C48.6849 59.9779 46.5517 62.0881 43.9187 62.0881ZM59.4128 62.0881C56.7799 62.0881 54.6466 59.974 54.6466 57.3757C54.6466 54.7734 56.7799 52.6632 59.4128 52.6632C62.0458 52.6632 64.1791 54.7734 64.1791 57.3757C64.1791 59.9779 62.0458 62.0881 59.4128 62.0881ZM74.907 62.0881C72.274 62.0881 70.1407 59.974 70.1407 57.3757C70.1407 54.7734 72.274 52.6632 74.907 52.6632C77.54 52.6632 79.6733 54.7734 79.6733 57.3757C79.6733 59.9779 77.54 62.0881 74.907 62.0881Z"
              fill="white"
            />
          </G>
        </Svg>
        <ContainerInputs>
          <TextInput
            placeholder="e-mail"
            mode="outlined"
            outlineColor='#FFFFFF66'
            activeOutlineColor='#FFFFFF'
            outlineStyle={{borderWidth: 2, borderRadius: 16}}
            style={styles.input}
            textColor='#FFF'
            placeholderTextColor='#FFF'
          />
          <TextInput
            placeholder="senha"
            mode="outlined"
            outlineColor='#FFFFFF66'
            activeOutlineColor='#FFFFFF'
            outlineStyle={{borderWidth: 2, borderRadius: 16}}
            style={styles.input}
            textColor='#FFF'
            placeholderTextColor='#FFF'
          />
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
        </ContainerInputs>
    </Scroll>
  );
};

export default LoginScreen;
