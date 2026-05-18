import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../styles/variables';
import { Button as StyledButton, FormGroup, Input, Label, ErrorMessage } from '../styles/components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <StyledButton {...props} disabled={loading || props.disabled}>
    {loading ? 'Carregando...' : children}
  </StyledButton>
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, error, ...props }) => (
  <FormGroup>
    {label && <Label htmlFor={props.id}>{label}</Label>}
    <Input {...props} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormGroup>
);

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const CardWrapper = styled.div`
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: ${spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.border};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: ${spacing.md};
  color: ${colors.text};
`;

export const Card: React.FC<CardProps> = ({ children, title }) => (
  <CardWrapper>
    {title && <CardTitle>{title}</CardTitle>}
    {children}
  </CardWrapper>
);

interface StatBoxProps {
  label: string;
  value: number | string;
}

const StatBoxWrapper = styled(CardWrapper)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: ${spacing.sm};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${colors.textLight};
`;

export const StatBox: React.FC<StatBoxProps> = ({ label, value }) => (
  <StatBoxWrapper>
    <StatValue>{value}</StatValue>
    <StatLabel>{label}</StatLabel>
  </StatBoxWrapper>
);
