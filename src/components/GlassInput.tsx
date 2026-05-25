import { useAppTheme } from '@/providers/ThemeProvider';
import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
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
  secureTextEntry,
  ...inputProps
}: GlassInputProps) => {
  const { theme } = useAppTheme();
  const isPill = variant === 'pill';
  const isPasswordField = secureTextEntry === true;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          isPasswordField && styles.inputShellWithToggle,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.priority.critical : theme.glassBorder,
          },
        ]}
      >
        <TextInput
          placeholderTextColor={theme.textMuted}
          style={[
            styles.input,
            isPasswordField && styles.inputWithToggle,
            { color: theme.text },
            style,
          ]}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          {...inputProps}
        />
        {isPasswordField ? (
          <Pressable
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            style={styles.toggleButton}
          >
            <SymbolView
              name={{
                ios: isPasswordVisible ? 'eye.slash' : 'eye',
                android: isPasswordVisible ? 'visibility_off' : 'visibility',
                web: isPasswordVisible ? 'visibility_off' : 'visibility',
              }}
              size={20}
              tintColor={theme.textMuted}
            />
          </Pressable>
        ) : null}
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
  inputShellWithToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Platform.OS === 'ios' ? 14 : 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  inputWithToggle: {
    paddingRight: 8,
  },
  toggleButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
  },
});
