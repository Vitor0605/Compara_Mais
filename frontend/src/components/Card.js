import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../utils/theme';

export const Card = ({ children, style = {}, onPress = null }) => {
  return (
    <View style={[styles.card, commonStyles.shadowSmall, style]}>
      {children}
    </View>
  );
};

export const CardHeader = ({ title, subtitle = null, icon = null }) => {
  return (
    <View style={styles.header}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

export const CardContent = ({ children, style = {} }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  content: {
    padding: spacing.md,
  },
});
