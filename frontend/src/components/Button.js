import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../utils/theme';

export const Button = ({ 
  label, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
}) => {
  const variantStyles = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    danger: { backgroundColor: colors.danger },
    outline: { 
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
  };

  const sizeStyles = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <View style={[commonStyles.row, { gap: spacing.sm }]}>
        {icon}
        <Text style={[
          styles.buttonText,
          variant === 'outline' && { color: colors.primary },
          variant !== 'outline' && { color: colors.surface },
        ]}>
          {loading ? 'Carregando...' : label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.8,
  },
});
