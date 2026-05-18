import { useAppTheme } from '@/providers/ThemeProvider';
import { useThemeStore } from '@/stores/theme.store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IndexScreen() {
  const { theme, themeMode } = useAppTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // We fall back to standard solid rendering temporarily until the full LinearGradient slice is wired up
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.glassBorder }]}>
        <Text style={[styles.title, { color: theme.primary }]}>Stacy Core Engine</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Theme Initialization: <Text style={{ fontWeight: 'bold' }}>{themeMode.toUpperCase()}</Text>
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={toggleTheme}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>Toggle Premium Aura</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});