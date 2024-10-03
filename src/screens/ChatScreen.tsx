import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { fakeProfiles } from '../data/fakeProfiles';
import { fakeConversations } from '../data/fakeConversations';

const ConversationItem = ({ item, onPress }) => {
  const profile = fakeProfiles.find(p => p.id === item.profileId);
  const lastMessage = item.messages[item.messages.length - 1];

  return (
    <TouchableOpacity style={styles.conversationItem} onPress={onPress}>
      <Image source={{ uri: profile.images[0] }} style={styles.avatar} />
      <View style={styles.conversationInfo}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.time}>{lastMessage.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage.text}</Text>
        <View style={styles.languagesContainer}>
          {profile.languages.slice(0, 2).map((language, index) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{language.language}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ChatScreen() {
  const navigation = useNavigation();

  const handleConversationPress = (conversation) => {
    const profile = fakeProfiles.find(p => p.id === conversation.profileId);
    navigation.navigate('Message', { 
      conversationId: conversation.id, 
      name: profile.name, 
      avatar: profile.images[0],
      profileId: profile.id
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => {/* Implement new message action */}}>
          <Feather name="edit" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={fakeConversations}
        renderItem={({ item }) => (
          <ConversationItem
            item={item}
            onPress={() => handleConversationPress(item)}
          />
        )}
        keyExtractor={item => item.id}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  conversationInfo: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  languagesContainer: {
    flexDirection: 'row',
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
  },
  languageText: {
    color: theme.colors.text,
    fontSize: 12,
  },
});