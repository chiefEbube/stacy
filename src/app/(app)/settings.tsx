import { GlassButton } from '@/components/GlassButton';
import { PlaceholderCard, ScreenShell } from '@/components/screens/ScreenShell';
import { useAuth } from '@/hooks/use-auth';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useThemeStore } from '@/stores/theme.store';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { theme, themeMode } = useAppTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { profile, user, signOut, isSigningOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <ScreenShell
      title="Settings"
      subtitle="Profile, preferences, and app configuration."
    >
      <PlaceholderCard
        badge="Account"
        title="Profile"
        description={profile?.email ?? user?.email ?? 'Your account details will appear here.'}
      />
      <PlaceholderCard
        badge="Appearance"
        title="Theme preference"
        description={`Currently using ${themeMode} mode across the app.`}
      />
      <View style={styles.actions}>
        <GlassButton label="Toggle theme" onPress={toggleTheme} />
        <View style={styles.gap} />
        <GlassButton
          label={isSigningOut ? 'Signing out…' : 'Sign out'}
          onPress={handleSignOut}
          variant="subtle"
        />
      </View>
      <Text style={[styles.footerNote, { color: theme.textMuted }]}>
        Notification and avatar settings coming soon.
      </Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginTop: 4,
  },
  gap: {
    height: 12,
  },
  footerNote: {
    marginTop: 20,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
