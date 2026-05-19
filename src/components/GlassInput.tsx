import { useAppTheme } from '@/providers/ThemeProvider';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface GlassInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'pill';
}

export const GlassInput = ({
  label,
  error,
  containerStyle,
  style,
  variant = 'default',
  ...inputProps
}: GlassInputProps) => {
  const { theme } = useAppTheme();
  const isPill = variant === 'pill';

  return (
    <View style={[styles.wrapper, isPill && styles.wrapperPill, containerStyle]}>
      <Text
        style={[
          styles.label,
          isPill && styles.labelPill,
          { color: theme.textSecondary },
        ]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.inputShell,
          isPill && styles.inputShellPill,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.priority.critical : theme.glassBorder,
          },
        ]}
      >
        <TextInput
          placeholderTextColor={theme.textMuted}
          style={[styles.input, { color: theme.text }, style]}
          {...inputProps}
        />
      </View>
      {error ? (
        <Text style={[styles.error, { color: theme.priority.critical }]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  wrapperPill: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  labelPill: {
    fontSize: 14,
    letterSpacing: 0,
    textTransform: 'none',
    marginBottom: 10,
  },
  inputShell: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputShellPill: {
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
  },
});
