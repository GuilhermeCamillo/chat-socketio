import {ScrollView, StyleSheet, View} from 'react-native';
import {styled} from 'styled-components';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: '#3362A9',
  },
});

export const Scroll = styled(ScrollView)`
  background-color: #1e68d7;
  display: flex;
  flex: 1;
`;

export const Container = styled(View)`
  padding: 16px;
  background-color: #000;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const ContainerInputs = styled(View)`
  width: 100%;
  gap: 12px;
`;
