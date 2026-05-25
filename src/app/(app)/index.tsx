import { PlaceholderCard, ScreenShell } from '@/components/screens/ScreenShell';
import { useAuth } from '@/hooks/use-auth';
import { getDisplayName } from '@/lib/auth';
import { useAppTheme } from '@/providers/ThemeProvider';
import { palette } from '@/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { themeMode } = useAppTheme();
  const { user, profile } = useAuth();
  const displayName = getDisplayName(user, profile);

  return (
    <ScreenShell
      title="Home"
      subtitle={`Good to see you, ${displayName}. Your day at a glance.`}
    >
      <View style={styles.heroWrap}>
        <LinearGradient
          colors={
            themeMode === 'dark'
              ? [palette.purple700, palette.purple600, palette.purple500]
              : [palette.purple500, palette.purple600, palette.purple700]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <Text style={styles.heroLabel}>Today</Text>
          <Text style={styles.heroValue}>Overview</Text>
          <Text style={styles.heroHint}>Dashboard placeholder</Text>
        </LinearGradient>
      </View>

      <PlaceholderCard
        badge="Focus"
        title="Priority queue"
        description="Your top tasks and reminders will appear here."
      />
      <PlaceholderCard
        badge="Pulse"
        title="Activity feed"
        description="Recent updates across tasks, schedule, and insights."
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroGradient: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heroValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  heroHint: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 8,
  },
});
