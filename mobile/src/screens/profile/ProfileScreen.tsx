import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from '../../components';
import { useAuthStore } from '../../stores';
import { colors } from '../../theme';
import { LogOut, User, Settings, HelpCircle } from '../../components/Icons';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Header */}
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Profile
        </Text>
      </View>

      {/* User Info Card */}
      <View style={{ padding: 16, paddingTop: 0 }}>
        <Card variant="elevated">
          <View className="flex-row items-center">
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.accent.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: '700',
                }}
              >
                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontWeight: '600',
                }}
              >
                {user?.displayName || 'User'}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                {user?.email}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Menu Items */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <User size={24} color={colors.text.secondary} />
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                  marginLeft: 16,
                }}
              >
                Account Settings
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <Settings size={24} color={colors.text.secondary} />
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                  marginLeft: 16,
                }}
              >
                App Settings
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <HelpCircle size={24} color={colors.text.secondary} />
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                  marginLeft: 16,
                }}
              >
                Help & Support
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={{ marginTop: 24 }}
        >
          <View
            style={{
              backgroundColor: colors.error + '20',
              padding: 16,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LogOut size={20} color={colors.error} />
            <Text
              style={{
                color: colors.error,
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 8,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}>
        <Text
          style={{
            color: colors.text.muted,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          GymTracker v1.0.0
        </Text>
      </View>
    </View>
  );
};