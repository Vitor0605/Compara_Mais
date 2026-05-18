import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { colors, spacing, typography, commonStyles } from '../utils/theme';
import { Card } from '../components/Card';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const user = await login(email, password);
      
      // Check if user is admin (you'll need to implement this check)
      // For now, redirect to admin screen
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminTabs' }],
        });
      }
    } catch (error) {
      Alert.alert('Erro de Login', error.message || 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Compara Mais</Text>
            <Text style={styles.subtitle}>Administrador</Text>
          </View>

          {/* Login Card */}
          <Card style={styles.card}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Faça Login</Text>

              <TextInput
                label="Email"
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
              />

              <TextInput
                label="Senha"
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
              />

              <Button
                label="Entrar"
                onPress={handleLogin}
                variant="primary"
                size="lg"
                loading={loading}
              />

              <View style={styles.divider} />

              <Text style={styles.helperText}>
                Acesso restrito a administradores
              </Text>
            </View>
          </Card>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📱 Painel Administrativo</Text>
            <Text style={styles.infoText}>
              Este é o portal de administração do aplicativo Compara Mais. Use suas credenciais de admin para acessar.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  card: {
    marginBottom: spacing.lg,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  formTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  helperText: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textLight,
    lineHeight: 20,
  },
});
