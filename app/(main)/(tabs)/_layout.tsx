import AppHeader from '@/components/AppHeader';
import { Tabs } from 'expo-router';
import { Home, User, Search, Map } from 'lucide-react-native';
import { View,Text } from 'react-native';

export default function TabLayout() {
  return (
    <>
    {/* <AppHeader/> */}
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF5733', // Brand Orange
      tabBarStyle: { height: 60, paddingBottom: 10 },
      headerShown:false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="nearby"
        options={{
          title: 'Near By',
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}