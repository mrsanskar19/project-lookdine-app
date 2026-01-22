import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, Mail, Lock, ShieldCheck, 
  Smartphone, Fingerprint, History, ChevronRight 
} from 'lucide-react-native';

export default function SecuritySettings() {
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft size={28} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-foreground ml-2">Security</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* --- LOGIN & RECOVERY --- */}
        <SecurityGroup title="Login & Recovery">
          <SecurityItem 
            icon={Mail} 
            label="Email Address" 
            value="mar**@gmail.com"
            onPress={() => router.push('/(settings)/change-email')} 
          />
          <SecurityItem 
            icon={Lock} 
            label="Change Password" 
            onPress={() => router.push('/(settings)/change-password')} 
          />
        </SecurityGroup>

        {/* --- ADVANCED PROTECTION --- */}
        <SecurityGroup title="Advanced Protection">
          <SecurityToggle 
            icon={ShieldCheck} 
            label="Two-Factor (2FA)" 
            description="Secure your account with a code"
            value={is2FAEnabled} 
            onValueChange={setIs2FAEnabled} 
          />
        </SecurityGroup>

        {/* --- DEVICE MANAGEMENT --- */}
        <SecurityGroup title="Active Sessions">
          <SecurityItem 
            icon={Smartphone} 
            label="Manage Devices" 
            value="3 Active"
            onPress={() => {}} 
          />
          <SecurityItem 
            icon={History} 
            label="Login Activity" 
            onPress={() => {}} 
          />
        </SecurityGroup>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---

function SecurityGroup({ title, children }: any) {
  return (
    <View className="mt-8 px-6">
      <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-[2px] mb-4 ml-2">
        {title}
      </Text>
      <View className="bg-card border border-border/40 rounded-[28px] overflow-hidden">
        {children}
      </View>
    </View>
  );
}

function SecurityItem({ icon: Icon, label, value, onPress }: any) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center justify-between p-5 border-b border-border/10"
    >
      <View className="flex-row items-center flex-1">
        <View className="p-2 bg-primary/10 rounded-xl mr-4">
          <Icon size={20} className="text-primary" />
        </View>
        <Text className="text-[15px] font-bold text-foreground">{label}</Text>
      </View>
      <View className="flex-row items-center">
        {value && <Text className="text-muted-foreground text-xs mr-2">{value}</Text>}
        <ChevronRight size={18} className="text-muted-foreground/40" />
      </View>
    </TouchableOpacity>
  );
}

function SecurityToggle({ icon: Icon, label, description, value, onValueChange }: any) {
  return (
    <View className="flex-row items-center justify-between p-5 border-b border-border/10">
      <View className="flex-row items-center flex-1">
        <View className="p-2 bg-primary/10 rounded-xl mr-4">
          <Icon size={20} className="text-primary" />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-foreground">{label}</Text>
          <Text className="text-[11px] text-muted-foreground font-medium">{description}</Text>
        </View>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: '#e2e8f0', true: '#f97316' }}
        thumbColor="white"
      />
    </View>
  );
}