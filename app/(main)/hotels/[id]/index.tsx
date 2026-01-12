import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, MapPin, Clock, Phone, CalendarCheck, Info } from 'lucide-react-native';
import HotelHeader from '@/components/hotel/HotelHeader';
import HotelMenu from '@/components/hotel/HotelMenu';

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock Data (In a real app, fetch this using the ID)
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
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 1. Header Image with Back Button */}
        <HotelHeader hotel={hotel} />

        {/* 2. Content Section */}
        <View className="p-6 -mt-8 bg-white rounded-t-[40px]">

          {/* 1. Header Info: Rating, Price, Distance, Time */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center space-x-4">
              {/* Rating */}
              <View className="flex-row items-center bg-orange-50 px-2 py-1 rounded-lg">
                <Star size={16} color="#F97316" fill="#F97316" />
                <Text className="ml-1 font-bold text-orange-600 text-base">{hotel.rating}</Text>
              </View>

              {/* Price Range */}
              <Text className="text-slate-400 font-medium">$$ • Premium</Text>
            </View>

            {/* Distance & Time */}
            <View className="items-end">
              <View className="flex-row items-center">
                <MapPin size={14} color="#64748b" />
                <Text className="ml-1 text-slate-900 font-semibold">{hotel?.distance || '1.2'} km away</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Clock size={14} color="#64748b" />
                <Text className="ml-1 text-slate-500 text-xs">{hotel?.travelTime || '15'} mins drive</Text>
              </View>
            </View>
          </View>

          {/* 2. Action Buttons: Book Table & Call */}
          <View className="flex-row space-x-4 mb-8">
            <TouchableOpacity
              className="flex-1 bg-orange-500 h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-orange-300"
              onPress={() => alert('Booking Table...')}
            >
              <CalendarCheck size={20} color="white" />
              <Text className="ml-2 text-white font-bold text-base">Book Table</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-14 h-14 bg-slate-100 rounded-2xl items-center justify-center border border-slate-200"
              onPress={() => alert('Calling Restaurant...')}
            >
              <Phone size={20} color="#1e293b" />
            </TouchableOpacity>
          </View>

          {/* 3. Description Section */}
          <View className="border-t border-slate-100 pt-6">
            <View className="flex-row items-center mb-3">
              <Info size={18} color="#1e293b" />
              <Text className="text-lg font-bold text-slate-900 ml-2">Description</Text>
            </View>
            <Text className="text-slate-600 leading-6 text-sm italic">
              "{hotel.description || 'No description available for this venue.'}"
            </Text>
          </View>

          <HotelMenu />

        </View>
      </ScrollView>
    </View>
  );
}