import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text,Image, SafeAreaView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { MoreVertical, X } from 'lucide-react-native';

export default function StoryView() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // useFocusEffect runs every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      let interval:any;

      // Only start timer if progress is not finished
      if (progress < 1) {
        interval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 0.01;
            if (next >= 1) {
              clearInterval(interval);
              router.back();
              return 1;
            }
            return next;
          });
        }, 50);
      }

      // CLEANUP: This runs when you leave the screen (navigate to Settings)
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [progress]) 
  );

  const isMe = true;

  return (
    <View className="flex-1 bg-black">
      {/* Background Image */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' }} 
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1">
        {/* --- CUSTOM HEADER --- */}
        <View className="px-4 pt-2">
          {/* Progress Bar Container */}
          <View className="h-1 bg-white/30 rounded-full overflow-hidden mb-4">
            <View 
              className="h-full bg-white" 
              style={{ width: `${progress * 100}%` }} 
            />
          </View>

          {/* Header Content */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image 
                source={{ uri: 'https://i.pravatar.cc/100' }} 
                className="w-10 h-10 rounded-full border border-white" 
              />
              <View className="ml-3">
                <Text className="text-white font-bold">@social_dine_chef</Text>
                <Text className="text-white/70 text-xs">2h ago</Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-4">
             {isMe && <TouchableOpacity className="p-2" onPress={() => router.push("/(main)/story/1/setting")}>
                <MoreVertical size={24} color="white" />
              </TouchableOpacity>}
              <TouchableOpacity onPress={() => router.back()} className="p-2">
                <X size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- INTERACTIVE FOOTER --- */}
        {/* <View className="mt-auto px-6 pb-10 flex-row items-center space-x-4">
          <TouchableOpacity className="flex-1 h-12 border border-white/50 rounded-full justify-center px-4">
            <Text className="text-white">Send a message...</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Heart size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Send size={28} color="white" />
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>

      {/* Tap Zones for Navigation */}
      <View className="absolute w-full h-1/2 flex-row top-20">
        <TouchableOpacity className="flex-1" onPress={() => setProgress(0)} />
        <TouchableOpacity className="flex-1" onPress={() => router.back()} />
      </View>
    </View>
  );
}