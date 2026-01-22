import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { Map as MapIcon, Grid, Star, MapPin, ChevronRight } from 'lucide-react-native';
import MapLibreView from '@/components/MapLibreView';
import ExploreView from '@/components/Explore';

const CHECKPOINTS = [
  {
    id: '1',
    title: 'IIT Grand Hotel',
    type: 'hotel',
    description: 'Luxury stay near campus',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    coords: { latitude: 28.5451, longitude: 77.1926 }
  },
  {
    id: '2',
    title: 'Spicy Bistro',
    type: 'restaurant',
    description: 'Best Italian Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
    coords: { latitude: 18.1564395, longitude: 74.5707753 }
  },
    {
      id: 'h1',
      title: 'Hotel City Inn',
      type: 'hotel',
      description: '3.5-star premium stay in central Baramati',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
      coords: { latitude: 18.1565, longitude: 74.5775 }
    },
    {
      id: 'h2',
      title: 'Baramati Club',
      type: 'hotel',
      description: 'Luxury resort with pool & sports facilities',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300',
      coords: { latitude: 18.1620, longitude: 74.5820 }
    },
    {
      id: 'r1',
      title: 'Leela\'s Restaurant',
      type: 'restaurant',
      description: 'Famous for pure veg North Indian & Thalis',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
      coords: { latitude: 18.1510, longitude: 74.5740 }
    },
    {
      id: 'r2',
      title: 'Uniq Bucket Biryani',
      type: 'restaurant',
      description: 'Local favorite for authentic spicy biryani',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300',
      coords: { latitude: 18.1685, longitude: 74.5910 }
    }
];

export default function NearbyScreen() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'explore'>('explore');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation([userLocation.coords.longitude, userLocation.coords.latitude]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-border/50">
        <Text className="text-2xl font-black text-foreground capitalize">{viewMode}</Text>
        
        {/* --- TOGGLE TABS --- */}
        <View className="flex-row bg-muted/50 p-1 rounded-2xl">
          <TabButton 
            active={viewMode === 'explore'} 
            onPress={() => setViewMode('explore')} 
            label="Explore" 
            Icon={Grid} 
          />
          <TabButton 
            active={viewMode === 'map'} 
            onPress={() => setViewMode('map')} 
            label="Map" 
            Icon={MapIcon} 
          />
        </View>
      </View>

      <View className="flex-1">
        {!location ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#F97316" />
            <Text className="mt-4 text-slate-500 font-medium">{errorMsg || "Locating..."}</Text>
          </View>
        ) : viewMode === 'map' ? (
          <MapLibreView checkpoints={CHECKPOINTS} current={location} />
        ) : (
          <ExploreView items={CHECKPOINTS}/>
        )}
      </View>
    </SafeAreaView>
  );
}


function TabButton({ active, onPress, label, Icon }: any) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center px-4 py-2 rounded-xl ${active ? 'bg-white/30 shadow-sm' : ''}`}
    >
      <Icon size={16} color={active ? '#F97316' : '#94a3b8'} />
      <Text className={`ml-2 font-bold text-xs ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}