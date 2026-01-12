import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChefHat, Search, Calendar, CreditCard, Star, ArrowRight } from 'lucide-react-native';

const STEPS = [
  { id: 1, title: "Welcome", desc: "Discover hidden gems.", icon: ChefHat, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500" },
  { id: 2, title: "Discovery", desc: "Find tables instantly.", icon: Search, img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500" },
  { id: 3, title: "Booking", desc: "Two taps to reserve.", icon: Calendar, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" },
  { id: 4, title: "Payment", desc: "Safe & Split billing.", icon: CreditCard, img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500" },
  { id: 5, title: "Join Us", desc: "Start your journey.", icon: Star, img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" }
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const isLast = index === STEPS.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 py-6 justify-between">
        
        {/* Header: Progress & Skip */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row space-x-1 flex-1 mr-10">
            {STEPS.map((_, i) => (
              <View key={i} className={`h-1.5 flex-1 rounded-full ${i <= index ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </View>
          <TouchableOpacity onPress={() => setIndex(4)}>
            <Text className="text-muted-foreground font-bold">SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Center Content: Animated Image & Text */}
        <View className="items-center">
          <Image source={{ uri: STEPS[index].img }} className="w-full h-72 rounded-[40px] mb-8 shadow-2xl" />
          
          <View className="bg-primary/10 p-5 rounded-3xl mb-6">
            <Text className="text-primary text-3xl">✦</Text>
          </View>
          
          <Text className="text-4xl font-black text-foreground text-center tracking-tight">
            {STEPS[index].title}
          </Text>
          <Text className="text-muted-foreground text-center mt-4 text-xl px-2 leading-7">
            {STEPS[index].desc}
          </Text>
        </View>

        {/* Footer Navigation */}
        <View className="mb-4">
          {!isLast ? (
            <View className="flex-row justify-between items-center bg-muted/30 p-2 rounded-3xl">
              <TouchableOpacity 
                onPress={() => index > 0 && setIndex(index - 1)}
                className={`p-5 ${index === 0 ? 'opacity-0' : 'opacity-100'}`}
              >
                <Text className="text-foreground font-bold text-lg">Back</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setIndex(index + 1)}
                className="bg-primary px-10 py-5 rounded-2xl flex-row items-center shadow-md"
              >
                <Text className="text-white font-bold text-lg mr-2">Next</Text>
                <ArrowRight size={20} className="text-white" />
              </TouchableOpacity>
            </View>
          ) : (
            /* Step 5: Final CTA Block */
            <View className="space-y-4">
              <TouchableOpacity 
                onPress={() => router.push('/(auth)/register')}
                className="bg-primary w-full py-6 rounded-2xl items-center shadow-xl shadow-primary/40"
              >
                <Text className="text-white font-black text-xl">Create Account</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => router.push('/(auth)/login')}
                className="w-full py-5 items-center border-2 border-border rounded-2xl"
              >
                <Text className="text-foreground font-bold text-lg">Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}