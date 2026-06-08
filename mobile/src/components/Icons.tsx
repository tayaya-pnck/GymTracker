import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Simple icon component using Unicode symbols
const createIcon = (iconChar: string) => {
  const IconComponent: React.FC<{ size?: number; color?: string; style?: any }> = ({
    size = 24,
    color = colors.text.primary,
    style,
  }) => (
    <Text style={[styles.icon, { fontSize: size, color }, style]}>
      {iconChar}
    </Text>
  );
  return IconComponent;
};

// Icon components
export const Home = createIcon('⌂');
export const Dumbbell = createIcon('⚖');
export const User = createIcon('👤');
export const Activity = createIcon('⚡');
export const Plus = createIcon('+');
export const Check = createIcon('✓');
export const X = createIcon('✕');
export const ChevronRight = createIcon('›');
export const ChevronLeft = createIcon('‹');
export const Play = createIcon('▶');
export const Pause = createIcon('⏸');
export const Settings = createIcon('⚙');
export const LogOut = createIcon('⏻');
export const HelpCircle = createIcon('?');
export const Calendar = createIcon('📅');
export const Trophy = createIcon('🏆');
export const Clock = createIcon('⏱');

// Alternative text-based icons for better visibility
export const DumbbellAlt: React.FC<{ size?: number; color?: string; style?: any }> = ({
  size = 24,
  color = colors.text.primary,
  style,
}) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.emojiIcon, { fontSize: size, color }]}>🏋️</Text>
  </View>
);

export const TrophyAlt: React.FC<{ size?: number; color?: string; style?: any }> = ({
  size = 24,
  color = colors.text.primary,
  style,
}) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.emojiIcon, { fontSize: size, color }]}>🏆</Text>
  </View>
);

const styles = StyleSheet.create({
  icon: {
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiIcon: {
    textAlign: 'center',
  },
});