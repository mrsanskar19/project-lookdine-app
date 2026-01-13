import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Plus, CheckCheck } from 'lucide-react-native';
import FeatureList from '@/components/common/FeatureList';

const CHATS = [
  { id: '1', name: 'Chef Mario', msg: 'The table is ready for you!', time: '10:45 AM', unread: 2, online: true, img: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Elena Wright', msg: 'Shared a recipe with you', time: 'Yesterday', unread: 0, online: true, img: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'SocialDine Support', msg: 'How was your experience?', time: '2 days ago', unread: 0, online: false, img: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Marco Rossi', msg: 'See you at the bistro at 8?', time: 'Monday', unread: 1, online: false, img: 'https://i.pravatar.cc/150?u=4' },
];

export default function ChatList() {
    const [filter, setFilter] = React.useState('All');
  const categories = ['All', 'Recent', 'Favorite', 'Archived'];
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-border/50">
        <Text className="text-3xl font-black text-foreground tracking-tighter">Messages</Text>
        <View className="flex-row space-x-3">
          <TouchableOpacity className="p-2 bg-muted/50 rounded-full">
            <Search size={22} className="text-foreground" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-primary rounded-full shadow-lg shadow-primary/30">
            <Plus size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* --- ONLINE STATUS BAR --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-6 pl-6">
          {CHATS.filter(c => c.online).map(user => (
            <TouchableOpacity key={user.id} className="mr-6 items-center">
              <View>
                <Image source={{ uri: user.img }} className="w-16 h-16 rounded-full border-2 border-primary" />
                <View className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              </View>
              <Text className="text-xs font-bold text-muted-foreground mt-2">{user.name.split(' ')[0]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- CHAT LIST --- */}
        <FeatureList 
        items={categories} 
        activeItem={filter} 
        onSelect={(item) => setFilter(item)} 
      />
        <View className="px-6 pb-10">
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Recent Chats</Text>
          
          {CHATS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => router.push(`/chat/${item.id}`)}
              className="flex-row items-center py-4 mb-2"
            >
              {/* Avatar */}
              <Image source={{ uri: item.img }} className="w-14 h-14 rounded-2xl" />
              
              {/* Content */}
              <View className="flex-1 ml-4 border-b border-border/10 pb-4">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-lg font-bold text-foreground">{item.name}</Text>
                  <Text className={`text-xs ${item.unread > 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {item.time}
                  </Text>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-muted-foreground text-sm flex-1 mr-4" numberOfLines={1}>
                    {item.msg}
                  </Text>
                  
                  {item.unread > 0 ? (
                    <View className="bg-primary px-2 py-0.5 rounded-full">
                      <Text className="text-white text-[10px] font-black">{item.unread}</Text>
                    </View>
                  ) : (
                    <CheckCheck size={16} className="text-primary/50" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}