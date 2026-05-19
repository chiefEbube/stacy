import { SplashOverlay } from '@/components/SplashOverlay';
import { useAppReady } from '@/hooks/use-app-ready';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { useAppTheme } from '@/providers/ThemeProvider';
import { AppProviders } from '@/providers/AppProviders';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { theme, isDark } = useAppTheme();
  const { ready, splashExiting } = useAppReady();
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);

  const onShellLayout = useCallback(() => {
    if (!nativeSplashHidden) {
      setNativeSplashHidden(true);
      SplashScreen.hideAsync();
    }
  }, [nativeSplashHidden]);

  const nativeNavigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.tabBar,
      text: theme.text,
      border: theme.border,
      notification: theme.accent,
    },
  };

  return (
    <View style={{ flex: 1 }} onLayout={onShellLayout}>
      <NavigationThemeProvider value={nativeNavigationTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </NavigationThemeProvider>
      {!ready && <SplashOverlay exiting={splashExiting} />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
