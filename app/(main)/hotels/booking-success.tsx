import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle2, Calendar, MapPin, Share2, Home } from 'lucide-react-native';

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 items-center justify-center">
        
        {/* --- SUCCESS ANIMATION AREA --- */}
        <View className="bg-green-500/10 p-8 rounded-[40px] mb-8">
          <CheckCircle2 size={80} color="#22c55e" strokeWidth={2.5} />
        </View>

        <Text className="text-3xl font-black text-foreground text-center tracking-tighter">
          Booking Confirmed!
        </Text>
        <Text className="text-muted-foreground text-center mt-3 font-medium leading-5">
          Your table at <Text className="text-foreground font-bold">The Grand Regency</Text> is reserved. We've sent the details to your email.
        </Text>

        {/* --- QUICK INFO CARD --- */}
        <View className="w-full bg-card border border-border/50 rounded-[32px] p-6 mt-10">
          <View className="flex-row items-center mb-4">
            <Calendar size={18} className="text-primary" />
            <Text className="ml-3 text-foreground font-bold">Jan 25, 2026 • 08:30 PM</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={18} className="text-primary" />
            <Text className="ml-3 text-foreground font-bold">Table T-5 (Window View)</Text>
          </View>
        </View>

        {/* --- ACTIONS --- */}
        <View className="w-full mt-10 space-y-4">
          <TouchableOpacity 
            className="bg-primary py-5 rounded-2xl flex-row items-center justify-center shadow-lg"
            onPress={() => router.replace('/(main)/(tabs)/home')}
          >
            <Home size={18} color="white" className="mr-2" />
            <Text className="text-white font-black uppercase tracking-widest">Go to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 flex-row items-center justify-center">
            <Share2 size={18} className="text-muted-foreground mr-2" />
            <Text className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
              Share Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}