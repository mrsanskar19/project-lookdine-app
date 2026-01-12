import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sun, Moon, Monitor } from 'lucide-react-native'; // Professional icons
import { useAppTheme } from '@/lib/contexts/theme-context';

export default function ThemeToggle() {
  const { theme, setTheme, activeTheme } = useAppTheme();

  // Helper to draw the buttons
  const TabButton = ({ mode, label, Icon }: { mode: 'light' | 'dark' | 'system', label: string, Icon: any }) => {
    const isActive = theme === mode;
    
    return (
      <TouchableOpacity
        onPress={() => setTheme(mode)}
        className={`flex-1 flex-row items-center justify-center py-3 px-2 rounded-xl ${
          isActive ? 'bg-white dark:bg-slate-800 shadow-sm' : ''
        }`}
      >
        <Icon size={18} color={isActive ? '#F97316' : '#64748b'} />
        <Text className={`ml-2 font-medium ${
          isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500'
        }`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl flex-row border border-border">
      <TabButton mode="light" label="Light" Icon={Sun} />
      <TabButton mode="dark" label="Dark" Icon={Moon} />
      <TabButton mode="system" label="System" Icon={Monitor} />
    </View>
  );
}