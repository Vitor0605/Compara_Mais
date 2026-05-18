import styled from 'styled-components';
import { colors, spacing, breakpoints } from './variables';

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${spacing.md};

  @media (min-width: ${breakpoints.sm}) {
    max-width: ${breakpoints.sm};
  }

  @media (min-width: ${breakpoints.md}) {
    max-width: ${breakpoints.md};
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: ${breakpoints.lg};
    padding: ${spacing.lg};
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger'; fullWidth?: boolean }>`
  padding: ${spacing.md} ${spacing.lg};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  background-color: ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return colors.secondary;
      case 'danger':
        return colors.danger;
      default:
        return colors.primary;
    }
  }};
  color: ${colors.surface};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: ${spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.border};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primaryLight};
  }

  &:disabled {
    background-color: ${colors.background};
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing.sm};
  font-weight: 600;
  font-size: 0.95rem;
  color: ${colors.text};
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.85rem;
  margin-top: ${spacing.sm};
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 1}, 1fr);
  gap: ${spacing.lg};

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(${({ columns }) => columns || 2}, 1fr);
  }

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);
  }
`;

export const FlexBox = styled.div<{ gap?: string; justifyContent?: string; alignItems?: string }>`
  display: flex;
  gap: ${({ gap }) => gap || spacing.md};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
`;

export const Header = styled.header`
  background-color: ${colors.surface};
  border-bottom: 1px solid ${colors.border};
  padding: ${spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 80px);
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;
