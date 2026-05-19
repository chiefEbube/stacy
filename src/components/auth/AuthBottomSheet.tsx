import { useBlurTarget } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';

export const AUTH_SHEET_HEIGHT_RATIO = 0.75;

interface AuthBottomSheetProps {
  children: React.ReactNode;
  height: number;
  style?: ViewStyle;
}

export const AuthBottomSheet = ({ children, height, style }: AuthBottomSheetProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const { theme, isDark } = useAppTheme();
  const blurTarget = useBlurTarget();
  const androidBlurMethod =
    blurTarget != null ? ('dimezisBlurViewSdk31Plus' as const) : ('none' as const);

  return (
    <View
      style={[
        styles.sheet,
        {
          height,
          width: screenWidth,
          borderColor: theme.glassBorder,
          shadowColor: theme.shadow,
        },
        style,
      ]}
    >
      <BlurView
        blurTarget={blurTarget ?? undefined}
        blurMethod={Platform.OS === 'android' ? androidBlurMethod : undefined}
        intensity={isDark ? 80 : 64}
        blurReductionFactor={3}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.tintOverlay,
          { backgroundColor: theme.modalSheet },
        ]}
      />
      <View
        pointerEvents="none"
        style={[styles.topHighlight, { borderTopColor: theme.glassHighlight }]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    alignSelf: 'stretch',
    marginHorizontal: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
  },
  tintOverlay: {
    opacity: 0.92,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    borderTopWidth: 1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
