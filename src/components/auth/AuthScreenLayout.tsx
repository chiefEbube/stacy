import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { useAppTheme } from '@/providers/ThemeProvider';
import { Image } from 'expo-image';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const logoSource = require('@/assets/images/stacy-logo-new.png');

interface AuthScreenLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthScreenLayout = ({
  title,
  subtitle,
  children,
  footer,
}: AuthScreenLayoutProps) => {
  const { theme } = useAppTheme();

  return (
    <GradientBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Image source={logoSource} style={styles.logo} contentFit="contain" />
              <Text style={[styles.brand, { color: theme.text }]}>STACY</Text>
              <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
              <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
            </View>

            <GlassCard style={styles.card}>{children}</GlassCard>

            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 6,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  card: {
    width: '100%',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
});
