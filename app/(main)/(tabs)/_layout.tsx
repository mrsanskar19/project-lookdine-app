import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { Home, Search, Map, Users, UserCircle } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // --- THEME TOKENS ---
  const theme = {
    // These match your specific HSL values from the CSS
    primary: '#f97316', 
    background: isDark ? '#020617' : '#ffffff',
    card: isDark ? '#020617' : '#ffffff',
    muted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#1e293b' : '#e2e8f0',
  };
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: theme.muted,
      
      // 2. DYNAMIC TAB BAR STYLING
      tabBarStyle: { 
        backgroundColor: theme.card,      // Swaps based on theme
        borderTopColor: theme.border,    // Swaps based on theme
        elevation: 0,
        shadowOpacity: 0,
      },
      headerShown: false
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={focused ? 26 : 24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarIcon: ({ color, focused }) => (
            <Map size={focused ? 26 : 24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Search size={focused ? 26 : 24} color={color} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <Users size={focused ? 26 : 24} color={color} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <UserCircle size={focused ? 26 : 24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}