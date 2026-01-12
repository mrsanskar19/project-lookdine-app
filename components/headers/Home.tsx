import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChefHat, Search, Bell, X, ArrowLeft } from 'lucide-react-native';

export default function HomeHeader() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
      <View className="h-16 px-4 flex-row items-center bg-background text-foreground justify-between">
        
        {isSearching ? (
          /* --- ACTIVE SEARCH VIEW --- */
          <View className="flex-1 flex-row items-center animate-in fade-in duration-300">
            <TouchableOpacity onPress={() => setIsSearching(false)} className="pr-3">
              <ArrowLeft size={24} className="text-foreground" />
            </TouchableOpacity>
            
            <View className="flex-1 h-10 bg-muted rounded-full flex-row items-center px-4">
              <Search size={18} className="text-muted-foreground" />
              <TextInput
                autoFocus
                placeholder="Search restaurants..."
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 ml-2 text-foreground text-base"
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
          /* --- STANDARD BRAND VIEW --- */
          <>
            <View className="flex-row items-center">
              <View className="bg-primary/10 p-2 rounded-xl mr-3">
                <ChefHat size={24} className="text-primary" />
              </View>
              <Text className="text-xl font-black text-foreground tracking-tighter">
                Social<Text className="text-primary">Dine</Text>
              </Text>
            </View>

            <View className="flex-row items-center space-x-4">
              <TouchableOpacity 
                onPress={() => setIsSearching(true)}
                className="p-2 rounded-full bg-muted/50"
              >
                <Search size={22} className="text-foreground" />
              </TouchableOpacity>
              
              <TouchableOpacity className="p-2 rounded-full bg-muted/50">
                <View className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full z-10 border-2 border-background" />
                <Bell size={22} className="text-foreground" />
              </TouchableOpacity>
            </View>
          </>
        )}

      </View>
  );
}