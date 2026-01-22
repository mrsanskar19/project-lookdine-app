import { router } from "expo-router";
import { Star, Clock, Zap } from "lucide-react-native";
import { TouchableOpacity, Text, Image, View } from "react-native";

export default function HotelCard({ item }: { item: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/(main)/hotels/${item.id}`)}
      className="bg-card mx-2 rounded-[32px] border border-border/50 mb-6 overflow-hidden shadow-sm"
    >
      {/* 1. IMAGE WITH TOP BADGE */}
      <View className="relative">
        <Image source={{ uri: item.image }} className="w-full h-52" />
        <View className="absolute top-4 left-4 bg-background/80 blur-md px-3 py-1.5 rounded-2xl flex-row items-center">
          <Zap size={12} className="text-primary fill-primary" />
          <Text className="text-primary font-black text-[10px] ml-1 uppercase">Top Choice</Text>
        </View>
      </View>

      {/* 2. CONTENT AREA */}
      <View className="p-5 bg-card">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-xl font-black text-foreground tracking-tight" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-muted-foreground mt-1 font-medium text-xs uppercase tracking-widest">
              {item.category} • PREMIUM
            </Text>
          </View>

          {/* RATING BADGE */}
          <View className="bg-primary/10 px-3 py-1.5 rounded-2xl flex-row items-center border border-primary/20">
            <Star size={14} className="text-primary fill-primary" />
            <Text className="text-primary font-black ml-1.5 text-sm">{item.rating}</Text>
          </View>
        </View>

        {/* 3. FOOTER METADATA */}
        <View className="flex-row items-center mt-5 pt-5 border-t border-border/10">
          <View className="flex-row items-center">
            <Clock size={16} className="text-muted-foreground" />
            <Text className="text-muted-foreground ml-2 font-bold text-xs uppercase">
              {item.time || '25-30 MIN'}
            </Text>
          </View>
          
          <View className="w-1.5 h-1.5 bg-border rounded-full mx-4" />
          
          <View className="bg-muted/50 px-3 py-1 rounded-lg">
            <Text className="text-foreground font-bold text-[10px] uppercase tracking-tighter">
              Free Delivery
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}