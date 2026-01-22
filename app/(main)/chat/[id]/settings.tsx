import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, Bell, Lock, Database, 
  Image as ImageIcon, Trash2, Shield, CircleDot 
} from 'lucide-react-native';

export default function ChatSettings() {
  const router = useRouter();
  
  // Local States for Toggles
  const [settings, setSettings] = useState({
    notifications: true,
    readReceipts: true,
    lastSeen: false,
    autoDownload: true,
    saveToGallery: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/5">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 bg-card rounded-full">
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4">Chat Settings</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* --- SECTION: NOTIFICATIONS --- */}
        <SettingSection title="Notifications">
          <SettingItem 
            icon={Bell} 
            label="Message Notifications" 
            value={settings.notifications} 
            onToggle={() => toggle('notifications')} 
          />
        </SettingSection>

        {/* --- SECTION: PRIVACY --- */}
        <SettingSection title="Privacy & Security">
          <SettingItem 
            icon={CircleDot} 
            label="Read Receipts" 
            subLabel="If turned off, you won't send or receive Read Receipts."
            value={settings.readReceipts} 
            onToggle={() => toggle('readReceipts')} 
          />
          <SettingItem 
            icon={Shield} 
            label="End-to-End Encryption" 
            subLabel="Your messages are secured on our servers."
            isInfo
          />
        </SettingSection>

        {/* --- SECTION: DATA & STORAGE --- */}
        <SettingSection title="Data & Storage">
          <SettingItem 
            icon={Database} 
            label="Auto-Download Media" 
            value={settings.autoDownload} 
            onToggle={() => toggle('autoDownload')} 
          />
          <SettingItem 
            icon={ImageIcon} 
            label="Save to Gallery" 
            value={settings.saveToGallery} 
            onToggle={() => toggle('saveToGallery')} 
          />
          <TouchableOpacity className="flex-row items-center px-6 py-4 mt-2">
            <Trash2 size={20} color="#ef4444" />
            <Text className="ml-4 text-red-500 font-bold">Clear All Chats</Text>
          </TouchableOpacity>
        </SettingSection>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- REUSABLE COMPONENTS ---

function SettingSection({ title, children }: any) {
  return (
    <View className="mt-6">
      <Text className="px-8 text-[10px] font-black text-muted-foreground uppercase tracking-[2px] mb-2">
        {title}
      </Text>
      <View className="bg-card border-y border-border/5">{children}</View>
    </View>
  );
}

function SettingItem({ icon: Icon, label, subLabel, value, onToggle, isInfo = false }: any) {
  return (
    <View className="flex-row items-center px-6 py-4 border-b border-border/5">
      <View className="bg-primary/10 p-2.5 rounded-xl">
        <Icon size={20} className="text-primary" />
      </View>
      <View className="flex-1 ml-4 pr-4">
        <Text className="text-foreground font-bold text-[15px]">{label}</Text>
        {subLabel && <Text className="text-muted-foreground text-[11px] mt-0.5 leading-4">{subLabel}</Text>}
      </View>
      {!isInfo && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#334155', true: '#0ea5e9' }} // Adjusted for Slate-700 and Primary
          thumbColor={Platform.OS === 'ios' ? '#ffffff' : value ? '#ffffff' : '#f4f4f5'}
        />
      )}
    </View>
  );
}