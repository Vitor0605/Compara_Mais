import React, { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../store/authStore';
import { LoginScreen } from '../screens/LoginScreen';
import { AdminScreen } from '../screens/AdminScreen';

const App: React.FC = () => {
  const { setUser, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsInitializing(false);
    });

    return unsubscribe;
  }, [setUser]);

  if (isInitializing) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>;
  }

  return user ? (
    <AdminScreen onLogout={() => {}} />
  ) : (
    <LoginScreen onLoginSuccess={() => {}} />
  );
};

export default App;
