import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, X, ArrowLeft, Clock, TrendingUp, MapPin } from 'lucide-react-native';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  
  const suggestions = ["Italian Pasta", "Sushi near me", "Roof top bars", "Vegetarian"];
  const trending = ["SocialDine Elite", "Summer Cocktails", "Best Pizza 2026"];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 flex-row items-center border-b border-border/50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <ArrowLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        
        <View className="flex-1 h-12 bg-muted/50 rounded-2xl flex-row items-center px-4 border border-transparent focus:border-primary">
          <Search size={20} className="text-muted-foreground" />
          <TextInput
            autoFocus
            placeholder="Search restaurants, chefs..."
            value={query}
            onChangeText={setQuery}
            className="flex-1 ml-3 text-foreground text-lg"
            placeholderTextColor="#94a3b8"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6 pb-3" showsVerticalScrollIndicator={false}>
        
        
        {query.length === 0 && (
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest">Recent</Text>
              <TouchableOpacity><Text className="text-primary font-bold text-xs">Clear All</Text></TouchableOpacity>
            </View>
            {suggestions.map((item) => (
              <TouchableOpacity key={item} className="flex-row items-center py-3 border-b border-border/10">
                <Clock size={18} className="text-muted-foreground mr-4" />
                <Text className="text-foreground text-lg">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* --- SECTION: TRENDING NOW --- */}
        <View className="mb-8">
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Trending Now</Text>
          <View className="flex-row flex-wrap">
            {trending.map((item) => (
              <TouchableOpacity 
                key={item} 
                className="bg-muted/30 px-5 py-3 rounded-full mr-3 mb-3 border border-border/50 flex-row items-center"
              >
                <TrendingUp size={14} className="text-primary mr-2" />
                <Text className="text-foreground font-semibold">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- SECTION: QUICK FILTERS --- */}
        <View>
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Quick Filters</Text>
          <View className="space-y-3">
            <FilterItem icon={MapPin} title="Nearby Restaurants" desc="Within 5 miles of your location" />
            <FilterItem icon={TrendingUp} title="Top Rated" desc="Highest rated by the community" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- HELPER COMPONENTS ---
function FilterItem({ icon: Icon, title, desc }: any) {
  return (
    <TouchableOpacity className="flex-row items-center bg-card p-4 rounded-3xl border border-border/50 shadow-sm">
      <View className="bg-primary/10 p-3 rounded-2xl mr-4">
        <Icon size={20} className="text-primary" />
      </View>
      <View>
        <Text className="text-foreground font-bold text-lg">{title}</Text>
        <Text className="text-muted-foreground text-sm">{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}