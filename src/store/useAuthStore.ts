import { create } from 'zustand';
import { persist } from 'middleware/zustand'; // standard persist or local storage

interface AuthState {
  user: { id: string; email: string; name: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  isBiometricLocked: boolean;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
  setBiometricLock: (locked: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isBiometricLocked: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setBiometricLock: (locked) => set({ isBiometricLocked: locked }),
}));
