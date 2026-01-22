import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Users, Search, UserPlus, X, ArrowLeft, Filter, Home, ChevronLeft } from 'lucide-react-native';
import BackTo from '../common/BackTo';
import { useRouter } from 'expo-router';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function UserHeader() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  

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
              placeholder="Search name, @username or bio..."
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
    {/* NEW HOME BUTTON */}
    {/* <BackTo/> */}
    
    <TouchableOpacity 
      onPress={() => router.back()}
      className="p-3 bg-card rounded-2xl border border-border/50 shadow-sm flex-row items-center"
    >
      <ChevronLeft size={20} className="text-primary" />
    </TouchableOpacity>
    <View>
      <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest">Community</Text>
      <Text className="text-xl font-black text-foreground tracking-tighter">
        Social<Text className="text-primary">Connect</Text>
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
            
            <TouchableOpacity className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <UserPlus size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}