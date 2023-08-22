import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, Text, TextInput} from 'react-native-paper';
import {io} from 'socket.io-client';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store';
import {useAppNavigation} from '../../routes';
import getUserData from '../../services/userData';
import {getChatConversation} from '../../store/reducers/chatReducer';
import {UsersTypes} from '../../store/types/usersTypes';
import { FlashList } from '@shopify/flash-list';

interface Message {
  id: string;
  sender: UsersTypes;
  receiver: UsersTypes;
  body: string;
  sendDateTime: Date | string;
}

interface ReceivedMessage {
  sender: UsersTypes;
  receiver: UsersTypes;
  body: string;
}

interface Payload {
  senderId: string | undefined;
  text: string;
  receiverId: string | undefined;
}

const socket = io('http://localhost:3000');

const ChatScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const user = getUserData();
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser,
  );

  function getChatRoomId(
    userId1: string | undefined,
    userId2: string | undefined,
  ): string {
    const sortedUserIds = [userId1, userId2].sort();
    const chatRoomId = `${sortedUserIds[0]}_${sortedUserIds[1]}`;
    return chatRoomId;
  }

  const joinChatRoom = useCallback(() => {
    const chatRoomId = getChatRoomId(user?.id, selectedUser?.id);
    socket.emit('joinChat', chatRoomId); 
  }, [selectedUser, user]);

  const leaveChatRoom = useCallback(() => {
    const chatRoomId = getChatRoomId(user?.id, selectedUser?.id);
    socket.emit('leaveChat', chatRoomId); 
  }, [selectedUser, user]);

  useEffect(() => {
    if (selectedUser && user) {
      joinChatRoom(); 
    }

    return () => {
      if (selectedUser && user) {
        leaveChatRoom();
      }
    };
  }, [joinChatRoom, leaveChatRoom, selectedUser, user]);

  useEffect(() => {
    async function getMessages() {
      const data = await dispatch(getChatConversation(selectedUser?.id));
      setMessages(data);
    }
    getMessages();
  }, [dispatch, selectedUser]);

  const receivedMessage = useCallback((message: ReceivedMessage) => {
    const newMessage: Message = {
      id: uuid.v4().toString(),
      receiver: message.receiver,
      body: message.body,
      sender: message.sender,
      sendDateTime: new Date(),
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
  }, []);

  useEffect(() => {
    socket.on('msgToClient', receivedMessage);
    return () => {
      socket.off('msgToClient', receivedMessage);
    };
  }, [receivedMessage]);

  const validateInput = () => text.length > 0;

  const sendMessage = () => {
    if (validateInput()) {
      const message: Payload = {
        senderId: user?.id,
        text,
        receiverId: selectedUser?.id,
      };

      const newMessage: any = {
        id: uuid.v4().toString(),
        sender: user, 
        receiver: selectedUser, 
        body: text,
        sendDateTime: new Date(),
      };

      setMessages(prevMessages => [newMessage, ...prevMessages]);

      socket.emit('msgToServer', message);
      setText('');
    }
  };

  const ChatBubble = React.memo(({sender, body}: Message) => (
    <View
      style={
        sender.id === user?.id ? styles.sentBubble : styles.receivedBubble
      }>
      <Text variant="titleMedium" style={styles.bubbleName}>
        {sender.firstName}
      </Text>
      <Text variant="bodyLarge" style={styles.bubbleText}>
        {body}
      </Text>
    </View>
  ));

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Text>{selectedUser.firstName}</Text>
      </Appbar.Header>
      <View style={styles.chat}>
        <FlashList
          showsVerticalScrollIndicator={false}
          estimatedItemSize={68}
          bounces={false}
          inverted
          data={messages}
          keyExtractor={(item: Message) => item.id}
          renderItem={({item}) => <ChatBubble {...item} />}
        />
      </View>
      <View style={styles.containerInputMessage}>
        <IconButton icon="paperclip" iconColor={'#000'} size={30} />
        <TextInput
          placeholder="Digite aqui..."
          value={text}
          onChangeText={setText}
          mode="outlined"
          placeholderTextColor="#B5B5B5"
          style={{
            fontSize: 18,
            color: '#000',
            flex: 1,
          }}
          right={<TextInput.Icon onPress={sendMessage} icon="send-circle" />}
        />
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  input: {
    color: '#000',
    borderRadius: 8,
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  chat: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  attachButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F8FE',
    width: 80,
    borderRadius: 10,
    height: '100%',
  },
  containerInputMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    gap: 10,
    height: 90,
  },
  inputSendMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 10,
    height: '100%',
    gap: 10,
    flex: 1,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F8FE',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#D8E5FF',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  bubbleText: {
    color: '#49566D',
  },
  bubbleName: {
    color: '#49566D',
  },
});
