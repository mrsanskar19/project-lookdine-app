import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, UserPlus, ShieldCheck } from 'lucide-react-native';
import UserCard from './common/UserCard';

export default function ExploreView({ items }: { items: any[] }) {
  // Filter data for sections
  const hotels = items.filter(i => i.type === 'hotel');
  const chefs = [
    { id: 'u1', name: 'Chef Alex', role: 'Executive', img: 'https://i.pravatar.cc/150?u=a' },
    { id: 'u2', name: 'Sonia R.', role: 'Foodie', img: 'https://i.pravatar.cc/150?u=s' },
    { id: 'u3', name: 'Vikram', role: 'Critic', img: 'https://i.pravatar.cc/150?u=v' },
  ];

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      
      {/* --- SECTION 1: FEATURED HOTELS (Horizontal) --- */}
      <View className="mt-6">
        <SectionHeader title="Top Rated Hotels" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} data={hotel} />
          ))}
        </ScrollView>
      </View>

      {/* --- SECTION 2: POPULAR USERS & CHEFS (Horizontal) --- */}
      <View className="mt-10">
        <SectionHeader title="Global Community" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
          {chefs.map((user) => (
            <UserCard key={user.id} data={user} />
          ))}
        </ScrollView>
      </View>

      <View className="h-20" />
    </ScrollView>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row justify-between items-center px-6 mb-4">
      <Text className="text-lg font-black text-foreground tracking-tight">{title}</Text>
      <TouchableOpacity><Text className="text-primary font-bold text-xs">View All</Text></TouchableOpacity>
    </View>
  );
}

function HotelCard({ data }: any) {
  return (
    <TouchableOpacity className="mr-4 w-64 bg-card rounded-[32px] overflow-hidden border border-border/50 shadow-sm">
      <Image source={{ uri: data.imageUrl }} className="w-full h-36" />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-base text-foreground" numberOfLines={1}>{data.title}</Text>
          <View className="flex-row items-center">
            <Star size={12} color="#F97316" fill="#F97316" />
            <Text className="ml-1 text-xs font-bold text-orange-600">4.9</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <MapPin size={12} className="text-muted-foreground" />
          <Text className="ml-1 text-xs text-muted-foreground">Baramati, MH</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
