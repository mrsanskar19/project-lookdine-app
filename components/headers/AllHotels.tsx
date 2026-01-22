import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Building2, Search, Bell, X, ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HotelHeader() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearching(!isSearching);
    if (isSearching) setSearchText('');
  };

  return (
    <View className="h-20 px-6 flex-row items-center bg-background border-b border-border/5">
      
      {isSearching ? (
        /* --- SEARCH MODE --- */
        <View className="flex-1 flex-row items-center">
          <TouchableOpacity onPress={toggleSearch} className="pr-3">
            <ArrowLeft size={24} className="text-foreground" />
          </TouchableOpacity>
          
          <View className="flex-1 h-12 bg-card border border-border/50 rounded-2xl flex-row items-center px-4 shadow-sm">
            <Search size={18} className="text-primary" />
            <TextInput
              autoFocus
              placeholder="Search by city or landmark..."
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 ml-2 text-foreground font-bold text-sm"
              placeholderTextColor="#94a3b8"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <X size={18} className="text-muted-foreground" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        /* --- BRAND VIEW --- */
        <>
          <View className="flex-row items-center flex-1">
            <View className="bg-primary/10 p-2.5 rounded-2xl mr-3">
              <Building2 size={24} className="text-primary" />
            </View>
            <View>
              <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest">Discover</Text>
              <Text className="text-xl font-black text-foreground tracking-tighter">
                Stay<Text className="text-primary">Social</Text>
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity 
              onPress={toggleSearch}
              className="p-3 rounded-2xl bg-card border border-border/50 shadow-sm"
            >
              <Search size={20} className="text-foreground" />
            </TouchableOpacity>
            
          </View>
        </>
      )}
    </View>
  );
}