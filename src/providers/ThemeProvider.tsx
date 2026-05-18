import { useThemeStore } from '@/stores/theme.store';
import { AppTheme, darkTheme, lightTheme } from '@/theme/theme';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext } from 'react';

// Extend context value to hold structural configuration flags along with tokens
interface ThemeContextType {
  theme: AppTheme;
  themeMode: 'light' | 'dark';
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  themeMode: 'dark',
  isDark: true,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';
  const activeTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themeMode, isDark }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
};

// Access both layout properties and custom palette tokens cleanly
export const useAppTheme = () => useContext(ThemeContext);