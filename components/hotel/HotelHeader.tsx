import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share2, Heart, Star, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HotelHeader({ hotel }:{hotel:any}) {
  const router = useRouter();

  return (
    <View className="relative h-[450px] w-full bg-slate-900">
      {/* 1. Main Background Image */}
      <Image 
        source={{ uri: hotel.image }} 
        className="absolute inset-0 w-full h-full" 
        resizeMode="cover"
      />

      {/* 2. Pure Tailwind Black Gradient (The Scrim) */}
      {/* from-transparent to-black/90 creates the readability layer */}
      <View className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* 3. Top Navigation (Back, Share, Fav) */}
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
      {/* 4. Bottom Info Content */}
      <View className="absolute bottom-10 left-6 right-6">

        {/* Hotel Name - Large and Clear */}
        <Text className="text-3xl font-bold text-white tracking-tight">
          {hotel.name}
        </Text>
        <View className="flex-row items-center mb-2">
            <MapPin size={14} color="#e2e8f0" />
            <Text className="text-slate-200 ml-1 text-sm font-medium">{hotel.location}</Text>
          </View>

        {/* Tag Row */}
        <View className="flex-row flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map((tag:any) => (
            <View key={tag} className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
              <Text className="text-white text-[10px] font-bold uppercase">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}