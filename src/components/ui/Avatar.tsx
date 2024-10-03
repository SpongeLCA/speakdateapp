import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';

interface AvatarProps {
  source?: ImageSourcePropType;
  fallback?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  fallback,
  size = 40,
  style,
}) => {
  const containerStyle = [
    styles.container,
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ];

  if (source) {
    return (
      <View style={containerStyle}>
        <Image source={source} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={[containerStyle, styles.fallbackContainer]}>
      <Text style={[styles.fallbackText, { fontSize: size / 2.5 }]}>
        {fallback ? fallback.slice(0, 2).toUpperCase() : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#4B5563',
    fontWeight: 'bold',
  },
});