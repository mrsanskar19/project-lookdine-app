import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Utensils, Info, Plus } from 'lucide-react-native';

const MENU_DATA = [
  { id: 'm1', name: 'Paneer Butter Masala', price: '₹320', isVeg: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
  { id: 'm2', name: 'Butter Chicken', price: '₹380', isVeg: false, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400' },
  { id: 'm3', name: 'Dal Tadka', price: '₹240', isVeg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
  { id: 'm4', name: 'Garlic Naan', price: '₹60', isVeg: true, image: 'https://images.unsplash.com/photo-1601050633647-8f8f1fb3c0f9?w=400' },
];

export default function HotelMenu() {
  return (
    <View className="mt-10 mb-6">
      {/* 1. Header Section */}
      <View className="flex-row justify-between items-center px-6 mb-5">
        <View className="flex-row items-center">
          <View className="p-2 bg-primary/10 rounded-lg">
            <Utensils size={20} className="text-primary" />
          </View>
          <Text className="text-xl font-black text-foreground ml-3 tracking-tight">Popular Menu</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-primary font-black text-xs uppercase tracking-widest">See All</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Horizontal Scroll List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
      >
        {MENU_DATA.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.9}
            className="mr-5 w-48 bg-card rounded-[32px] overflow-hidden border border-border/50 shadow-sm"
          >
            {/* Food Image Container */}
            <View className="relative">
              <Image 
                source={{ uri: item.image }} 
                className="w-full h-36" 
                resizeMode="cover" 
              />
              {/* Veg/Non-Veg Indicator (Standard Industry Icon) */}
              <View className="absolute top-3 left-3 bg-background/90 p-1 rounded-md border border-border/20">
                <View 
                  className={`w-3 h-3 rounded-full border-2 border-white ${item.isVeg ? "bg-green-500" : "bg-red-500"}`} 
                />
              </View>
            </View>

            {/* Content Details */}
            <View className="p-4">
              <Text className="text-foreground font-bold text-base mb-2" numberOfLines={1}>
                {item.name}
              </Text>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-primary font-black text-lg">{item.price}</Text>
                
                {/* Interactive Add Button */}
                <TouchableOpacity className="bg-primary p-2 rounded-xl shadow-md shadow-primary/20">
                  <Plus size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}