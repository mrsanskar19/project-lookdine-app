import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Utensils, Leaf, Info } from 'lucide-react-native';

const MENU_DATA = [
  { id: 'm1', name: 'Paneer Butter Masala', price: '₹320', isVeg: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
  { id: 'm2', name: 'Butter Chicken', price: '₹380', isVeg: false, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400' },
  { id: 'm3', name: 'Dal Tadka', price: '₹240', isVeg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
  { id: 'm4', name: 'Garlic Naan', price: '₹60', isVeg: true, image: 'https://images.unsplash.com/photo-1601050633647-8f8f1fb3c0f9?w=400' },
];

export default function HotelMenu() {
  return (
    <View className="mt-8 mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 mb-4">
        <View className="flex-row items-center">
          <Utensils size={20} color="#1e293b" />
          <Text className="text-lg font-bold text-slate-900 ml-2">Popular Menu</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-orange-500 font-bold text-sm">See Full Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll Menu */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
      >
        {MENU_DATA.map((item) => (
          <View key={item.id} className="mr-4 w-44 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
            {/* Food Image */}
            <View className="relative">
              <Image 
                source={{ uri: item.image }} 
                className="w-full h-32" 
                resizeMode="cover" 
              />
              {/* Veg/Non-Veg Indicator */}
              <View className="absolute top-2 right-2 bg-white/90 p-1 rounded-md">
                <Leaf size={12} color={item.isVeg ? "#22c55e" : "#ef4444"} />
              </View>
            </View>

            {/* Food Details */}
            <View className="p-3">
              <Text className="text-slate-900 font-bold text-sm mb-1" numberOfLines={1}>
                {item.name}
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-orange-600 font-extrabold">{item.price}</Text>
                <TouchableOpacity className="bg-slate-200 p-1 rounded-full">
                  <Info size={12} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}