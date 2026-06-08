import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { authApi, setAuthToken } from '../services/api';

const storage = createMMKV({ id: 'auth-storage' });

const base64Decode = (str: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  str = str.replace(/=+$/, '');
  for (let i = 0; i < str.length; i++) {
    const enc1 = chars.indexOf(str.charAt(i));
    const enc2 = chars.indexOf(str.charAt(i + 1));
    const enc3 = chars.indexOf(str.charAt(i + 2));
    const enc4 = chars.indexOf(str.charAt(i + 3));
    const dec1 = (enc1 << 2) | (enc2 >> 4);
    const dec2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const dec3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(dec1);
    if (enc3 !== 64) output += String.fromCharCode(dec2);
    if (enc4 !== 64) output += String.fromCharCode(dec3);
  }
  return output;
};

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

interface User {
  email: string;
  displayName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.authenticate({ email, password });
          const token = response.data.token;
          
          // Extract email from token payload (simple base64 decode)
          const payload = JSON.parse(base64Decode(token.split('.')[1]));
          
          set({
            token,
            user: { email: payload.sub, displayName: payload.sub.split('@')[0] },
            isAuthenticated: true,
            isLoading: false,
          });
          
          setAuthToken(token);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, displayName: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.register({ email, password, displayName });
          // Auto login after register
          await get().login(email, password);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        setAuthToken(null);
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize token on app load
const state = useAuthStore.getState();
if (state.token) {
  setAuthToken(state.token);
}