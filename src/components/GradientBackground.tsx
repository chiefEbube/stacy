import { BlurTargetContext } from '@/contexts/blur-target-context';
import { useAppTheme } from '@/providers/ThemeProvider';
import { BlurTargetView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

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
            locations={[0, 0.45, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
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
});
