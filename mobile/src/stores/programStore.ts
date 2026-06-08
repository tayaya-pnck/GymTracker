import { create } from 'zustand';
import { programsApi } from '../services/api';

export interface TodayExercise {
  programId: string;
  programName: string;
  exerciseName: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: number;
}

export interface TodayWorkout {
  dayOfWeek: string;
  exercises: TodayExercise[];
}

export interface ProgramExercise {
  exerciseName: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: number;
}

export interface WorkoutDay {
  name: string;
  dayOfWeek: string;
  exercises: ProgramExercise[];
}

export interface WorkoutProgram {
  id: string;
  name: string;
  active: boolean;
  workoutDays: WorkoutDay[];
}

interface ProgramState {
  programs: WorkoutProgram[];
  todayWorkout: TodayWorkout | null;
  isLoading: boolean;
  error: string | null;
  
  fetchPrograms: () => Promise<void>;
  fetchTodayWorkout: () => Promise<void>;
  createProgram: (data: any) => Promise<void>;
  clearError: () => void;
}

export const useProgramStore = create<ProgramState>()((set, get) => ({
  programs: [],
  todayWorkout: null,
  isLoading: false,
  error: null,

  fetchPrograms: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await programsApi.getAll();
      set({ programs: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch programs',
        isLoading: false,
      });
    }
  },

  fetchTodayWorkout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await programsApi.getToday();
      set({ todayWorkout: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch today workout',
        isLoading: false,
      });
    }
  },

  createProgram: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      await programsApi.create(data);
      await get().fetchPrograms();
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create program',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));