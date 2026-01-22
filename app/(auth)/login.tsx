import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ArrowRight, ChefHat } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { InputField } from '@/components/common/Input';
import { useAuth } from '@/lib/contexts/UserContext';
import ErrorView from '@/components/common/ErrorView';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
const { login,isLoading,error,setError } = useAuth();

  const handleLogin = async () => {
      // 1. Basic Validation
      if (!identifier || !password) {
        setError("Please enter all details");
        return;
      }
    
      // 2. Determine if Input is Email or Username
      const isEmail = identifier.includes('@');
      
      const credentials = {
        [isEmail ? 'email' : 'username']: identifier,
        password: password
      };
    
      await login(credentials);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View className="flex-1 px-8 pt-20 pb-10">
          
          {/* Logo & Header */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center mb-4">
              <ChefHat size={40} color="#F97316" />
            </View>
            <Text className="text-4xl font-bold text-foreground tracking-tight">
              Social<Text className="text-primary">Dine</Text>
            </Text>
            <Text className="text-slate-500 mt-2 text-center text-lg">
              Discover & book the best local tables
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            <View className="relative">
              <InputField
                placeholder="Email Address"
                label="Email/Username"
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="relative mt-4">
              <InputField
              label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity className="items-end py-2">
              <Text className="text-primary font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            <ErrorView show={!!error} title={error} type="toast" />
            {/* Login Button */}
            <TouchableOpacity 
              onPress={handleLogin}
              activeOpacity={0.8}
              className="w-full h-16 bg-primary rounded-2xl flex-row items-center justify-center mt-4 shadow-lg shadow-primary/30"
            >
              <Text className="text-white font-bold text-lg mr-2">{isLoading ? "Loading..." : "Sign In "}</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Separator */}
          {/* <View className="flex-row items-center my-10">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="px-4 text-slate-400 text-sm">OR CONTINUE WITH</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View> */}

          {/* Bottom Link */}
          <View className="flex-row justify-center mt-10">
            <Text className="text-slate-500 text-base">New to Social Dine? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-primary font-bold text-base">Join Now</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}