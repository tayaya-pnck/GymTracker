import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from './Icons';
import { Card } from './Card';
import { MuscleTag } from './MuscleTag';
import { colors } from '../theme';

interface ExerciseCardProps {
  exerciseName: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: number;
  onPress?: () => void;
  showChevron?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseName,
  muscleGroup,
  targetSets,
  targetReps,
  onPress,
  showChevron = false,
}) => {
  const content = (
    <Card style={{ marginBottom: 12 }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 8,
            }}
          >
            {exerciseName}
          </Text>
          <View className="flex-row items-center gap-3">
            <MuscleTag muscleGroup={muscleGroup} />
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
            >
              {targetSets} sets × {targetReps} reps
            </Text>
          </View>
        </View>
        {showChevron && (
          <ChevronRight size={24} color={colors.text.muted} />
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};