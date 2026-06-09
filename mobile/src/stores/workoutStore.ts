import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { trackingApi } from '../services/api';
import { asyncStorage } from './storage';

export interface SetLog {
  id: string;
  setNumber: number;
  targetReps: number;
  actualReps: number;
  targetWeight: number;
  actualWeight: number;
  loggedAt: string;
}

export interface ActiveSession {
  sessionId: string;
  exerciseName: string;
  muscleGroup: string;
  startTime: string;
  endTime?: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  setLogs: SetLog[];
  totalDuration?: string;
}

interface WorkoutState {
  activeSession: ActiveSession | null;
  isLoading: boolean;
  error: string | null;
  
  startSession: (exerciseName: string, muscleGroup: string) => Promise<void>;
  logSet: (setData: {
    setNumber: number;
    targetReps: number;
    actualReps: number;
    targetWeight: number;
    actualWeight: number;
  }) => Promise<void>;
  endSession: () => Promise<void>;
  clearSession: () => void;
  getElapsedTime: () => number;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      activeSession: null,
      isLoading: false,
      error: null,

      startSession: async (exerciseName: string, muscleGroup: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await trackingApi.startSession({ exerciseName, muscleGroup });
          const sessionData = response.data;
          
          set({
            activeSession: {
              sessionId: sessionData.sessionId,
              exerciseName: sessionData.exerciseName,
              muscleGroup: sessionData.muscleGroup,
              startTime: sessionData.startTime,
              status: sessionData.status,
              setLogs: [],
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to start session',
            isLoading: false,
          });
          throw error;
        }
      },

      logSet: async (setData: {
        setNumber: number;
        targetReps: number;
        actualReps: number;
        targetWeight: number;
        actualWeight: number;
      }) => {
        const { activeSession } = get();
        if (!activeSession) return;

        set({ isLoading: true, error: null });
        try {
          const response = await trackingApi.logSet(setData);
          const newSet = response.data;
          
          set({
            activeSession: activeSession
              ? {
                  ...activeSession,
                  setLogs: [...activeSession.setLogs, newSet],
                }
              : null,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to log set',
            isLoading: false,
          });
          throw error;
        }
      },

      endSession: async () => {
        const { activeSession } = get();
        if (!activeSession) return;

        set({ isLoading: true, error: null });
        try {
          const response = await trackingApi.endSession();
          const sessionData = response.data;
          
          set({
            activeSession: {
              ...activeSession,
              endTime: sessionData.endTime,
              status: sessionData.status,
              totalDuration: sessionData.totalDuration,
              setLogs: sessionData.setLogs,
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to end session',
            isLoading: false,
          });
          throw error;
        }
      },

      clearSession: () => {
        set({ activeSession: null, error: null });
      },

      getElapsedTime: () => {
        const { activeSession } = get();
        if (!activeSession || !activeSession.startTime) return 0;
        
        const start = new Date(activeSession.startTime).getTime();
        const now = Date.now();
        return Math.floor((now - start) / 1000);
      },
    }),
    {
      name: 'workout-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        activeSession: state.activeSession,
      }),
    }
  )
);