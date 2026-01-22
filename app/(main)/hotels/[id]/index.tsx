import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, MapPin, Clock, Phone, CalendarCheck, Info } from 'lucide-react-native';
import HotelHeader from '@/components/hotel/HotelHeader';
import HotelMenu from '@/components/hotel/HotelMenu';

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const hotel = {
    name: 'IIT Grand Hotel',
    location: 'Baramati MIDC, Maharashtra',
    price: '₹4,500',
    rating: '4.8',
    distance: 12,
    travelTime: "2.5",
    reviews: '1,240',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: 'Experience luxury at the heart of Baramati. Featuring premium suites, an infinity pool, and world-class North Indian cuisine.',
    amenities: ['Free WiFi', 'Pool', 'Gym', 'AC', 'Parking']
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 1. Header Component */}
        <HotelHeader hotel={hotel} />

        {/* 2. Content Section */}
        <View className="p-6 -mt-10 bg-background rounded-t-[44px] shadow-2xl">

          {/* Header Stats: Rating, Price, Distance */}
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center space-x-4">
              {/* Rating Badge */}
              <View className="flex-row items-center bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                <Star size={16} className="text-primary fill-primary" />
                <Text className="ml-1.5 font-black text-primary text-base">{hotel.rating}</Text>
              </View>

              <Text className="text-muted-foreground font-bold text-sm tracking-tight">$$ • PREMIUM</Text>
            </View>

            <View className="items-end">
              <View className="flex-row items-center">
                <MapPin size={14} className="text-muted-foreground" />
                <Text className="ml-1 text-foreground font-black text-sm">{hotel?.distance} km</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Clock size={14} className="text-muted-foreground" />
                <Text className="ml-1 text-muted-foreground text-[10px] font-bold uppercase tracking-tighter">
                   {hotel?.travelTime} mins away
                </Text>
              </View>
            </View>
          </View>

          {/* Main Actions */}
          <View className="flex-row space-x-4 mb-10">
            <TouchableOpacity
              className="flex-1 bg-primary h-16 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/30"
              activeOpacity={0.8}
              onPress={()=>router.push("/(main)/hotels/1/booking")}
            >
              <CalendarCheck size={20} color="white" />
              <Text className="ml-2 text-white font-black text-lg">Book Table</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 bg-muted/30 rounded-[24px] items-center justify-center border border-border/50"
              activeOpacity={0.7}
            >
              <Phone size={22} className="text-foreground" />
            </TouchableOpacity>
          </View>

          {/* Information Section */}
          <View className="border-t border-border/30 pt-8 mb-6">
            <View className="flex-row items-center mb-4">
              <View className="p-2 bg-primary/10 rounded-lg">
                <Info size={18} className="text-primary" />
              </View>
              <Text className="text-xl font-black text-foreground ml-3">Description</Text>
            </View>
            <Text className="text-muted-foreground leading-7 text-[15px] font-medium italic">
              "{hotel.description}"
            </Text>
          </View>

          <HotelMenu />

          {/* Spacer for Bottom Tabs */}
          <View className="h-20" />
        </View>
      </ScrollView>
    </View>
  );
}