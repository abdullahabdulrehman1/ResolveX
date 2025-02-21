import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { DarkTheme, LightTheme, CustomTheme } from '../config/color';

interface ThemeContextType {
  theme: CustomTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<CustomTheme>(LightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await SecureStore.getItemAsync('theme');
      if (storedTheme) {
        setTheme(storedTheme === 'dark' ? DarkTheme : LightTheme);
      } else {
        const colorScheme = Appearance.getColorScheme();
        setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.dark ? LightTheme : DarkTheme;
    setTheme(newTheme);
    await SecureStore.setItemAsync('theme', newTheme.dark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};