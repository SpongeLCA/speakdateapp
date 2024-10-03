import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from './ui/Button';
import { Heart, MessageCircle, Search, Settings } from 'lucide-react-native';

export default function Navigation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button variant="ghost" onPress={() => navigation.navigate('Swipe')}>
        <Heart color="#000" size={24} />
      </Button>
      <Button variant="ghost" onPress={() => navigation.navigate('Chat')}>
        <MessageCircle color="#000" size={24} />
      </Button>
      <Button variant="ghost" onPress={() => navigation.navigate('Home')}>
        <Search color="#000" size={24} />
      </Button>
      <Button variant="ghost" onPress={() => navigation.navigate('Settings')}>
        <Settings color="#000" size={24} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});