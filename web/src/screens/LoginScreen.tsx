import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { Button, TextInput, Card } from '../components/index';
import { Container, FlexBox } from '../styles/components';
import { colors, spacing } from '../styles/variables';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  padding: ${spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${spacing.md};
  color: ${colors.text};
  font-size: 1.75rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${colors.textLight};
  margin-bottom: ${spacing.lg};
`;

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loading, error } = useAuthStore();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Compara Mais</Title>
        <Subtitle>Administrador</Subtitle>

        <form onSubmit={handleLogin}>
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={loading}
          />

          <TextInput
            id="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={loading}
          />

          {error && <p style={{ color: colors.error, marginBottom: spacing.md }}>{error}</p>}

          <Button variant="primary" fullWidth loading={loading} type="submit">
            Entrar
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: spacing.lg, fontSize: '0.85rem', color: colors.textLight }}>
          Acesso restrito a administradores
        </p>
      </LoginCard>
    </LoginWrapper>
  );
};
