import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
  value: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  color = '#007AFF',
  backgroundColor = '#E0E0E0',
  height = 4,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <View style={[styles.container, { backgroundColor, height }]}>
      <View
        style={[
          styles.bar,
          {
            width: `${clampedValue}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
});