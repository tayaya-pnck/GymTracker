import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ExerciseCard, Card, WeekStrip, Loading } from '../../components';
import { useProgramStore, useWorkoutStore } from '../../stores';
import { colors } from '../../theme';
import { Dumbbell, Play, Calendar, ChevronRight } from '../../components/Icons';

type RootStackParamList = {
  Main: undefined;
  ActiveWorkout: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
type DayStatus = 'completed' | 'scheduled' | 'rest';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { todayWorkout, fetchTodayWorkout, isLoading } = useProgramStore();
  const { activeSession } = useWorkoutStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTodayWorkout();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTodayWorkout();
    setRefreshing(false);
  };

  const todayIndex = new Date().getDay() - 1; // 0 = Monday
  const adjustedTodayIndex = todayIndex === -1 ? 6 : todayIndex;

  // Generate mock week status based on today's workout
  const weekStatus: { day: string; status: DayStatus }[] = DAYS.map((day, index) => ({
    day,
    status: (index < adjustedTodayIndex
      ? (todayWorkout?.exercises?.length ? 'completed' : 'completed')
      : index === adjustedTodayIndex
      ? (todayWorkout?.exercises?.length ? 'scheduled' : 'rest')
      : 'scheduled') as DayStatus,
  }));

  const hasWorkoutToday = todayWorkout?.exercises && todayWorkout.exercises.length > 0;
  const isWorkoutActive = activeSession?.status === 'IN_PROGRESS';

  if (isLoading && !todayWorkout) {
    return <Loading message="Loading today's workout..." />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent.primary}
        />
      }
    >
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            color: colors.text.secondary,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Today's Routine
        </Text>
      </View>

      {/* Week Strip */}
      <View style={{ marginBottom: 24 }}>
        <WeekStrip days={weekStatus} todayIndex={adjustedTodayIndex} />
      </View>

      {/* Rest Day vs Workout Day */}
      {hasWorkoutToday ? (
        <>
          {/* Workout Day */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Dumbbell size={24} color={colors.accent.primary} />
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 20,
                fontWeight: '600',
                marginLeft: 8,
              }}
            >
              {todayWorkout?.dayOfWeek} Workout
            </Text>
          </View>

          {/* Exercise List */}
          {todayWorkout?.exercises.map((exercise, index) => (
            <ExerciseCard
              key={`${exercise.programId}-${index}`}
              exerciseName={exercise.exerciseName}
              muscleGroup={exercise.muscleGroup}
              targetSets={exercise.targetSets}
              targetReps={exercise.targetReps}
              showChevron
              onPress={() => {
                // Navigate to start workout with this exercise
                navigation.navigate('ActiveWorkout');
              }}
            />
          ))}

          {/* Start Workout Button */}
          {isWorkoutActive ? (
            <TouchableOpacity
              style={{
                backgroundColor: colors.success,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                borderRadius: 16,
                marginTop: 16,
              }}
              onPress={() => navigation.navigate('ActiveWorkout')}
            >
              <Play size={20} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 8,
                }}
              >
                Continue Workout
              </Text>
            </TouchableOpacity>
          ) : (
            <Button
              title="Start Workout"
              onPress={() => navigation.navigate('ActiveWorkout')}
              style={{ marginTop: 16 }}
              icon={<Play size={20} color="#FFFFFF" style={{ marginRight: 8 }} />}
            />
          )}
        </>
      ) : (
        <>
          {/* Rest Day */}
          <Card variant="elevated" style={{ marginBottom: 24 }}>
            <View className="items-center py-8">
              <Calendar size={48} color={colors.warning} />
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 22,
                  fontWeight: '600',
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                Rest Day
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                Your body needs recovery.{'\n'}Come back stronger tomorrow!
              </Text>
            </View>
          </Card>

          {/* View Programs Link */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <Text
              style={{
                color: colors.accent.primary,
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              View Your Programs
            </Text>
            <ChevronRight size={16} color={colors.accent.primary} />
          </TouchableOpacity>
        </>
      )}

      {/* Stats Section */}
      <View style={{ marginTop: 32 }}>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}
        >
          This Week
        </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Card style={{ flex: 1 }}>
            <Text style={{ color: colors.text.secondary, fontSize: 12, marginBottom: 4 }}>
              Workouts
            </Text>
            <Text style={{ color: colors.text.primary, fontSize: 24, fontWeight: '700' }}>
              {weekStatus.filter(d => d.status === 'completed').length}
            </Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text style={{ color: colors.text.secondary, fontSize: 12, marginBottom: 4 }}>
              Volume
            </Text>
            <Text style={{ color: colors.text.primary, fontSize: 24, fontWeight: '700' }}>
              12.5k
            </Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text style={{ color: colors.text.secondary, fontSize: 12, marginBottom: 4 }}>
              PRs
            </Text>
            <Text style={{ color: colors.success, fontSize: 24, fontWeight: '700' }}>
              3
            </Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};