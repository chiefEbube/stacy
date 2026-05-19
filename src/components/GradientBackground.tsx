import { BlurTargetContext } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GradientBackground = ({ children, style }: GradientBackgroundProps) => {
  const { theme } = useAppTheme();
  const blurTargetRef = useRef<View>(null);

  return (
    <BlurTargetContext.Provider value={blurTargetRef}>
      <View style={[styles.root, style]}>
        <BlurTargetView ref={blurTargetRef} style={StyleSheet.absoluteFill} collapsable={false}>
          <LinearGradient
            colors={theme.backgroundGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              styles.orb,
              styles.orbPrimary,
              { backgroundColor: theme.primary, shadowColor: theme.primary },
            ]}
          />
          <View
            style={[
              styles.orb,
              styles.orbAccent,
              { backgroundColor: theme.accent, shadowColor: theme.accent },
            ]}
          />
          <View
            style={[
              styles.orb,
              styles.orbSoft,
              { backgroundColor: theme.primaryLight, shadowColor: theme.primaryLight },
            ]}
          />
        </BlurTargetView>
        <View style={styles.content}>{children}</View>
      </View>
    </BlurTargetContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: Platform.select({ ios: 0.45, default: 0.55 }),
  },
  orbPrimary: {
    width: 280,
    height: 280,
    top: -60,
    right: -80,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 80,
  },
  orbAccent: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -70,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
  },
  orbSoft: {
    width: 160,
    height: 160,
    top: '42%',
    right: 24,
    opacity: Platform.select({ ios: 0.3, default: 0.4 }),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 50,
  },
});
