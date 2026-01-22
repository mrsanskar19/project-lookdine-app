import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle, UserPlus, MapPin, Briefcase, ChevronLeft, ShieldCheck, Zap, ArrowLeft, Share2, Edit3, Users, Settings } from 'lucide-react-native';
import { useAuth } from '@/lib/contexts/UserContext';

export default function PrivateProfile() {
  const router = useRouter();
  const { user } = useAuth()

  // --- ACTIONS ---
  const handleEditProfile = () => {
    // Logic to open edit modal or navigate to edit screen
    router.push('/(settings)/edit-profile');
  };

  const showConnections = (type: 'Followers' | 'Connections') => {
    // Navigate to a list view of users
    // router.push({
      // pathname: '/profile/connection-list',
      // params: { type }
    // });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- STICKY TOP NAV --- */}
        <View className="absolute top-6 left-6 right-6 flex-row justify-between items-center z-50">
          <TouchableOpacity onPress={() => router.back()} className="bg-white p-3 rounded-full shadow-md border border-slate-100">
            <ArrowLeft size={20} color="#1e293b" />
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-background p-3 rounded-full shadow-md border border-slate-100" onPress={()=>router.push('/(settings)')}>
              <Settings size={20} color="#f97316" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-background p-3 rounded-full shadow-md border border-slate-100">
              <Share2 size={20} color="#1e293b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- BANNER --- */}
        <View className="relative">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800' }} className="w-full h-80" />
          <View className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background" />
        </View>

        <View className="px-8 -mt-16">
          <View className="flex-row justify-between items-end">
            <View className="relative">
              <Image source={{ uri: 'https://i.pravatar.cc/300?u=chef' }} className="w-32 h-32 rounded-[40px] border-8 border-background" />
              <View className="absolute bottom-2 right-2 bg-blue-500 p-1.5 rounded-full border-4 border-background">
                <ShieldCheck size={14} color="white" />
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={handleEditProfile}
              className="bg-primary px-6 py-4 rounded-2xl flex-row items-center shadow-lg shadow-primary/30"
            >
              <Edit3 size={18} color="white" />
              <Text className="text-white font-black ml-2">EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>

          {/* --- USER INFO --- */}
          <View className="mt-6">
            <Text className="text-3xl font-black text-foreground">{user?.name}, 28</Text>
            <Text className="text-primary font-bold text-lg mb-4">@{user?.username}</Text>
            <Text className="text-muted-foreground leading-6 text-[15px]">
              Executive Chef at The Grand Bistro. Passionate about fusion Italian-Indian cuisine and underground dining experiences.
            </Text>
          </View>

          {/* --- CLICKABLE STATS --- */}
          <View className="flex-row mt-8 py-6 border-y border-border/50">
            <TouchableOpacity 
              onPress={() => router.push('/(main)/connections')}
              className="flex-1 items-center"
            >
              <Text className="text-2xl font-black text-foreground">4.2k</Text>
              <Text className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Followers</Text>
            </TouchableOpacity>

            <View className="w-[1px] bg-border mx-2" />

            <TouchableOpacity 
              onPress={() => showConnections('Connections')}
              className="flex-1 items-center"
            >
              <Text className="text-2xl font-black text-foreground">892</Text>
              <View className="flex-row items-center">
                 <Users size={10} color="#94a3b8" className="mr-1" />
                 <Text className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Connections</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* --- PROFESSIONAL DETAILS --- */}
          <View className="mt-8 space-y-4 mb-10">
            <DetailItem icon={Briefcase} label="Executive Chef at Leela’s" />
            <DetailItem icon={MapPin} label="Live: Baramati, MH" isLive />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


function DetailItem({ icon: Icon, label, isLive }: any) {
  return (
    <View className="flex-row items-center">
      <View className="w-8">
        <Icon size={18} className={isLive ? 'text-green-500' : 'text-muted-foreground'} />
      </View>
      <Text className={`text-sm font-bold ${isLive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </Text>
      {isLive && <View className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
    </View>
  );
}

function StatItem({ label, value }: any) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-2xl font-black text-foreground">{value}</Text>
      <Text className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{label}</Text>
    </View>
  );
}