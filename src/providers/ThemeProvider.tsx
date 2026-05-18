import { useThemeStore } from '@/stores/theme.store';
import { AppTheme, darkTheme, lightTheme } from '@/theme/theme';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext<AppTheme>(darkTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const activeTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={activeTheme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);