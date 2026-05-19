import { useBlurTarget } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  intensity?: number;
}

export const GlassCard = ({ children, style, contentStyle, intensity }: GlassCardProps) => {
  const { theme, isDark } = useAppTheme();
  const blurTarget = useBlurTarget();

  const blurIntensity = intensity ?? (isDark ? 72 : 56);
  const androidBlurMethod =
    blurTarget != null ? ('dimezisBlurViewSdk31Plus' as const) : ('none' as const);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderColor: theme.glassBorder,
          shadowColor: theme.shadow,
        },
        style,
      ]}
    >
      <BlurView
        blurTarget={blurTarget ?? undefined}
        blurMethod={Platform.OS === 'android' ? androidBlurMethod : undefined}
        intensity={blurIntensity}
        blurReductionFactor={Platform.OS === 'android' ? 3 : 4}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.tintOverlay, { backgroundColor: theme.glassFill }]}
      />
      <View
        pointerEvents="none"
        style={[styles.innerHighlight, { borderColor: theme.glassHighlight }]}
      />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 28,
    elevation: 12,
  },
  tintOverlay: {
    opacity: 0.55,
  },
  innerHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderRadius: 24,
    borderTopColor: 'rgba(255, 255, 255, 0.22)',
    borderLeftColor: 'rgba(255, 255, 255, 0.12)',
    borderRightColor: 'rgba(255, 255, 255, 0.04)',
    borderBottomColor: 'rgba(255, 255, 255, 0.02)',
  },
  content: {
    padding: 24,
    zIndex: 1,
  },
});
