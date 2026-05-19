import { useBlurTarget } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface GlassButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  variant?: 'primary' | 'subtle';
}

export const GlassButton = ({
  label,
  onPress,
  style,
  labelStyle,
  variant = 'primary',
}: GlassButtonProps) => {
  const { theme, isDark } = useAppTheme();
  const blurTarget = useBlurTarget();
  const androidBlurMethod =
    blurTarget != null ? ('dimezisBlurViewSdk31Plus' as const) : ('none' as const);

  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, style]}
    >
      <View
        style={[
          styles.button,
          {
            borderColor: isPrimary ? theme.primary : theme.glassBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <BlurView
          blurTarget={blurTarget ?? undefined}
          blurMethod={Platform.OS === 'android' ? androidBlurMethod : undefined}
          intensity={isDark ? 64 : 48}
          blurReductionFactor={3}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isPrimary
                ? 'rgba(126, 34, 206, 0.28)'
                : theme.glassFill,
            },
          ]}
        />
        <Text
          style={[
            styles.label,
            { color: isPrimary ? theme.text : theme.textSecondary },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  button: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
