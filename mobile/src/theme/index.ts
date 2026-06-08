export const colors = {
  background: {
    primary: '#0D0D0F',
    secondary: '#1A1A1E',
    tertiary: '#252529',
  },
  surface: {
    elevated: '#2D2D33',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1A6',
    muted: '#6B6B70',
  },
  accent: {
    primary: '#FF6B35',
    glow: '#FF8C5A',
  },
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  border: '#3A3A40',
};

export const muscleGroupColors: Record<string, string> = {
  CHEST: '#FF6B35',
  BACK: '#34D399',
  LEGS: '#60A5FA',
  SHOULDER: '#A78BFA',
  ARMS: '#F472B6',
  CORE: '#FBBF24',
  CARDIO: '#F87171',
};

export const getMuscleGroupColor = (muscleGroup: string): string => {
  return muscleGroupColors[muscleGroup] || colors.accent.primary;
};