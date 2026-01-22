import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { UtensilsCrossed } from 'lucide-react-native';

export default function CustomSplash() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      {/* Brand Logo */}
      <View className="bg-primary/10 p-6 rounded-[40px] mb-6">
        <UtensilsCrossed size={60} className="text-primary" />
      </View>
      
      {/* Brand Name */}
      <Text className="text-4xl font-black text-foreground tracking-tighter">
        SocialDine
      </Text>
      <Text className="text-muted-foreground font-medium mt-2 tracking-widest uppercase text-[10px]">
        Eat • Connect • Explore
      </Text>

      {/* Loading Indicator at Bottom */}
      <View className="absolute bottom-20">
        <ActivityIndicator size="small" color="#f97316" />
      </View>
    </View>
  );
}