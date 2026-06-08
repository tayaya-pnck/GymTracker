import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Timer, Input, Loading } from '../../components';
import { useWorkoutStore, useProgramStore, TodayExercise } from '../../stores';
import { colors } from '../../theme';
import { Plus, Check, X, Trophy, Dumbbell } from '../../components/Icons';

export const ActiveWorkoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    activeSession,
    startSession,
    logSet,
    endSession,
    clearSession,
    isLoading,
  } = useWorkoutStore();
  const { todayWorkout } = useProgramStore();

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showSetModal, setShowSetModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<TodayExercise | null>(null);

  // Set input state
  const [setNumber, setSetNumber] = useState('1');
  const [targetReps, setTargetReps] = useState('8');
  const [actualReps, setActualReps] = useState('8');
  const [targetWeight, setTargetWeight] = useState('0');
  const [actualWeight, setActualWeight] = useState('0');

  const handleStartExercise = async (exercise: TodayExercise) => {
    try {
      setSelectedExercise(exercise);
      await startSession(exercise.exerciseName, exercise.muscleGroup);
      setShowExerciseModal(false);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to start session');
    }
  };

  const handleLogSet = async () => {
    if (!selectedExercise) return;

    try {
      await logSet({
        setNumber: parseInt(setNumber),
        targetReps: parseInt(targetReps),
        actualReps: parseInt(actualReps),
        targetWeight: parseFloat(targetWeight),
        actualWeight: parseFloat(actualWeight),
      });

      // Reset for next set
      setSetNumber((parseInt(setNumber) + 1).toString());
      setShowSetModal(false);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to log set');
    }
  };

  const handleEndWorkout = async () => {
    Alert.alert(
      'End Workout',
      'Are you sure you want to end this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: async () => {
            try {
              await endSession();
            } catch (error) {
              // Handle error
            }
          },
        },
      ]
    );
  };

  // If no active session, show exercise selection
  if (!activeSession || activeSession.status !== 'IN_PROGRESS') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
        {/* Header */}
        <View style={{ padding: 16, paddingTop: 8 }}>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 28,
              fontWeight: '700',
            }}
          >
            Start Workout
          </Text>
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Select an exercise to begin
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {todayWorkout?.exercises?.length ? (
            todayWorkout.exercises.map((exercise, index) => (
              <TouchableOpacity
                key={`${exercise.programId}-${index}`}
                onPress={() => handleStartExercise(exercise)}
                activeOpacity={0.7}
              >
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
                        {exercise.exerciseName}
                      </Text>
                      <Text
                        style={{
                          color: colors.text.secondary,
                          fontSize: 14,
                        }}
                      >
                        {exercise.targetSets} sets × {exercise.targetReps} reps
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.accent.primary,
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleStartExercise(exercise)}
                    >
                      <Plus size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
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
                No exercises scheduled for today.{'\n'}Create a program first!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  // Active workout view
  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Header with Timer */}
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
            >
              Current Exercise
            </Text>
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 24,
                fontWeight: '700',
              }}
            >
              {activeSession.exerciseName}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.error + '20',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
            onPress={handleEndWorkout}
          >
            <Text style={{ color: colors.error, fontWeight: '600' }}>End</Text>
          </TouchableOpacity>
        </View>

        <Timer size="large" />
      </View>

      {/* Sets Logged */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12,
          }}
        >
          Sets Completed ({activeSession.setLogs.length})
        </Text>

        {activeSession.setLogs.map((set, index) => (
          <Card key={set.id} style={{ marginBottom: 8 }}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.success + '20',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Check size={16} color={colors.success} />
                </View>
                <View>
                  <Text style={{ color: colors.text.primary, fontWeight: '600' }}>
                    Set {set.setNumber}
                  </Text>
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    {set.actualReps} reps × {set.actualWeight} kg
                  </Text>
                </View>
              </View>
              <Text style={{ color: colors.text.muted, fontSize: 12 }}>
                {set.actualReps === set.targetReps ? '✓ Matched' : 'Partial'}
              </Text>
            </View>
          </Card>
        ))}

        {/* Add Set Button */}
        <Button
          title="Log Set"
          onPress={() => {
            setShowSetModal(true);
            setSetNumber((activeSession.setLogs.length + 1).toString());
          }}
          style={{ marginTop: 16 }}
          icon={<Plus size={18} color="#FFFFFF" style={{ marginRight: 8 }} />}
        />
      </ScrollView>

      {/* Set Input Modal */}
      <Modal
        visible={showSetModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSetModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: colors.background.secondary,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: 40,
            }}
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                Log Set
              </Text>
              <TouchableOpacity onPress={() => setShowSetModal(false)}>
                <X size={24} color={colors.text.muted} />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <Input
                  label="Set #"
                  value={setNumber}
                  onChangeText={setSetNumber}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Input
                  label="Target Reps"
                  value={targetReps}
                  onChangeText={setTargetReps}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View className="flex-row gap-4 mb-6">
              <View className="flex-1">
                <Input
                  label="Actual Reps"
                  value={actualReps}
                  onChangeText={setActualReps}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Input
                  label="Weight (kg)"
                  value={targetWeight}
                  onChangeText={setTargetWeight}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Button
              title="Log Set"
              onPress={handleLogSet}
              isLoading={isLoading}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};