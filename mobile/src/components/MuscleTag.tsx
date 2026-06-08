import React from 'react';
import { View, Text } from 'react-native';
import { getMuscleGroupColor } from '../theme';

interface MuscleTagProps {
  muscleGroup: string;
  size?: 'small' | 'medium';
}

export const MuscleTag: React.FC<MuscleTagProps> = ({
  muscleGroup,
  size = 'small',
}) => {
  const color = getMuscleGroupColor(muscleGroup);
  const displayName = muscleGroup.charAt(0) + muscleGroup.slice(1).toLowerCase();

  return (
    <View
      style={{
        backgroundColor: `${color}20`,
        paddingHorizontal: size === 'small' ? 8 : 12,
        paddingVertical: size === 'small' ? 4 : 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: color,
          fontSize: size === 'small' ? 10 : 12,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {displayName}
      </Text>
    </View>
  );
};