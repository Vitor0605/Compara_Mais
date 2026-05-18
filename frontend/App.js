import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

import { auth } from './services/firebase';
import { useAuthStore } from './store/authStore';
import { colors } from './utils/theme';

// Screens
import { LoginScreen } from './screens/LoginScreen';
import { AdminScreen } from './screens/AdminScreen';
import { AdminScreenDashboard } from './screens/AdminScreen/AdminScreenDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Admin Tabs Navigator
function AdminTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminScreenDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Moderação"
        component={AdminScreen}
        options={{
          tabBarLabel: 'Moderação',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const { setUser, isAdmin } = useAuthStore();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const { user } = useAuthStore.getState();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen
            name="AdminTabs"
            component={AdminTabsNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
