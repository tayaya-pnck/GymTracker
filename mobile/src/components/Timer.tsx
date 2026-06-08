import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useWorkoutStore } from '../stores';
import { colors } from '../theme';

interface TimerProps {
  size?: 'small' | 'large';
}

export const Timer: React.FC<TimerProps> = ({ size = 'large' }) => {
  const [seconds, setSeconds] = useState(0);
  const { activeSession } = useWorkoutStore();

  useEffect(() => {
    if (!activeSession) {
      setSeconds(0);
      return;
    }

    const startTime = new Date(activeSession.startTime).getTime();
    
    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setSeconds(elapsed);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.startTime]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const isLarge = size === 'large';

  return (
    <View className="items-center">
      <Text
        style={{
          color: colors.accent.primary,
          fontSize: isLarge ? 48 : 24,
          fontWeight: '700',
          fontVariant: ['tabular-nums'],
          letterSpacing: isLarge ? 2 : 1,
        }}
      >
        {formatTime(seconds)}
      </Text>
      {isLarge && (
        <Text
          style={{
            color: colors.text.muted,
            fontSize: 14,
            marginTop: 4,
          }}
        >
          Workout Duration
        </Text>
      )}
    </View>
  );
};