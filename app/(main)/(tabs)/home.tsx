import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Search, MapPin, SlidersHorizontal, Star, Clock, Plus, ArrowRight } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import HomeHeader from '@/components/headers/Home';
import FeatureList from '@/components/common/FeatureList';
import HotelCard from '@/components/hotel/HotelCard';

const { width } = Dimensions.get('window');

const STORIES = [
  { id: '1', name: 'Your Story', img: 'https://i.pravatar.cc/150?u=me', isMe: true },
  { id: '2', name: 'Pizza Hut', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
  { id: '3', name: 'Sushi Bar', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200' },
  { id: '4', name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: '5', name: 'Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200' },
];

const CAROUSEL_ITEMS = [
  { id: '1', title: '50% OFF at Bistro', sub: 'Limited time offer', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' },
  { id: '2', title: 'New: Vegan Delight', sub: 'Fresh & Healthy', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
];

const CATEGORIES = ['All', 'Fine Dining', 'Cafes', 'Bistros', 'Bars', 'Local'];

const RESTAURANTS = [
  {
    id: '1',
    name: 'The Golden Apron',
    category: 'Fine Dining',
    rating: 4.8,
    time: '20-30 min',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Urban Bites',
    category: 'Cafes',
    rating: 4.5,
    time: '10-15 min',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'The Golden Apron',
    category: 'Fine Dining',
    rating: 4.8,
    time: '20-30 min',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Urban Bites',
    category: 'Cafes',
    rating: 4.5,
    time: '10-15 min',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <>
    <HomeHeader/>
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
          {STORIES.map((story) => (
            <TouchableOpacity key={story.id} onPress={() => router.push("/(main)/story/1")} className="items-center mr-5">
              <View className={cn(
                "p-[3px] rounded-full border-2",
                story.isMe ? "border-slate-200" : "border-primary"
              )}>
                <Image 
                  source={{ uri: story.img }} 
                  className="w-16 h-16 rounded-full border-2 border-white" 
                />
                {story.isMe && (
                  <View className="absolute bottom-0 right-0 bg-primary rounded-full border-2 border-white p-1">
                    <Plus size={12} color="white" strokeWidth={3} />
                  </View>
                )}
              </View>
              <Text className="text-[11px] mt-1 text-slate-600 font-medium">
                {story.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      
        {/* 2. Featured Carousel */}
        <View className="pb-4 px-3">
           <ScrollView 
             horizontal 
             pagingEnabled 
             showsHorizontalScrollIndicator={false}
             snapToAlignment="center"
             decelerationRate="fast"
           >
             {CAROUSEL_ITEMS.map((item) => (
               <TouchableOpacity 
                 key={item.id} 
                 style={{ width: width - 48 }}
                 className="h-44 mx-1 rounded-3xl overflow-hidden shadow-lg"
               >
                 <Image source={{ uri: item.img }} className="absolute w-full h-full" />
                 <View className="absolute inset-0 bg-black/40 p-5 justify-between">
  {/* Top Row: Category Badge & Save Button */}
  <View className="flex-row justify-between items-start">
    <View className="bg-primary px-3 py-1.5 rounded-full shadow-sm">
      <Text className="text-white text-[10px] font-bold uppercase tracking-wider">
        Limited Offer
      </Text>
    </View>
  </View>

  {/* Bottom Row: Text & Action Button */}
  <View className="flex-row justify-between items-end">
    <View className="flex-1 mr-4">
      <Text className="text-white text-2xl font-extrabold leading-tight">
        {item.title}
      </Text>
      <Text className="text-white/80 text-sm font-medium mt-1">
        {item.sub}
      </Text>
    </View>

    <TouchableOpacity 
      activeOpacity={0.9}
      className="bg-white px-5 py-3 rounded-2xl shadow-xl flex-row items-center"
    >
      <Text className="text-primary font-bold text-sm">Claim</Text>
      <ArrowRight size={16} color="#F97316" style={{ marginLeft: 6 }} />
    </TouchableOpacity>
  </View>
</View>
               </TouchableOpacity>
             ))}
           </ScrollView>
           </View>
        

       <FeatureList items={CATEGORIES} activeItem={activeTab} onSelect={setActiveTab} />


        {/* 4. Restaurant Cards */}
        <View className="px-6 pb-20">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-2xl font-bold text-foreground">Nearby Places</Text>
            <TouchableOpacity onPress={()=>router.replace("/(main)/hotels")}>
              <Text className="text-primary font-bold">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
             horizontal 
             pagingEnabled 
             showsHorizontalScrollIndicator={false}
             snapToAlignment="center"
             decelerationRate="fast"
           >

          {RESTAURANTS.map((item) => (
           <HotelCard item={item} key={item.id}/>
          ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    </>
  );
}