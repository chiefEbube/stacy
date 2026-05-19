import { useAuth } from '@/hooks/use-auth';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useAppTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
