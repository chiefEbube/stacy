import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { useAppTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export function ScreenShell({ title, subtitle, children, contentStyle }: ScreenShellProps) {
  const { theme } = useAppTheme();

  return (
    <GradientBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scroll, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
          </View>
          {children}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

interface PlaceholderCardProps {
  title: string;
  description: string;
  badge?: string;
}

export function PlaceholderCard({ title, description, badge }: PlaceholderCardProps) {
  const { theme } = useAppTheme();

  return (
    <GlassCard style={styles.card}>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}>
          <Text style={[styles.badgeText, { color: theme.primaryLight }]}>{badge}</Text>
        </View>
      ) : null}
      <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.cardBody, { color: theme.textSecondary }]}>{description}</Text>
      <View style={[styles.placeholderBlock, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
        <Text style={[styles.placeholderText, { color: theme.textMuted }]}>Coming soon</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  card: {
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  placeholderBlock: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
