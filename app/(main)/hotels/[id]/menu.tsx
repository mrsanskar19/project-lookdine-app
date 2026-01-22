import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";

export default function BookMenuOptional() {
    const [cart, setCart] = useState({});
  
    return (
      <View className="flex-1 bg-background">
        <View className="px-6 pt-6 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2 bg-card rounded-full">
            <ChevronLeft size={24} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-foreground">Pre-order Menu</Text>
          {/* SKIP ACTION */}
          <TouchableOpacity onPress={() => router.replace('/(main)/hotels/1/booking-overview')}>
            <Text className="text-muted-foreground font-bold">Skip</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="bg-primary/10 p-4 rounded-2xl mb-6">
            <Text className="text-primary font-bold text-xs text-center">
              Save 10% on pre-orders! (Optional)
            </Text>
          </View>
          
          {/* Menu items here (same as previous Menu code) */}
        </ScrollView>
  
        <View className="p-6 bg-card border-t border-border/10">
          <TouchableOpacity 
            onPress={() => router.replace('/(main)/hotels/1/booking-overview')}
            className="bg-primary py-5 rounded-2xl items-center justify-center"
          >
            <Text className="text-white font-black uppercase tracking-widest">
              {Object.keys(cart).length > 0 ? "Order & Confirm" : "Confirm Booking"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // --- HELPER COMPONENTS ---
  