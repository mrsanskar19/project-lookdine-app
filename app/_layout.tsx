import { useEffect, useState } from 'react';
import { Stack, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import "./global.css";
import { ThemeProvider, useAppTheme } from '@/lib/contexts/theme-context';
import { View } from 'react-native';
import { AuthProvider } from '@/lib/contexts/UserContext';
import { StatusBar } from 'expo-status-bar';
import CustomSplash from '@/components/common/CustomSplash';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
        setAppIsReady(true);
  }, []);

  // Use a second effect to handle navigation AFTER the component mounts
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
      // Only redirect once the Stack is definitely in the DOM
      router.replace('/(auth)/login');
    }
  }, [appIsReady]);

  // IMPORTANT: Do NOT return null. Return the Stack so it can initialize.
  return (
    <ThemeProvider>
        <AuthProvider>
        {!appIsReady ? (
            <CustomSplash />
          ) : (
            <RootLayoutContent />
          )}
        </AuthProvider>
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { activeTheme } = useAppTheme();
  const isUnder18 = false;

  return (
    // This View applies the 'dark' class to the entire app tree
    <View className={`flex-1 ${activeTheme === 'dark' ? 'dark' : ''} ${isUnder18 ? 'under18' : ''}`}>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)/(tabs)" />
      </Stack>
    </View>
  );
}