import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useNativeWind } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;          // User preference: 'light' | 'dark' | 'system'
  activeTheme: 'light' | 'dark'; // What is actually showing right now
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorScheme, setColorScheme } = useNativeWind();
  const [theme, setInternalTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('user-theme');
      if (saved) {
        const mode = saved as ThemeMode;
        setInternalTheme(mode);
        setColorScheme(mode);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (mode: ThemeMode) => {
    setInternalTheme(mode);
    setColorScheme(mode);
    await AsyncStorage.setItem('user-theme', mode);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      activeTheme: colorScheme ?? "dark", 
      setTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within ThemeProvider');
  return context;
};