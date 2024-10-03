import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';
import { Button } from "src/components/ui/Button";
import { Progress } from "src/components/ui/Progress";

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ProfileScreenProps {
  route: {
    params: {
      profile: {
        id: number;
        name: string;
        age: number;
        country: string;
        city: string;
        bio: string;
        images: string[];
        isPremium: boolean;
        languages: { language: string; level: string }[];
        interests: string[];
        occupation: string;
        education: string;
        height: number;
        relationshipGoal: string;
        personalityTraits: string[];
        zodiacSign: string;
        religion: string;
        politicalViews: string;
        drinking: string;
        smoking: string;
        exercise: string;
        kids: string;
        pets: string[];
        musicTaste: string[];
        favoriteMovies: string[];
        travelExperience: string[];
        bucketList: string[];
        compatibilityScore: number;
      };
    };
  };
}

export default function ProfileScreen({ route }: ProfileScreenProps) {
  const { profile } = route.params;
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSpeakDate = () => {
    Alert.alert(
      "Demande de Speak Date",
      `Voulez-vous vraiment demander un Speak Date avec ${profile.name} ?`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Oui", 
          onPress: () => Alert.alert("Speak Date demandé!", `Votre demande de Speak Date avec ${profile.name} a été envoyée.`)
        }
      ]
    );
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content}
    </View>
  );

  const renderTags = (tags: string[]) => (
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profile.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + profile.images.length) % profile.images.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: profile.images[currentImageIndex] }} style={styles.profileImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.imageNavButton, styles.prevButton]} onPress={prevImage}>
            <Feather name="chevron-left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.imageNavButton, styles.nextButton]} onPress={nextImage}>
            <Feather name="chevron-right" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
            <Text style={styles.locationText}>{profile.city}, {profile.country}</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <BlurView intensity={100} style={styles.blurContainer}>
            {renderSection("À propos", <Text style={styles.bioText}>{profile.bio}</Text>)}
            
            {renderSection("Profession", (
              <Text style={styles.contentText}>{profile.occupation}</Text>
            ))}

            {renderSection("Éducation", (
              <Text style={styles.contentText}>{profile.education}</Text>
            ))}

            {renderSection("Langues", (
              <View>
                {profile.languages.map((lang, index) => (
                  <Text key={index} style={styles.contentText}>
                    {lang.language}: {lang.level}
                  </Text>
                ))}
              </View>
            ))}

            {renderSection("Centres d'intérêt", renderTags(profile.interests))}

            {renderSection("Traits de personnalité", renderTags(profile.personalityTraits))}

            {renderSection("Informations de base", (
              <View>
                <Text style={styles.contentText}>Taille: {profile.height} cm</Text>
                <Text style={styles.contentText}>Objectif relationnel: {profile.relationshipGoal}</Text>
                <Text style={styles.contentText}>Signe astrologique: {profile.zodiacSign}</Text>
                <Text style={styles.contentText}>Religion: {profile.religion}</Text>
                <Text style={styles.contentText}>Opinions politiques: {profile.politicalViews}</Text>
                <Text style={styles.contentText}>Alcool: {profile.drinking}</Text>
                <Text style={styles.contentText}>Tabac: {profile.smoking}</Text>
                <Text style={styles.contentText}>Exercice: {profile.exercise}</Text>
                <Text style={styles.contentText}>Enfants: {profile.kids}</Text>
                <Text style={styles.contentText}>Animaux de compagnie: {profile.pets.join(', ')}</Text>
              </View>
            ))}

            {renderSection("Goûts musicaux", renderTags(profile.musicTaste))}

            {renderSection("Films préférés", renderTags(profile.favoriteMovies))}

            {renderSection("Expériences de voyage", (
              <View>
                {profile.travelExperience.map((exp, index) => (
                  <Text key={index} style={styles.contentText}>• {exp}</Text>
                ))}
              </View>
            ))}

            {renderSection("Bucket list", (
              <View>
                {profile.bucketList.map((item, index) => (
                  <Text key={index} style={styles.contentText}>• {item}</Text>
                ))}
              </View>
            ))}

            {renderSection("Compatibilité", (
              <View>
                <Progress 
                  value={profile.compatibilityScore}
                  color={theme.colors.primary}
                  backgroundColor={theme.colors.secondary}
                />
                <Text style={styles.compatibilityText}>{profile.compatibilityScore}% de compatibilité</Text>
              </View>
            ))}
          </BlurView>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button 
            onPress={handleSpeakDate}
            style={styles.speakDateButton}
          >
            <View style={styles.speakDateIcon}>
              <Text style={styles.speakDateS}>S</Text>
              <Text style={styles.speakDateD}>D</Text>
            </View>
            <Text style={styles.speakDateText}>Speak Date</Text>
          </Button>
          <TouchableOpacity 
            style={[styles.likeButton, isLiked && styles.likedButton]} 
            onPress={() => setIsLiked(!isLiked)}
          >
            <Feather name="heart" size={24} color={isLiked ? theme.colors.error : theme.colors.text} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 400,
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNavButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
  nameContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  infoContainer: {
    padding: 20,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  contentText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  compatibilityText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 5,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  speakDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  speakDateIcon: {
    flexDirection: 'row',
    marginRight: 10,
  },
  speakDateS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  speakDateD: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  speakDateText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  likeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: theme.colors.error,
  },
});