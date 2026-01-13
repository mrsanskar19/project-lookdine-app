import React, { useState } from 'react';
import { ShieldCheck, UserPlus, UserCheck } from "lucide-react-native";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { router } from 'expo-router';

export default function UserCard({ data }: any) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      className="mr-4 w-36 items-center bg-card p-5 rounded-[32px] border border-border/60 shadow-sm shadow-black/5"
      onPress={()=>router.push('/user/1')}
    >
      {/* 1. Profile Image with Verified Badge */}
      <View className="relative shadow-md rounded-full">
        <Image 
          source={{ uri: data.img }} 
          className="w-20 h-20 rounded-full" // Premium Squircle Shape
        />
        <View className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 border-4 border-card">
          <ShieldCheck size={12} color="white" />
        </View>
      </View>

      {/* 2. Text Info */}
      <View className="items-center mt-4 mb-4">
        <Text 
          className="font-black text-foreground text-base tracking-tight" 
          numberOfLines={1}
        >
          {data.name}
        </Text>
        <View className="bg-muted/50 px-2 py-0.5 rounded-md mt-1">
          <Text className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
            {data.role || 'Member'}
          </Text>
        </View>
      </View>

      {/* 3. Interactive Follow Button */}
      <TouchableOpacity 
        onPress={() => setIsFollowing(!isFollowing)}
        className={`w-full flex-row items-center justify-center py-2.5 rounded-2xl ${
          isFollowing ? 'bg-muted' : 'bg-primary'
        }`}
      >
        {isFollowing ? (
          <UserCheck size={14} color="#94a3b8" />
        ) : (
          <UserPlus size={14} color="white" />
        )}
        <Text className={`ml-2 text-[11px] font-black ${
          isFollowing ? 'text-muted-foreground' : 'text-white'
        }`}>
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}