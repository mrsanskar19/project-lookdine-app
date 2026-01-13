import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle, UserPlus, MapPin, Briefcase, Heart, ChevronLeft, ShieldCheck, Zap, ArrowLeft, Share2 } from 'lucide-react-native';

export default function PublicProfile() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
      
      <View className="z-50 sticky">
        <View className="absolute top-6 left-6 right-6 flex-row justify-between items-center z-50">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-white p-3 rounded-full shadow-md border border-slate-100"
          >
            <ArrowLeft size={20} color="#1e293b" />
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-white p-3 rounded-full shadow-md border border-slate-100">
              <Share2 size={20} color="#1e293b" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 rounded-full shadow-md border border-slate-100">
              <Heart size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

        {/* --- VISUAL IDENTITY --- */}
        <View className="relative">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800' }} 
            className="w-full h-80"
          />
          <View className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background" />
        </View>

        <View className="px-8 -mt-16">
          <View className="flex-row justify-between items-end">
            <View className="relative">
              <Image 
                source={{ uri: 'https://i.pravatar.cc/300?u=chef' }} 
                className="w-32 h-32 rounded-[40px] border-8 border-background"
              />
              <View className="absolute bottom-2 right-2 bg-blue-500 p-1.5 rounded-full border-4 border-background">
                <ShieldCheck size={14} color="white" />
              </View>
            </View>
            
            <View className="flex-row space-x-3 pb-2">
              <TouchableOpacity 
                onPress={() => router.push('/chat/123')}
                className="p-4 bg-muted/80 rounded-2xl"
              >
                <MessageCircle size={24} className="text-foreground" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setIsFollowing(!isFollowing)}
                className={`px-8 py-4 rounded-2xl flex-row items-center ${isFollowing ? 'bg-muted' : 'bg-primary'}`}
              >
                <UserPlus size={20} color="white" />
                <Text className="text-white font-black ml-2">{isFollowing ? 'FOLLOWING' : 'FOLLOW'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- USER INFO --- */}
          <View className="mt-6">
            <View className="flex-row items-center">
              <Text className="text-3xl font-black text-foreground">Chef Marco, 28</Text>
              <View className="ml-2 bg-orange-100 px-2 py-1 rounded-lg">
                <Zap size={12} color="#f97316" fill="#f97316" />
              </View>
            </View>
            <Text className="text-primary font-bold text-lg">@marcocooks_</Text>
            
            <Text className="text-muted-foreground mt-4 leading-6 text-[15px]">
              Executive Chef at The Grand Bistro. Passionate about fusion Italian-Indian cuisine and underground dining experiences. 🇮🇹🇮🇳
            </Text>
          </View>

          {/* --- PROFESSIONAL & DETAILS --- */}
          <View className="mt-8 space-y-4">
            <DetailItem icon={Briefcase} label="Executive Chef at Leela’s" />
            <DetailItem icon={MapPin} label="Live: Baramati, MH (2.5 km away)" isLive />
          </View>

          {/* --- CONNECTIONS STATS --- */}
          <View className="flex-row mt-8 py-6 border-y border-border/50">
            <StatItem label="Followers" value="4.2k" />
            <View className="w-[1px] bg-border mx-6" />
            <StatItem label="Connections" value="892" />
          </View>

          {/* --- INTERESTS --- */}
          <View className="mt-8 mb-10">
            <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Interested In</Text>
            <View className="flex-row flex-wrap gap-3">
              {['Fine Dining', 'Pasta Art', 'Wine Pairing', 'Tech & Food'].map(tag => (
                <View key={tag} className="bg-muted/50 px-5 py-3 rounded-2xl border border-border/50">
                  <Text className="text-foreground font-bold text-sm">{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---

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