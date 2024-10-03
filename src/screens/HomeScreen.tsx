import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { fakeProfiles } from '../data/fakeProfiles';

const recentChats = [
  { id: 1, name: 'Sophie', message: 'Salut ! Comment ça va ?', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=500&h=500', unread: 2 },
  { id: 2, name: 'Marc', message: 'On se voit demain ?', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500', unread: 0 },
  { id: 3, name: 'Julie', message: 'J\'ai adoré notre conversation !', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=500&h=500', unread: 1 },
];

const ProfileItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.profileCard} onPress={onPress}>
    <Image source={{ uri: item.images[0] }} style={styles.profileImage} />
    {item.isPremium && (
      <View style={styles.premiumBadge}>
        <Feather name="star" size={12} color={theme.colors.text} />
      </View>
    )}
    <Text style={styles.profileName}>{item.name}, {item.age}</Text>
    <Text style={styles.profileCountry}>{item.country}</Text>
  </TouchableOpacity>
);

const ChatItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.chatItem} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.chatAvatar} />
    <View style={styles.chatInfo}>
      <Text style={styles.chatName}>{item.name}</Text>
      <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
    </View>
    {item.unread > 0 && (
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadText}>{item.unread}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          { type: 'header' },
          { type: 'profilesSection' },
          { type: 'chatsSection' },
          { type: 'swipeButton' },
        ]}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'header':
              return (
                <View style={styles.headerContainer}>
                  <View style={styles.header}>
                    <View style={styles.logoContainer}>
                      <Text style={styles.logoSpeak}>speak</Text>
                      <Text style={styles.logoDate}>date</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                      <Feather name="settings" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            case 'profilesSection':
              return (
                <View>
                  <Text style={styles.sectionTitle}>Découvrez</Text>
                  <FlatList
                    data={fakeProfiles}
                    renderItem={({ item }) => (
                      <ProfileItem
                        item={item}
                        onPress={() => navigation.navigate('Profile', { profile: item })}
                      />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.profileList}
                  />
                </View>
              );
            case 'chatsSection':
              return (
                <View>
                  <Text style={styles.sectionTitle}>Conversations récentes</Text>
                  {recentChats.map((chat) => (
                    <ChatItem
                      key={chat.id}
                      item={chat}
                      onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
                    />
                  ))}
                </View>
              );
            case 'swipeButton':
              return (
                <TouchableOpacity
                  style={styles.swipeButton}
                  onPress={() => navigation.navigate('Swipe')}
                >
                  <Feather name="heart" size={24} color={theme.colors.text} />
                  <Text style={styles.swipeButtonText}>Commencer à swiper</Text>
                </TouchableOpacity>
              );
            default:
              return null;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingTop: 40,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  logoContainer: {
    flexDirection: 'row',
  },
  logoSpeak: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logoDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  profileList: {
    paddingHorizontal: theme.spacing.md,
  },
  profileCard: {
    width: 120,
    marginRight: theme.spacing.md,
  },
  profileImage: {
    width: 120,
    height: 160,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  profileName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  profileCountry: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  premiumBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.md,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  chatMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  swipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  swipeButtonText: {
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
});