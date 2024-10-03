import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { theme } from '../theme';
import { fakeConversations, Message } from '../data/fakeConversations';
import { fakeProfiles } from '../data/fakeProfiles';

const MessageBubble = ({ message, onTranslate }) => (
  <View style={[styles.messageBubble, message.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
    {message.sender === 'other' && (
      <TouchableOpacity style={styles.translateButton} onPress={() => onTranslate(message.id)}>
        <Feather name="globe" size={16} color={theme.colors.primary} />
      </TouchableOpacity>
    )}
  </View>
);

export default function MessageScreen({ route }) {
  const { conversationId, name, avatar, profileId } = route.params;
  const conversation = fakeConversations.find(conv => conv.id === conversationId);
  const [messages, setMessages] = useState<Message[]>(conversation ? conversation.messages : []);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  const recording = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const startRecording = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      recording.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording.current) return;

    try {
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      console.log('Recording stopped and stored at', uri);
      Alert.alert('Note vocale enregistrée', 'La note vocale a été enregistrée avec succès.');
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const translateMessage = (messageId) => {
    Alert.alert('Traduction', 'Le message serait traduit ici.');
  };

  const initiateVideoCall = () => {
    Alert.alert('Appel vidéo', 'L\'appel vidéo serait initié ici.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileInfo}
          onPress={() => navigation.navigate('Profile', { profileId: profileId })}
        >
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={initiateVideoCall}>
          <Feather name="video" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble 
            message={item} 
            onTranslate={translateMessage}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez un message..."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={[styles.recordButton, isRecording && styles.recordingActive]}
        >
          <Feather name="mic" size={24} color={isRecording ? theme.colors.error : theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Feather name="send" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.card,
  },
  messageText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  messageTimestamp: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  translateButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 12,
    color: theme.colors.text,
  },
  recordButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordingActive: {
    backgroundColor: theme.colors.error,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
});