import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, Bell, Lock, Eye, Moon, Languages, 
  HelpCircle, LogOut, ChevronRight, ShieldCheck, 
  ArrowLeft
} from 'lucide-react-native';
import ThemeToggle from '@/components/ThemeToggle';

export default function SettingsScreen() {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="px-6 py-6 border-b border-border/50 flex flex-row gap-2 items-center">
      <TouchableOpacity onPress={()=>router.back()}><ArrowLeft className='text-foreground font-bold'/></TouchableOpacity>
        <Text className="text-3xl font-black text-foreground tracking-tighter">Settings</Text>
      </View>
        {/* --- ACCOUNT SECTION --- */}
        <SettingsGroup title="Account Settings">
          <SettingsItem 
            icon={User} 
            label="Edit Profile" 
            // onPress={() => router.push('/profile/edit')} 
          />
          <SettingsItem 
            icon={Bell} 
            label="Notifications" 
            badge="New"
            onPress={() => router.push('/notification')} 
          />
          <SettingsItem 
            icon={Lock} 
            label="Security & Password" 
            onPress={() => router.push('/security')} 
          />
        </SettingsGroup>

        {/* --- PREFERENCES SECTION --- */}
        <SettingsGroup title="Preferences">
          {/* <SettingsToggle 
            icon={Moon} 
            label="Dark Mode" 
            value={isDarkMode} 
            onValueChange={setIsDarkMode} 
          /> */}
          <ThemeToggle/>
          <SettingsToggle 
            icon={Eye} 
            label="Private Account" 
            value={isPrivate} 
            onValueChange={setIsPrivate} 
          />
          <SettingsItem 
            icon={Languages} 
            label="Language" 
            value="English (US)"
            onPress={() => {}} 
          />
        </SettingsGroup>

        {/* --- SUPPORT & LEGAL --- */}
        <SettingsGroup title="Support">
          <SettingsItem icon={HelpCircle} label="Help Center" onPress={() => {}} />
          <SettingsItem icon={ShieldCheck} label="Privacy Policy" onPress={() => {}} />
        </SettingsGroup>

        {/* --- DANGER ZONE --- */}
        <View className="px-6 mt-10 mb-20">
          <TouchableOpacity 
            className="flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100"
            onPress={() => router.replace('/login')}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-black">LOG OUT</Text>
          </TouchableOpacity>
          <Text className="text-center text-muted-foreground text-[10px] mt-4 font-bold tracking-widest uppercase">
            SocialDine v2.0.4
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---

function SettingsGroup({ title, children }: any) {
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

function SettingsItem({ icon: Icon, label, onPress, value, badge }: any) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center justify-between p-5 border-b border-border/10"
    >
      <View className="flex-row items-center">
        <View className="p-2 bg-muted/50 rounded-xl mr-4">
          <Icon size={20} className="text-foreground" />
        </View>
        <Text className="text-[15px] font-bold text-foreground">{label}</Text>
      </View>
      <View className="flex-row items-center">
        {badge && (
          <View className="bg-primary px-2 py-0.5 rounded-full mr-2">
            <Text className="text-[9px] text-white font-black">{badge}</Text>
          </View>
        )}
        {value && <Text className="text-muted-foreground text-xs mr-2">{value}</Text>}
        <ChevronRight size={18} className="text-muted-foreground/40" />
      </View>
    </TouchableOpacity>
  );
}

function SettingsToggle({ icon: Icon, label, value, onValueChange }: any) {
  return (
    <View className="flex-row items-center justify-between p-5 border-b border-border/10">
      <View className="flex-row items-center">
        <View className="p-2 bg-muted/50 rounded-xl mr-4">
          <Icon size={20} className="text-foreground" />
        </View>
        <Text className="text-[15px] font-bold text-foreground">{label}</Text>
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