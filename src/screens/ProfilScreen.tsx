import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { fakeProfiles } from '../data/fakeProfiles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileId = route.params?.profileId;
    if (profileId) {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const foundProfile = fakeProfiles.find(p => p.id === profileId);
        setProfile(foundProfile || null);
        setLoading(false);
      }, 1000);
    } else {
      // If no profileId is provided, use the first profile as a default
      setProfile(fakeProfiles[0]);
      setLoading(false);
    }
  }, [route.params?.profileId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profile.name}'s Profile</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: profile.images[0] }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
        <Text style={styles.occupation}>{profile.occupation}</Text>
        <Text style={styles.location}>{profile.location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{profile.about}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {profile.languages.map((lang, index) => (
          <Text key={index} style={styles.languageItem}>
            {lang.language}: {lang.proficiency}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
      {profile.compatibilityScore && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compatibility Score</Text>
          <Text style={styles.compatibilityScore}>{profile.compatibilityScore}%</Text>
        </View>
      )}
      <TouchableOpacity style={styles.speakDateButton}>
        <Text style={styles.speakDateButtonText}>Speak Date</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profileImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  occupation: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  languageItem: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: theme.colors.textOnPrimary,
    fontSize: 14,
  },
  compatibilityScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  speakDateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  speakDateButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});