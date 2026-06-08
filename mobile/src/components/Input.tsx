import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { colors } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.accent.primary;
    return colors.border;
  };

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <Text
          style={{
            color: colors.text.secondary,
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={[
          {
            backgroundColor: colors.background.tertiary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: getBorderColor(),
            paddingHorizontal: 16,
            paddingVertical: 14,
            color: colors.text.primary,
            fontSize: 16,
            lineHeight: 22,
          },
          props.style,
        ]}
        placeholderTextColor={colors.text.muted}
      />
      {error && (
        <Text
          style={{
            color: colors.error,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};