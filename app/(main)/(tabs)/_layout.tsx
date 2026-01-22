import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Search, Map, Users, UserCircle } from 'lucide-react-native';
import { useAppTheme } from '@/lib/contexts/theme-context'; // Import your custom hook

export default function TabLayout() {
  const { activeTheme } = useAppTheme(); // Use your custom context
  const isDark = activeTheme === 'dark';

  // --- THEME TOKENS ---
  const theme = {
    primary: '#f97316', 
    background: isDark ? '#020617' : '#ffffff',
    muted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#1e293b' : '#f1f5f9',
  };

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: theme.muted,
      headerShown: false,
      
      // 2. DYNAMIC TAB BAR STYLING
      tabBarStyle: { 
        backgroundColor: theme.background,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        elevation: 0,
        shadowOpacity: 0,
        height: 60,
        paddingBottom: 8,
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5
      }
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={focused ? 26 : 24} color={color} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarIcon: ({ color, focused }) => (
            <Map size={focused ? 26 : 24} color={color} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Search size={focused ? 26 : 24} color={color} strokeWidth={focused ? 3 : 2} />
          )
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: "Social",
          tabBarIcon: ({ color, focused }) => (
            <Users size={focused ? 26 : 24} color={color} strokeWidth={focused ? 3 : 2} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused }) => (
            <UserCircle size={focused ? 26 : 24} color={color} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}