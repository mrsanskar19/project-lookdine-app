import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Mail, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react-native';
// import { useToast } from '@/lib/contexts/toast-context';
import { apiRequest } from '@/lib/services/api';

export default function ChangeEmail() {
  const router = useRouter();
//   const { showToast } = useToast();
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');

  // STEP 1: Request OTP
  const handleRequestOTP = async () => {
    if (!newEmail.includes('@')) {
    //   showToast("Please enter a valid email", "error");
      return;
    }

    setLoading(true);
    try {
      await apiRequest('/auth/request-email-otp', {
        method: 'POST',
        body: JSON.stringify({ email: newEmail }),
      });
    //   showToast("OTP sent to your new email");
      setStep(2);
    } catch (err) {
    //   showToast("Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length < 4) {
    //   showToast("Please enter the full OTP", "error");
      return;
    }

    setLoading(true);
    try {
      await apiRequest('/auth/verify-email-change', {
        method: 'POST',
        body: JSON.stringify({ email: newEmail, otp: otp }),
      });
    //   showToast("Email updated successfully");
      router.back();
    } catch (err) {
    //   showToast("Invalid OTP code", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/5">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 bg-card rounded-full">
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4 tracking-tight">Email Settings</Text>
      </View>

      <View className="flex-1 px-8 pt-10">
        <View className="items-center mb-10">
          <View className="bg-primary/10 p-5 rounded-[30px]">
            {step === 1 ? <Mail size={40} className="text-primary" /> : <ShieldCheck size={40} className="text-primary" />}
          </View>
          <Text className="text-2xl font-black text-foreground mt-4">
            {step === 1 ? 'New Email' : 'Verify OTP'}
          </Text>
          <Text className="text-muted-foreground text-center mt-2 px-4 font-medium">
            {step === 1 
              ? "We'll send a verification code to your new email address."
              : `Enter the 6-digit code sent to ${newEmail}`}
          </Text>
        </View>

        {/* --- STEP 1: EMAIL INPUT --- */}
        {step === 1 && (
          <View>
            <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-2">New Email Address</Text>
            <View className="flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-4">
              <Mail size={18} className="text-primary mr-3" />
              <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="example@gmail.com"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                className="flex-1 text-foreground font-bold"
              />
            </View>
            <TouchableOpacity 
              onPress={handleRequestOTP}
              disabled={loading}
              className={`mt-8 py-5 rounded-2xl flex-row items-center justify-center shadow-lg ${loading ? 'bg-primary/50' : 'bg-primary'}`}
            >
              <Text className="text-white font-black uppercase tracking-widest mr-2">{loading ? 'Sending...' : 'Get OTP'}</Text>
              <ArrowRight size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* --- STEP 2: OTP INPUT --- */}
        {step === 2 && (
          <View>
            <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-2">Verification Code</Text>
            <View className="flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-4">
              <ShieldCheck size={18} className="text-primary mr-3" />
              <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="000000"
                placeholderTextColor="#94a3b8"
                keyboardType="number-pad"
                maxLength={6}
                className="flex-1 text-foreground font-bold tracking-[10px] text-center text-lg"
              />
            </View>
            
            <TouchableOpacity 
              onPress={handleVerifyOTP}
              disabled={loading}
              className={`mt-8 py-5 rounded-2xl flex-row items-center justify-center shadow-lg ${loading ? 'bg-primary/50' : 'bg-primary'}`}
            >
              <Text className="text-white font-black uppercase tracking-widest">{loading ? 'Verifying...' : 'Verify & Change'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setStep(1)} 
              className="mt-6 flex-row items-center justify-center"
            >
              <RefreshCw size={14} className="text-muted-foreground mr-2" />
              <Text className="text-muted-foreground font-bold">Change Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}