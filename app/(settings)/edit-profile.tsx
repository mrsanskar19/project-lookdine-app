import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, User, AtSign, AlignLeft, Globe, MapPin } from 'lucide-react-native';
import { useAuth } from '@/lib/contexts/UserContext';

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();
//   const { showToast } = useToast();

  // Initialize state with current user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
  });

  const handleUpdate = async () => {
    try {
      // Logic for API call to update profile
    //   showToast("Profile updated successfully");
      router.back();
    } catch (err) {
    //   showToast("Failed to update profile", "error");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-border/10">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={28} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-foreground ml-2">Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={handleUpdate}>
          <Text className="text-primary font-black text-base">Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* --- AVATAR SECTION --- */}
        <View className="items-center py-8">
          <View className="relative">
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150' }} 
              className="w-32 h-32 rounded-[40px] bg-muted"
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-primary p-3 rounded-2xl border-4 border-background"
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-primary font-bold mt-4">Change Photo</Text>
        </View>

        {/* --- FORM FIELDS --- */}
        <View className="space-y-6">
          <EditField 
            label="Full Name" 
            icon={User} 
            value={formData.name} 
            onChange={(val:any) => setFormData({...formData, name: val})} 
          />
          <EditField 
            label="Username" 
            icon={AtSign} 
            value={formData.username} 
            onChange={(val:any) => setFormData({...formData, username: val})} 
          />
          <EditField 
            label="Bio" 
            icon={AlignLeft} 
            value={formData.bio} 
            multiline 
            onChange={(val:any) => setFormData({...formData, bio: val})} 
          />
          <EditField 
            label="Location" 
            icon={MapPin} 
            value={formData.location} 
            onChange={(val:any) => setFormData({...formData, location: val})} 
          />
          <EditField 
            label="Website" 
            icon={Globe} 
            value={formData.website} 
            onChange={(val:any) => setFormData({...formData, website: val})} 
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENT FOR REUSE ---
function EditField({ label, icon: Icon, value, onChange, multiline = false }: any) {
  return (
    <View className="mb-5">
      <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-2">
        {label}
      </Text>
      <View className={`flex-row items-start bg-card border border-border/50 rounded-2xl px-4 py-4 ${multiline ? 'h-24' : ''}`}>
        <Icon size={18} className="text-primary mt-0.5" />
        <TextInput
          value={value}
          onChangeText={onChange}
          multiline={multiline}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#94a3b8"
          className="flex-1 ml-3 text-foreground font-bold text-[15px] -mt-1"
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}