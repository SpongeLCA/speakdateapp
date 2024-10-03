import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { Profile } from '../data/fakeProfiles';

const EditProfileField = ({ label, value, onChangeText, multiline = false }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  </View>
);

export default function EditProfileScreen({ navigation }) {
  const [profile, setProfile] = useState<Profile>({
    id: 999,
    name: "Utilisateur Test",
    age: 30,
    country: "France",
    city: "Paris",
    bio: "Ceci est un profil de test pour les modifications.",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=500&h=500"],
    isPremium: false,
    languages: [{ language: "Français", level: "Natif" }],
    interests: ["Test", "Développement"],
    occupation: "Testeur",
    education: "École de la vie",
    height: 175,
    relationshipGoal: "Test de l'application",
    personalityTraits: ["Curieux", "Méthodique"],
    zodiacSign: "Balance",
    religion: "Agnostique",
    politicalViews: "Neutre",
    drinking: "Occasionnellement",
    smoking: "Non-fumeur",
    exercise: "Régulièrement",
    kids: "Pas encore",
    pets: ["Chat virtuel"],
    musicTaste: ["Tous les genres"],
    favoriteMovies: ["Matrix", "Inception"],
    travelExperience: ["Voyage virtuel autour du monde"],
    bucketList: ["Tester toutes les fonctionnalités de l'app"],
    compatibilityScore: 100
  });

  const updateProfile = (key: string, value: any) => {
    setProfile(prevProfile => ({ ...prevProfile, [key]: value }));
  };

  const handleSave = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les modifications
    // Par exemple, envoyer les données à votre API
    console.log("Profil mis à jour:", profile);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: profile.images[0] }} style={styles.profileImage} />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Feather name="camera" size={20} color={theme.colors.primary} />
            <Text style={styles.changePhotoText}>Changer la photo</Text>
          </TouchableOpacity>
        </View>

        <EditProfileField
          label="Nom"
          value={profile.name}
          onChangeText={(value) => updateProfile('name', value)}
        />
        <EditProfileField
          label="Âge"
          value={profile.age.toString()}
          onChangeText={(value) => updateProfile('age', parseInt(value) || 0)}
        />
        <EditProfileField
          label="Ville"
          value={profile.city}
          onChangeText={(value) => updateProfile('city', value)}
        />
        <EditProfileField
          label="Pays"
          value={profile.country}
          onChangeText={(value) => updateProfile('country', value)}
        />
        <EditProfileField
          label="Bio"
          value={profile.bio}
          onChangeText={(value) => updateProfile('bio', value)}
          multiline
        />
        <EditProfileField
          label="Profession"
          value={profile.occupation}
          onChangeText={(value) => updateProfile('occupation', value)}
        />
        <EditProfileField
          label="Éducation"
          value={profile.education}
          onChangeText={(value) => updateProfile('education', value)}
        />
        <EditProfileField
          label="Taille (cm)"
          value={profile.height.toString()}
          onChangeText={(value) => updateProfile('height', parseInt(value) || 0)}
        />
        <EditProfileField
          label="Objectif relationnel"
          value={profile.relationshipGoal}
          onChangeText={(value) => updateProfile('relationshipGoal', value)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoText: {
    marginLeft: 5,
    color: theme.colors.primary,
    fontSize: 16,
  },
  fieldContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});