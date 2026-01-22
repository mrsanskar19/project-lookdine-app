import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle, RefreshCcw, Headset, ArrowLeft } from 'lucide-react-native';

export default function BookingFailed() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 items-center justify-center">
        
        {/* --- ERROR ICON --- */}
        <View className="bg-red-500/10 p-8 rounded-[40px] mb-8">
          <AlertCircle size={80} color="#ef4444" strokeWidth={2.5} />
        </View>

        <Text className="text-3xl font-black text-foreground text-center tracking-tighter">
          Booking Failed
        </Text>
        <Text className="text-muted-foreground text-center mt-3 font-medium leading-5">
          Something went wrong while processing your request. Don't worry, no money was deducted.
        </Text>

        {/* --- REASON BOX --- */}
        <View className="w-full bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl p-4 mt-8">
          <Text className="text-red-600 dark:text-red-400 text-center font-bold text-xs uppercase">
            Error: Connection Timeout
          </Text>
        </View>

        {/* --- ACTIONS --- */}
        <View className="w-full mt-10 space-y-4">
          <TouchableOpacity 
            className="bg-foreground py-5 rounded-2xl flex-row items-center justify-center"
            onPress={() => router.back()}
          >
            <RefreshCcw size={18} color="white" className="mr-2" />
            <Text className="text-background font-black uppercase tracking-widest">Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="border border-border/50 py-5 rounded-2xl flex-row items-center justify-center"
            onPress={() => router.replace('/(main)/(tabs)/home')}
          >
            <ArrowLeft size={18} className="text-foreground mr-2" />
            <Text className="text-foreground font-black uppercase tracking-widest">Back to Home</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-10 flex-row items-center">
          <Headset size={16} className="text-primary mr-2" />
          <Text className="text-primary font-bold">Contact Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}