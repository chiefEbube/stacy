import { AUTH_SHEET_HEIGHT_RATIO, AuthBottomSheet } from '@/components/auth/AuthBottomSheet';
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
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const sheetHeight = screenHeight * AUTH_SHEET_HEIGHT_RATIO;
  const heroHeight = screenHeight - sheetHeight;

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.root}>
        <View style={[styles.hero, { height: heroHeight, paddingTop: insets.top }]}>
          <View style={[styles.heroGlow, { backgroundColor: theme.primary }]} />
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
          <Text style={[styles.brand, { color: theme.textMuted }]}>STACY</Text>
        </View>

        <AuthBottomSheet height={sheetHeight} style={styles.sheetFullBleed}>
          <SafeAreaView style={styles.sheetSafe} edges={['bottom']}>
            <KeyboardAvoidingView
              style={styles.flex}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <View style={styles.sheetHeader}>
                  <View style={[styles.handle, { backgroundColor: theme.glassBorder }]} />
                  <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                  <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
                </View>

                <View style={styles.form}>{children}</View>

                {footer ? <View style={styles.footer}>{footer}</View> : null}
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </AuthBottomSheet>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  root: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heroGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.2,
    top: '30%',
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 12,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 5,
  },
  sheetFullBleed: {
    left: 0,
    right: 0,
    width: '100%',
    marginHorizontal: 0,
  },
  sheetSafe: {
    flex: 1,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  sheetHeader: {
    marginBottom: 28,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
    opacity: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  form: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    paddingTop: 8,
    alignItems: 'center',
  },
});
