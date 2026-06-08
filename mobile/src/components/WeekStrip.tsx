import React from 'react';
import { View, Text } from 'react-native';
import { Check, X } from './Icons';
import { colors } from '../theme';

interface DayStatus {
  day: string;
  status: 'completed' | 'scheduled' | 'rest';
}

interface WeekStripProps {
  days: DayStatus[];
  todayIndex: number;
}

export const WeekStrip: React.FC<WeekStripProps> = ({ days, todayIndex }) => {
  const getDayLabel = (day: string) => {
    return day.substring(0, 3).toUpperCase();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.background.secondary,
        borderRadius: 12,
      }}
    >
      {days.map((day, index) => {
        const isToday = index === todayIndex;
        const isCompleted = day.status === 'completed';
        const isRest = day.status === 'rest';

        return (
          <View key={day.day} className="items-center">
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isToday
                  ? colors.accent.primary
                  : isCompleted
                  ? colors.success + '30'
                  : isRest
                  ? colors.background.tertiary
                  : colors.background.tertiary,
                borderWidth: isToday ? 0 : 1,
                borderColor: colors.border,
              }}
            >
              {isCompleted ? (
                <Check size={18} color={colors.success} />
              ) : isRest ? (
                <X size={18} color={colors.text.muted} />
              ) : (
                <Text
                  style={{
                    color: isToday ? '#FFFFFF' : colors.text.secondary,
                    fontSize: 12,
                    fontWeight: '600',
                  }}
                >
                  {getDayLabel(day.day)}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};