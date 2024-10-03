import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';

const navItems = [
  { name: 'Home', icon: 'home' },
  { name: 'Swipe', icon: 'heart' },
  { name: 'Chat', icon: 'message-circle' },
  { name: 'Profile', icon: 'user' },
];

export default function Navigation() {
  const navigation = useNavigation();
  const route = useRoute();

  const renderNavItem = (item) => {
    const isActive = route.name === item.name;
    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => navigation.navigate(item.name)}
        style={[styles.navItem, isActive && styles.activeNavItem]}
      >
        <Feather
          name={item.icon}
          size={24}
          color={isActive ? theme.colors.primary : theme.colors.text}
        />
        <Text style={[
          styles.navText,
          isActive && styles.activeNavText
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {navItems.map(renderNavItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  navItem: {
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: theme.colors.text,
  },
  activeNavText: {
    color: theme.colors.primary,
  },
});