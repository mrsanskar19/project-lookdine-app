import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      headerTitle: "", 
      headerShadowVisible: false 
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* <Stack.Screen name="register" options={{ title: "Create Account" }} /> */}
    </Stack>
  );
}