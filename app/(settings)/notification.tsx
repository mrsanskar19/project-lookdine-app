import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, MessageSquare, Heart, UserPlus, BellRing, Circle } from 'lucide-react-native';

const NOTIFICATIONS = [
  { id: '1', type: 'like', user: 'Chef Mario', action: 'liked your review of Spicy Bistro', time: '2m ago', unread: true, img: 'https://i.pravatar.cc/100?u=mario' },
  { id: '2', type: 'follow', user: 'Sonia R.', action: 'started following you', time: '1h ago', unread: true, img: 'https://i.pravatar.cc/100?u=sonia' },
  { id: '3', type: 'mention', user: 'Vikram', action: 'mentioned you in a comment: "Best pasta ever!"', time: '5h ago', unread: false, img: 'https://i.pravatar.cc/100?u=vik' },
];

export default function Notifications() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Mentions', 'Follows', 'Orders'];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft size={28} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-foreground ml-2">Activity</Text>
      </View>

      {/* --- FILTER CHIPS --- */}
      <View className="py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`mr-3 px-6 py-2.5 rounded-full border ${
                filter === f ? 'bg-primary border-primary' : 'bg-muted/30 border-border/50'
              }`}
            >
              <Text className={`text-sm font-bold ${filter === f ? 'text-white' : 'text-muted-foreground'}`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- NOTIFICATION LIST --- */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            className={`flex-row items-start py-5 border-b border-border/10 ${item.unread ? 'bg-primary/5 -mx-6 px-6' : ''}`}
          >
            <View className="relative">
              <Image source={{ uri: item.img }} className="w-14 h-14 rounded-2xl" />
              <View className="absolute -bottom-1 -right-1 p-1 bg-background rounded-full border border-border/20">
                <NotificationIcon type={item.type} />
              </View>
            </View>

            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-start">
                <Text className="text-foreground leading-5 text-[15px]" numberOfLines={2}>
                  <Text className="font-black">{item.user}</Text> {item.action}
                </Text>
                {item.unread && <Circle size={8} fill="#f97316" color="#f97316" />}
              </View>
              <Text className="text-muted-foreground text-xs mt-1 font-bold">{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- HELPERS ---

function NotificationIcon({ type }: { type: string }) {
  if (type === 'like') return <Heart size={12} fill="#ef4444" color="#ef4444" />;
  if (type === 'follow') return <UserPlus size={12} color="#3b82f6" />;
  return <MessageSquare size={12} color="#10b981" />;
}