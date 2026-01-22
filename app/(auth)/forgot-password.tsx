import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Mail, User, Send } from 'lucide-react-native';
import { apiRequest } from '@/lib/services/api';

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const handleResetRequest = async () => {
    if (!identifier) {
    //   showToast("Please enter your email or username", "error");
      return;
    }

    setIsLoading(true);
    const isEmail = identifier.includes('@');
    
    try {
      await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({
          [isEmail ? 'email' : 'username']: identifier
        }),
      });

    //   showToast("Reset link sent to your registered email");
      router.back();
    } catch (err) {
    //   showToast("User not found or connection error", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft size={28} className="text-foreground" />
        </TouchableOpacity>
      </View>

      <View className="px-8 pt-4">
        <Text className="text-3xl font-black text-foreground tracking-tighter">
          Reset Password
        </Text>
        <Text className="text-muted-foreground font-medium mt-2 leading-5">
          Enter your details and we'll send a link to reset your password.
        </Text>

        {/* --- INPUT FIELD --- */}
        <View className="mt-10">
          <View className="flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-4">
            {identifier.includes('@') ? (
              <Mail size={20} className="text-primary" />
            ) : (
              <User size={20} className="text-primary" />
            )}
            <TextInput
              placeholder="Email or Username"
              placeholderTextColor="#94a3b8"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              className="flex-1 ml-3 text-foreground font-bold"
            />
          </View>
        </View>

        {/* --- SUBMIT BUTTON --- */}
        <TouchableOpacity 
          onPress={handleResetRequest}
          disabled={isLoading}
          className={`mt-8 py-5 rounded-2xl flex-row items-center justify-center shadow-lg ${
            isLoading ? 'bg-primary/50' : 'bg-primary'
          }`}
        >
          <Text className="text-white font-black uppercase tracking-tight mr-2">
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Text>
          {!isLoading && <Send size={18} color="white" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}