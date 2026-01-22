import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, UserPlus, MapPin, CheckCircle, Flame, Filter } from 'lucide-react-native';
import UserHeader from '@/components/headers/AllUser';

const INTERESTS = ["Foodies", "Gamers", "Techies", "Travelers", "Artists"];

export default function FindUsers() {
  const [activeInterest, setActiveInterest] = useState("Foodies");

  return (
    <View className="flex-1 bg-background">
      {/* --- HEADER --- */}
     <UserHeader/>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* --- TOP: ACTIVE NOW (STORY STYLE) --- */}
        <View className="mt-6">
          <Text className="px-6 text-sm font-black text-muted-foreground uppercase tracking-widest mb-4">Active Near You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TouchableOpacity key={i} className="mr-5 items-center">
                <View className="p-1 rounded-[22px] border-2 border-primary">
                  <Image 
                    source={{ uri: `https://i.pravatar.cc/150?u=${i}` }} 
                    className="w-16 h-16 rounded-[18px]" 
                  />
                  <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                </View>
                <Text className="text-foreground text-[10px] font-bold mt-2">User_{i}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- INTEREST CHIPS --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-8 px-6">
          {INTERESTS.map(item => (
            <TouchableOpacity 
              key={item}
              onPress={() => setActiveInterest(item)}
              className={`mr-2 px-6 py-2.5 rounded-2xl ${activeInterest === item ? 'bg-primary' : 'bg-card'}`}
            >
              <Text className={`font-black text-xs ${activeInterest === item ? 'text-white' : 'text-muted-foreground'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- INTERACTIVE USER CARDS --- */}
        <View className="mt-8 px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-black text-foreground">Suggested for You</Text>
            <Flame size={20} color="#f97316" />
          </View>

          {/* User Row Item */}
          <UserCard name="Sanskar" username="mrsanskar" bio="IIT Professor & CTO. Building the future." />
          <UserCard name="Aarav Sharma" username="aarav_ai" bio="Exploring the intersection of AI and Dining." />
          <UserCard name="Priya Singh" username="priya_codes" bio="Fullstack Developer | Travel Enthusiast" />
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}

// --- SUB-COMPONENT: USER CARD ---
function UserCard({ name, username, bio }: any) {
  const [followed, setFollowed] = useState(false);

  return (
    <TouchableOpacity className="bg-card p-4 rounded-[32px] border border-border/10 mb-4 flex-row items-center shadow-sm">
      <Image 
        source={{ uri: `https://i.pravatar.cc/150?u=${username}` }} 
        className="w-16 h-16 rounded-[22px]" 
      />
      <View className="flex-1 ml-4">
        <View className="flex-row items-center">
          <Text className="text-base font-black text-foreground">{name}</Text>
          <CheckCircle size={14} color="#3b82f6" fill="#3b82f633" className="ml-1" />
        </View>
        <Text className="text-muted-foreground text-xs font-medium">@{username}</Text>
        <Text className="text-muted-foreground text-[11px] mt-1 leading-4" numberOfLines={1}>{bio}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => setFollowed(!followed)}
        className={`px-5 py-2.5 rounded-xl ${followed ? 'bg-muted' : 'bg-primary'}`}
      >
        <Text className={`font-black text-xs ${followed ? 'text-muted-foreground' : 'text-white'}`}>
          {followed ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}