import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text, TextInput} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {io} from 'socket.io-client';
import uuid from 'react-native-uuid';

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
  receiver?: string;
}

const socket = io('http://localhost:3000');

const ChatScreen = () => {
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function receivedMessage(message: Payload) {
      const newMessage: Message = {
        id: uuid.v4().toString(),
        name: message.name,
        text: message.text,
      };

      setMessages(prevMessages => [newMessage, ...prevMessages]);
    }

    socket.on('msgToClient', receivedMessage);

    return () => {
      socket.off('msgToClient', receivedMessage);
    };
  }, [name, text]);

  function validateInput() {
    return name.length > 0 && text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: Payload = {
        name,
        text,
        receiver: name == 'Gui' ? 'Dudu' : 'Gui',
      };

      socket.emit('msgToServer', message);
      setText('');
    }
  }

  const ChatBubble = React.memo((item: Message) => {
    return (
      <View
        style={item.name == name ? styles.sentBubble : styles.receivedBubble}>
        <Text variant="titleMedium" style={styles.bubbleName}>
          {item.name}
        </Text>
        <Text variant="bodyLarge" style={styles.bubbleText}>
          {item.text}
        </Text>
      </View>
    );
  });

  console.log('CHEGOU AQUI', name);

  return (
    <>
      <View style={styles.header}>
        <TextInput
          placeholder="Digite seu nome"
          value={name}
          mode="outlined"
          onChangeText={setName}
          placeholderTextColor="#B5B5B5"
          style={styles.input}
        />
      </View>
      <View style={styles.chat}>
        <FlatList
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
