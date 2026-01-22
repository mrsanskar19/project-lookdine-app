import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Search, SlidersHorizontal, Star, MapPin, Heart, ArrowLeft } from 'lucide-react-native';
import { useRouter } from "expo-router"
import SearchHeader from '@/components/headers/AllHotels';

const CATEGORIES = ["All", "Luxury", "Budget", "Boutique", "Resort"];
const FEATURED_HOTELS = [
  { id: '1', name: 'Grand Royal Villa', location: 'Paris, France', price: '$240', rating: 4.9, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  { id: '2', name: 'Ocean Breeze', location: 'Bali, Indonesia', price: '$180', rating: 4.8, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400' },
];

export default function ExploreHotels() {
  const [activeCat, setActiveCat] = useState("All");
  const [show,setShow] = useState(false)
  const router = useRouter()
  return (
    <View className="flex-1 bg-background">
      {/* --- HEADER & SEARCH --- */}
      {/* <View className="px-6 pt-4 pb-2 flex flex-row gap-2 items-center">
      <TouchableOpacity onPress={()=>router.back()}><ArrowLeft className='text-foreground font-bold'/></TouchableOpacity>
        <Text className="text-3xl font-black text-foreground tracking-tighter">Find Hotels</Text>
        <View className="flex-row items-center mt-4 space-x-3">
            {show ? 
          <View className="flex-1 flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-3">
            <Search size={20} className="text-muted-foreground" />
            <TextInput placeholder="Search hotels..." className="ml-3 flex-1 text-foreground font-bold" />
          </View>
:<TouchableOpacity onPress={()=>setShow(true)}><Search className='text-foreground font-bold'/></TouchableOpacity> }
        </View>
      </View> */}
      <SearchHeader/>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- CATEGORY FILTERS --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 px-6">
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCat(cat)}
              className={`mr-3 px-6 py-2 rounded-full border ${activeCat === cat ? 'bg-primary border-primary' : 'bg-card border-border/50'}`}
            >
              <Text className={`font-bold ${activeCat === cat ? 'text-white' : 'text-muted-foreground'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- HORIZONTAL FEATURED --- */}
        <View className="mt-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-xl font-black text-foreground">Featured</Text>
            <TouchableOpacity><Text className="text-primary font-bold">See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            {FEATURED_HOTELS.map(hotel => (
              <TouchableOpacity key={hotel.id} className="mr-6 w-72 bg-card rounded-[32px] overflow-hidden shadow-sm border border-border/10">
                <Image source={{ uri: hotel.img }} className="w-full h-48" />
                <TouchableOpacity className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-md">
                  <Heart size={18} color="white" />
                </TouchableOpacity>
                <View className="p-4">
                  <Text className="text-lg font-black text-foreground">{hotel.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={12} className="text-muted-foreground" />
                    <Text className="text-muted-foreground text-xs ml-1">{hotel.location}</Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-primary font-black text-lg">{hotel.price}<Text className="text-muted-foreground text-xs font-medium">/night</Text></Text>
                    <View className="flex-row items-center bg-primary/10 px-2 py-1 rounded-lg">
                      <Star size={12} fill="#f97316" color="#f97316" />
                      <Text className="text-primary font-bold text-xs ml-1">{hotel.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- VERTICAL ALL HOTELS --- */}
        <View className="mt-8 px-6 pb-20">
          <Text className="text-xl font-black text-foreground mb-4">Popular Nearby</Text>
          {FEATURED_HOTELS.map(hotel => (
            <TouchableOpacity key={hotel.id} className="flex-row bg-card p-3 rounded-[24px] mb-4 border border-border/10 items-center">
              <Image source={{ uri: hotel.img }} className="w-24 h-24 rounded-2xl" />
              <View className="flex-1 ml-4">
                <Text className="text-base font-black text-foreground">{hotel.name}</Text>
                <Text className="text-muted-foreground text-xs mt-1">{hotel.location}</Text>
                <View className="flex-row justify-between items-center mt-2">
                   <Text className="text-primary font-black">{hotel.price}</Text>
                   <View className="flex-row items-center">
                      <Star size={10} fill="#f97316" color="#f97316" />
                      <Text className="text-foreground text-xs font-bold ml-1">{hotel.rating}</Text>
                   </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}