import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { colors } from '../theme';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.primary,
      }}
    >
      <ActivityIndicator size="large" color={colors.accent.primary} />
      {message && (
        <Text
          style={{
            color: colors.text.secondary,
            marginTop: 16,
            fontSize: 14,
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
};