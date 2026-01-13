import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Trash2, Plus, ChevronLeft, ChevronRight, Eye } from 'lucide-react-native';
import StoryDeleteAlert from '@/components/alert/StoryDelete';
import StoryExtendAlert from '@/components/alert/StoryTime';

export default function StorySettings() {
  const router = useRouter();
  const storyCount = 124;

  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Dynamic Content Map
  const modalContent: any = {
    extend: {
      title: "Extend Story",
      desc: "Select how much extra time you need.",
      options: ["12 Hours", "24 Hours", "48 Hours"],
      btnText: "Confirm Extension",
      isDestructive: false
    },
    delete: {
      title: "Delete Story",
      desc: "Are you sure? This cannot be undone.",
      options: ["Yes, Delete Now"],
      btnText: "Cancel",
      isDestructive: true
    }
  };

  const current = activeSlug ? modalContent[activeSlug] : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}


      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

      <TouchableOpacity 
          onPress={() => router.back()} 
          className="p-2 w-10 -ml-2 bg-muted/50 rounded-full"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>

        <View className="items-center mb-8">
          <View className="w-48 h-64 rounded-[32px] overflow-hidden border-4 border-primary shadow-xl">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' }} 
              className="w-full h-full"
            />
            <View className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full flex-row items-center">
              <Eye size={16} color="white" />
              <Text className="text-white ml-2 font-bold">{storyCount}</Text>
            </View>
          </View>
          <Text className="text-muted-foreground mt-4 font-medium">Active Story Preview</Text>
        </View>

        {/* 2. Stats Section */}
        <View className="bg-muted rounded-3xl p-6 flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-foreground text-2xl font-black">{storyCount}</Text>
            <Text className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Views</Text>
          </View>
          <View className="w-[1px] bg-border" />
          <View className="items-center">
            <Text className="text-foreground text-2xl font-black">18h</Text>
            <Text className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Left</Text>
          </View>
        </View>

        {/* 3. Options List */}
        <View className="space-y-3 pb-10">
          <OptionItem 
            Icon={Plus} 
            title="Add New Story" 
            desc="Post another photo or video"
            color="text-primary"
            onPress={() => console.log('Add')}
          />
          <OptionItem 
          slug="extend"
          Icon={Clock} 
          title="Extend Duration" 
          desc="Add more time to your story"
          onPress={(slug:any) => setActiveSlug(slug)} 
        />
        <OptionItem 
          slug="delete"
          Icon={Trash2} 
          title="Delete Story" 
          isDestructive 
          onPress={(slug:any) => setActiveSlug(slug)} 
        />
        </View>
      </ScrollView>

      <StoryDeleteAlert isVisible={activeSlug === 'delete'} setIsVisible={setActiveSlug} />
      <StoryExtendAlert isVisible={activeSlug === 'extend'} onClose={setActiveSlug} />

    </SafeAreaView>
  );
}

// --- UPDATED HELPER COMPONENT ---
function OptionItem({ Icon, title, desc, isDestructive, color, onPress, slug }: any) {
    return (
      <TouchableOpacity 
        onPress={() => onPress(slug)} // Passes the unique ID (slug) back
        activeOpacity={0.7}
        className="bg-card border border-border p-4 rounded-2xl flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <View className="p-3 rounded-xl bg-muted/50">
            <Icon size={22} className={isDestructive ? 'text-red-500' : (color || 'text-foreground')} />
          </View>
          <View className="ml-4">
            <Text className={`font-bold text-lg ${isDestructive ? 'text-red-500' : 'text-foreground'}`}>{title}</Text>
            <Text className="text-muted-foreground text-sm">{desc}</Text>
          </View>
        </View>
        <ChevronRight size={20} className="text-muted-foreground" />
      </TouchableOpacity>
    );
  }