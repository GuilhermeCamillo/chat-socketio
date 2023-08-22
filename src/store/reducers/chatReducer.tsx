import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from '..';
import appApi from '../../services';

interface UsersTypes {
  chatList: [];
}

const initialState: UsersTypes = {
  chatList: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    SET_CHAT_LIST(state, {payload}) {
      state.chatList = payload;
    },
  },
});

export const {SET_CHAT_LIST} = chatSlice.actions;

export const getChatConversation =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await appApi.get(`/conversations/${payload}`);

      if (response && response.data) {
        dispatch(SET_CHAT_LIST(response.data));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

export default chatSlice.reducer;
