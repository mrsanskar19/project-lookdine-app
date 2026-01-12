import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { User, Settings, ShieldCheck, MapPin, Share2, Users, Utensils, Heart, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const onShare = async () => {
    await Share.share({ message: 'Join me on Social Dine to find the best local tables!' });
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" showsVerticalScrollIndicator={false}>
      {/* 1. Profile Header Section */}
      <View className="bg-white px-6 pt-16 pb-8 rounded-b-[40px] shadow-sm">
        <View className="items-center">
          <View className="relative">
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300?u=iit_cto' }} 
              className="w-28 h-28 rounded-full border-4 border-orange-50"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-4 border-white">
              <Settings size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-2xl font-bold text-slate-900 mt-4">Prof. Aryan Sharma</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#94a3b8" />
            <Text className="text-slate-400 ml-1 font-medium">New Delhi, India</Text>
          </View>
        </View>

        {/* 2. Connection & Activity Stats */}
        <View className="flex-row justify-between mt-8 px-4">
          <View className="items-center">
            <Text className="text-xl font-bold text-slate-900">1.2k</Text>
            <Text className="text-slate-400 text-xs uppercase tracking-tighter">Connections</Text>
          </View>
          <View className="w-[1px] h-10 bg-slate-100" />
          <View className="items-center">
            <Text className="text-xl font-bold text-slate-900">48</Text>
            <Text className="text-slate-400 text-xs uppercase tracking-tighter">Reviews</Text>
          </View>
          <View className="w-[1px] h-10 bg-slate-100" />
          <View className="items-center">
            <Text className="text-xl font-bold text-slate-900">15</Text>
            <Text className="text-slate-400 text-xs uppercase tracking-tighter">Badges</Text>
          </View>
        </View>

        {/* 3. Primary Action Buttons */}
        <View className="flex-row space-x-3 mt-8">
          <TouchableOpacity className="flex-1 bg-primary h-12 rounded-2xl items-center justify-center shadow-lg shadow-primary/20">
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onShare}
            className="w-12 h-12 bg-slate-100 rounded-2xl items-center justify-center"
          >
            <Share2 size={20} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Settings & Menu Sections */}
      <View className="px-6 py-8 space-y-6">
        
        {/* Connection Group */}
        <View>
          <Text className="text-slate-400 font-bold text-xs uppercase mb-3 ml-2">Community</Text>
          <View className="bg-white rounded-3xl p-2 shadow-sm">
            <MenuLink icon={<Users size={20} color="#6366f1" />} title="My Connections" count="1,240" />
            <MenuLink icon={<Heart size={20} color="#f43f5e" />} title="Favorite Dining" />
            <MenuLink icon={<Utensils size={20} color="#f59e0b" />} title="My Foodie Circles" last />
          </View>
        </View>

        {/* Security Group */}
        <View>
          <Text className="text-slate-400 font-bold text-xs uppercase mb-3 ml-2">Security & App</Text>
          <View className="bg-white rounded-3xl p-2 shadow-sm">
            <MenuLink icon={<ShieldCheck size={20} color="#10b981" />} title="Privacy Center"  />
            <MenuLink icon={<Settings size={20} color="#64748b" />} title="Push Notifications" last />
          </View>
        </View>

        <TouchableOpacity className="py-4 items-center">
          <Text className="text-red-500 font-bold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Helper Component for Links
function MenuLink({ icon, title, count, last }:{icon:any,title:any,count?:any,last?:any}) {
  return (
    <TouchableOpacity className={`flex-row items-center justify-between p-4 ${!last ? 'border-b border-slate-50' : ''}`}>
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center mr-4">
          {icon}
        </View>
        <Text className="text-slate-700 font-semibold">{title}</Text>
      </View>
      <View className="flex-row items-center">
        {count && <Text className="text-slate-400 mr-2 text-sm">{count}</Text>}
        <ChevronRight size={18} color="#cbd5e1" />
      </View>
    </TouchableOpacity>
  );
}