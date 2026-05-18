import { create } from 'zustand';
import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  error: null,

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Check if user is admin (you'll need to implement this based on Firestore)
      set({ 
        user: userCredential.user,
        loading: false 
      });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, isAdmin: false, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Set user after auth state change
  setUser: (user) => {
    set({ user, loading: false });
  },

  // Set admin status
  setIsAdmin: (isAdmin) => {
    set({ isAdmin });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
