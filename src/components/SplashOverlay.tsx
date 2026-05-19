import { darkTheme } from '@/theme/theme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const logoSource = require('@/assets/images/stacy-logo-new.png');

interface SplashOverlayProps {
  exiting: boolean;
}

export const SplashOverlay = ({ exiting }: SplashOverlayProps) => {
  const logoScale = useSharedValue(0.88);
  const logoOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.6);
  const glowOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    logoScale.value = withSpring(1, { damping: 14, stiffness: 120 });
    glowOpacity.value = withDelay(
      200,
      withTiming(0.55, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
    glowScale.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1.08, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, [glowOpacity, glowScale, logoOpacity, logoScale]);

  useEffect(() => {
    if (exiting) {
      containerOpacity.value = withTiming(0, { duration: 380, easing: Easing.in(Easing.cubic) });
    }
  }, [containerOpacity, exiting]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]} pointerEvents={exiting ? 'none' : 'auto'}>
      <LinearGradient
        colors={darkTheme.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[styles.orb, styles.orbTop, { backgroundColor: darkTheme.primary }]}
      />
      <View
        style={[styles.orb, styles.orbBottom, { backgroundColor: darkTheme.accent }]}
      />

      <View style={styles.center}>
        <Animated.View style={[styles.glow, glowStyle, { shadowColor: darkTheme.primary }]} />
        <Animated.View style={logoStyle}>
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },
  orbTop: {
    width: 260,
    height: 260,
    top: '18%',
    right: -70,
  },
  orbBottom: {
    width: 220,
    height: 220,
    bottom: '16%',
    left: -80,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(168, 85, 247, 0.35)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 48,
    elevation: 16,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
