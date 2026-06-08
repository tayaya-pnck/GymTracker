import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Card, Loading } from '../../components';
import { useProgramStore } from '../../stores';
import { colors } from '../../theme';
import { Plus, ChevronRight, Dumbbell } from '../../components/Icons';

export const ProgramListScreen: React.FC = () => {
  const { programs, fetchPrograms, isLoading } = useProgramStore();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPrograms();
    setRefreshing(false);
  };

  if (isLoading && programs.length === 0) {
    return <Loading message="Loading programs..." />;
  }

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
          My Programs
        </Text>
        <Text
          style={{
            color: colors.text.secondary,
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {programs.length} program{programs.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent.primary}
          />
        }
      >
        {/* Create New Program Card */}
        <TouchableOpacity activeOpacity={0.7}>
          <Card
            variant="elevated"
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: colors.accent.primary,
              marginBottom: 16,
            }}
          >
            <View className="flex-row items-center justify-center py-4">
              <Plus size={24} color={colors.accent.primary} />
              <Text
                style={{
                  color: colors.accent.primary,
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 8,
                }}
              >
                Create New Program
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Program List */}
        {programs.map((program) => (
          <TouchableOpacity key={program.id} activeOpacity={0.7}>
            <Card style={{ marginBottom: 12 }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Text
                      style={{
                        color: colors.text.primary,
                        fontSize: 18,
                        fontWeight: '600',
                      }}
                    >
                      {program.name}
                    </Text>
                    {program.active && (
                      <View
                        style={{
                          backgroundColor: colors.success + '20',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 4,
                          marginLeft: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.success,
                            fontSize: 10,
                            fontWeight: '600',
                          }}
                        >
                          ACTIVE
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 14,
                    }}
                  >
                    {program.workoutDays?.length || 0} days •{' '}
                    {program.workoutDays?.reduce(
                      (acc, day) => acc + (day.exercises?.length || 0),
                      0
                    ) || 0}{' '}
                    exercises
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.text.muted} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {programs.length === 0 && (
          <View className="items-center py-20">
            <Dumbbell size={64} color={colors.text.muted} />
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 16,
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              No programs yet.{'\n'}Create your first program to get started!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};