import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, Check, UserPlus } from 'lucide-react-native';

const MOCK_DATA = [
  { id: '1', name: 'Aarav Mehta', username: 'aarav_codes', img: 'https://i.pravatar.cc/150?u=1', isFollowing: true },
  { id: '2', name: 'Ishani Rai', username: 'ishani_art', img: 'https://i.pravatar.cc/150?u=2', isFollowing: false },
  { id: '3', name: 'Rohan Das', username: 'rohan_dine', img: 'https://i.pravatar.cc/150?u=3', isFollowing: true },
  { id: '4', name: 'Sanya Gupta', username: 'sanya_travels', img: 'https://i.pravatar.cc/150?u=4', isFollowing: false },
];

export default function Connections() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Followers' | 'Following'>('Following');
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/5">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4">mrsanskar</Text>
      </View>

      {/* --- TAB SELECTOR --- */}
      <View className="flex-row border-b border-border/10">
        <TabButton title="120 Followers" active={activeTab === 'Followers'} onPress={() => setActiveTab('Followers')} />
        <TabButton title="85 Following" active={activeTab === 'Following'} onPress={() => setActiveTab('Following')} />
      </View>

      {/* --- SEARCH BAR --- */}
      <View className="px-6 py-4">
        <View className="flex-row items-center bg-card rounded-xl px-4 py-2 border border-border/50">
          <Search size={18} className="text-muted-foreground" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-3 text-foreground font-bold"
          />
        </View>
      </View>

      {/* --- LIST --- */}
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConnectionRow item={item} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---

function TabButton({ title, active, onPress }: any) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`flex-1 py-4 items-center border-b-2 ${active ? 'border-primary' : 'border-transparent'}`}
    >
      <Text className={`font-black ${active ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</Text>
    </TouchableOpacity>
  );
}

function ConnectionRow({ item }: { item: any }) {
  const [isFollowing, setIsFollowing] = useState(item.isFollowing);

  return (
    <View className="flex-row items-center mb-6">
      <Image source={{ uri: item.img }} className="w-14 h-14 rounded-full bg-muted" />
      <View className="flex-1 ml-4">
        <Text className="text-[15px] font-black text-foreground">{item.username}</Text>
        <Text className="text-xs text-muted-foreground font-medium">{item.name}</Text>
      </View>

      <TouchableOpacity 
        onPress={() => setIsFollowing(!isFollowing)}
        className={`px-5 py-2 rounded-xl border ${
          isFollowing ? 'bg-background border-border/50' : 'bg-primary border-primary'
        }`}
      >
        <View className="flex-row items-center">
          {isFollowing ? (
            <Text className="text-foreground font-black text-xs">Following</Text>
          ) : (
            <>
              <UserPlus size={14} color="white" className="mr-1" />
              <Text className="text-white font-black text-xs">Follow</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}