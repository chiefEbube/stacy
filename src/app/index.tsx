import { GlassButton } from '@/components/GlassButton';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { useAppTheme } from '@/providers/ThemeProvider';
import { palette } from '@/theme/theme';
import { useThemeStore } from '@/stores/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const { theme, themeMode } = useAppTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <GradientBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={[styles.brand, { color: theme.text }]}>STACY</Text>
          <Text style={[styles.brandSub, { color: theme.textMuted }]}>Core Engine</Text>
        </View>

        <View style={styles.body}>
          <GlassCard style={styles.heroCard} contentStyle={styles.heroCardContent}>
            <LinearGradient
              colors={
                themeMode === 'dark'
                  ? [palette.purple700, palette.purple600, palette.purple500]
                  : [palette.purple400, palette.purple500, palette.purple600]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <Text style={styles.heroLabel}>Premium Aura</Text>
              <Text style={styles.heroValue}>{themeMode.toUpperCase()}</Text>
              <Text style={styles.heroHint}>Active visual profile</Text>
            </LinearGradient>
          </GlassCard>

          <GlassCard style={styles.statusCard}>
            <Text style={[styles.cardTitle, { color: theme.primary }]}>Stacy Core Engine</Text>
            <Text style={[styles.cardBody, { color: theme.textSecondary }]}>
              Theme initialization complete. Your interface is running in{' '}
              <Text style={[styles.emphasis, { color: theme.text }]}>{themeMode}</Text> mode with
              frosted surfaces and depth-matched accents.
            </Text>

            <View style={[styles.statusRow, { borderColor: theme.border }]}>
              <View style={[styles.statusDot, { backgroundColor: theme.success }]} />
              <Text style={[styles.statusText, { color: theme.textMuted }]}>
                Glass pipeline ready
              </Text>
            </View>

            <GlassButton label="Toggle Premium Aura" onPress={toggleTheme} />
          </GlassCard>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
  },
  brandSub: {
    marginTop: 4,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  heroCard: {
    width: '100%',
  },
  heroCardContent: {
    padding: 0,
  },
  heroGradient: {
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    margin: 12,
  },
  heroLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    marginTop: 6,
  },
  heroHint: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 14,
    marginTop: 8,
  },
  statusCard: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  emphasis: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
