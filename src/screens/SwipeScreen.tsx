import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  PanResponder, 
  TouchableOpacity, 
  Dimensions, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';
import { Progress } from "src/components/ui/Progress";
import { useNavigation } from '@react-navigation/native';
import { fakeProfiles } from '../data/fakeProfiles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const BOOST_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBoosted, setIsBoosted] = useState(false);
  const [boostTimeLeft, setBoostTimeLeft] = useState(BOOST_DURATION);
  const position = useRef(new Animated.ValueXY()).current;
  const navigation = useNavigation();
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    let interval;
    if (isBoosted) {
      interval = setInterval(() => {
        setBoostTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(interval);
            setIsBoosted(false);
            return BOOST_DURATION;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBoosted]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipeRight();
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipeLeft();
      } else if (gesture.dy < -SWIPE_THRESHOLD) {
        speakDate();
      } else {
        resetPosition();
      }
    }
  });

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => nextCard());
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => nextCard());
  };

  const speakDate = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT - 100 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      const currentProfile = fakeProfiles[currentIndex];
      Alert.alert("Speak Date!", `Vous avez demandé un Speak Date avec ${currentProfile.name} !`);
      nextCard();
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const nextCard = () => {
    setCurrentIndex(currentIndex => currentIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const boostProfile = () => {
    setIsBoosted(true);
    setBoostTimeLeft(BOOST_DURATION);
    Alert.alert("Profil boosté!", "Votre profil sera plus visible pendant 30 minutes.");
  };

  const renderCards = () => {
    if (currentIndex >= fakeProfiles.length) {
      return (
        <View style={styles.endOfProfilesContainer}>
          <Text style={styles.endOfProfilesText}>Plus de profils disponibles</Text>
          <TouchableOpacity style={styles.reloadButton} onPress={() => setCurrentIndex(0)}>
            <Text style={styles.reloadButtonText}>Recharger les profils</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const profile = fakeProfiles[currentIndex];
    return (
      <Animated.View
        key={profile.id}
        style={[styles.card, {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotation }
          ]
        }]}
        {...panResponder.panHandlers}
      >
        {renderCardContent(profile)}
      </Animated.View>
    );
  };

  const renderCardContent = (profile) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Profile', { profile })}
      style={styles.cardTouchable}
    >
      <Image source={{ uri: profile.images[0] }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <BlurView intensity={100} style={styles.cardInfo}>
        <View style={styles.nameAgeContainer}>
          <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
          {profile.isPremium && (
            <View style={styles.premiumBadge}>
              <Feather name="star" size={16} color={theme.colors.primary} />
            </View>
          )}
        </View>
        <Text style={styles.countryText}>{profile.city}, {profile.country}</Text>
        <Text style={styles.bioText}>{profile.bio}</Text>
      </BlurView>
    </TouchableOpacity>
  );

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {isBoosted && (
          <View style={styles.boostTimer}>
            <Feather name="zap" size={20} color={theme.colors.primary} />
            <Text style={styles.boostTimerText}>{formatTime(boostTimeLeft)}</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.boostButton} 
          onPress={boostProfile}
          disabled={isBoosted}
        >
          <Feather name="zap" size={24} color={isBoosted ? theme.colors.textSecondary : theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {renderCards()}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.nopeButton]} onPress={swipeLeft}>
          <Feather name="x" size={30} color={theme.colors.error} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.speakDateButton]} onPress={speakDate}>
          <View style={styles.speakDateIcon}>
            <Text style={styles.speakDateS}>S</Text>
            <Text style={styles.speakDateD}>D</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={swipeRight}>
          <Feather name="heart" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      {isBoosted && (
        <Progress 
          value={(BOOST_DURATION - boostTimeLeft) / BOOST_DURATION * 100}
          color={theme.colors.primary}
          backgroundColor={theme.colors.secondary}
          height={4}
        />
      )}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boostButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boostTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  boostTimerText: {
    color: theme.colors.text,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTouchable: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    overflow: 'hidden',
  },
  nameAgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginRight: 10,
  },
  premiumBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  bioText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nopeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  likeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  speakDateButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  speakDateIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  endOfProfilesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endOfProfilesText: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  reloadButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});