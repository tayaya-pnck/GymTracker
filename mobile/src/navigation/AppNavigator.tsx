import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProgramListScreen } from '../screens/programs/ProgramListScreen';
import { ActiveWorkoutScreen } from '../screens/tracker/ActiveWorkoutScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { LoginScreen, RegisterScreen } from '../screens/auth';
import { useAuthStore } from '../stores';
import { colors } from '../theme';
import { Home, Dumbbell, User, Activity } from '../components/Icons';

// Auth Stack
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.background.primary },
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

// Tab Navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.background.secondary,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        height: 80,
        paddingBottom: 20,
        paddingTop: 8,
      },
      tabBarActiveTintColor: colors.accent.primary,
      tabBarInactiveTintColor: colors.text.muted,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Programs"
      component={ProgramListScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Dumbbell size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Workout"
      component={ActiveWorkoutScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

// Main Stack
const MainStack = createNativeStackNavigator();

const MainNavigator = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.background.primary },
    }}
  >
    <MainStack.Screen name="Tabs" component={TabNavigator} />
    <MainStack.Screen
      name="ActiveWorkout"
      component={ActiveWorkoutScreen}
      options={{
        presentation: 'fullScreenModal',
      }}
    />
  </MainStack.Navigator>
);

// Root Navigator
export const AppNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};