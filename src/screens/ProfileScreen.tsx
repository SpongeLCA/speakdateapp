import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { fakeProfiles } from '../data/fakeProfiles';

const ProfileSection = ({ title, icon, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Feather name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const ProfileListItem = ({ icon, text }) => (
  <View style={styles.listItem}>
    <Feather name={icon} size={20} color={theme.colors.primary} style={styles.listItemIcon} />
    <Text style={styles.listItemText}>{text}</Text>
  </View>
);

const PhotoGrid = ({ photos }) => {
  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item }} style={styles.gridPhoto} />
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderPhoto}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};

export default function ProfileScreen() {
  const route = useRoute();
  const profile = route.params?.profile || fakeProfiles[0];
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  // Ajout de photos supplémentaires pour la démonstration
  const allPhotos = [
    ...profile.images,
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=500&h=500',
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?fit=crop&w=500&h=500',
    'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?fit=crop&w=500&h=500',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?fit=crop&w=500&h=500',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fit=crop&w=500&h=500',
  ];

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Profil non trouvé</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: profile.images[0] }} style={styles.profileImage} />
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.location}>{profile.city}, {profile.country}</Text>
          </View>
        </View>

        <ProfileSection title="À propos" icon="user">
          <Text style={styles.bio}>{profile.bio}</Text>
        </ProfileSection>

        <ProfileSection title="Photos" icon="camera">
          <PhotoGrid photos={allPhotos} />
          <TouchableOpacity style={styles.addPhotoButton}>
            <Feather name="plus" size={24} color={theme.colors.white} />
            <Text style={styles.addPhotoText}>Ajouter une photo</Text>
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="Langues" icon="globe">
          {profile.languages.map((lang, index) => (
            <ProfileListItem key={index} icon="check" text={`${lang.language}: ${lang.level}`} />
          ))}
        </ProfileSection>

        <ProfileSection title="Intérêts" icon="heart">
          <View style={styles.tagsContainer}>
            {profile.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="Informations personnelles" icon="info">
          <ProfileListItem icon="briefcase" text={profile.occupation} />
          <ProfileListItem icon="book" text={profile.education} />
          <ProfileListItem icon="arrow-up" text={`${profile.height} cm`} />
          <ProfileListItem icon="target" text={profile.relationshipGoal} />
        </ProfileSection>

        <ProfileSection title="Style de vie" icon="coffee">
          <ProfileListItem icon="coffee" text={profile.drinking} />
          <ProfileListItem icon="wind" text={profile.smoking} />
          <ProfileListItem icon="activity" text={profile.exercise} />
        </ProfileSection>

        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() => setIsPremiumModalVisible(true)}
        >
          <Feather name="star" size={24} color={theme.colors.white} style={styles.premiumButtonIcon} />
          <Text style={styles.premiumButtonText}>Devenir Premium</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPremiumModalVisible}
        onRequestClose={() => setIsPremiumModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Abonnement Premium</Text>
            <Text style={styles.modalText}>Profitez de fonctionnalités exclusives :</Text>
            <ProfileListItem icon="check" text="Likes illimités" />
            <ProfileListItem icon="check" text="Voir qui vous a liké" />
            <ProfileListItem icon="check" text="Booster votre profil" />
            <ProfileListItem icon="check" text="Messages prioritaires" />
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => {
                // Logique d'abonnement à implémenter
                setIsPremiumModalVisible(false);
              }}
            >
              <Text style={styles.subscribeButtonText}>S'abonner pour 9,99€/mois</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPremiumModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginLeft: 5,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 10,
  },
  bio: {
    fontSize: 16,
    color: theme.colors.text,
  },
  gridPhoto: {
    width: '33%',
    aspectRatio: 1,
    margin: 1,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addPhotoText: {
    color: theme.colors.white,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
  },
  interestText: {
    color: theme.colors.white,
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemIcon: {
    marginRight: 8,
  },
  listItemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  premiumButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  premiumButtonIcon: {
    marginRight: 10,
  },
  premiumButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 15,
  },
  subscribeButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  subscribeButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
});