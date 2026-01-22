import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';
import { apiRequest } from '@/lib/services/api';

export default function ChangePassword() {
  const router = useRouter();
//   const { showToast } = useToast();
  
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const handleUpdate = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
    //   showToast("Please fill all fields", "error");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
    //   showToast("New passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await apiRequest('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword
        }),
      });
    //   showToast("Password updated successfully");
      router.back();
    } catch (err) {
    //   showToast("Incorrect old password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/5">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 bg-card rounded-full">
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4 tracking-tight">Security</Text>
      </View>

      <ScrollView className="flex-1 px-8 pt-8">
        <View className="items-center mb-8">
          <View className="bg-primary/10 p-5 rounded-[30px]">
            <ShieldCheck size={40} className="text-primary" />
          </View>
          <Text className="text-2xl font-black text-foreground mt-4">Change Password</Text>
          <Text className="text-muted-foreground text-center mt-2 px-4 font-medium">
            Your new password must be different from your previous password.
          </Text>
        </View>

        {/* --- INPUTS --- */}
        <View className="space-y-5">
          <PasswordField 
            label="Current Password"
            value={form.oldPassword}
            onChange={(val:any) => setForm({...form, oldPassword: val})}
            visible={showPass.old}
            onToggle={() => setShowPass({...showPass, old: !showPass.old})}
          />

          <PasswordField 
            label="New Password"
            value={form.newPassword}
            onChange={(val:any) => setForm({...form, newPassword: val})}
            visible={showPass.new}
            onToggle={() => setShowPass({...showPass, new: !showPass.new})}
          />

          <PasswordField 
            label="Confirm New Password"
            value={form.confirmPassword}
            onChange={(val:any) => setForm({...form, confirmPassword: val})}
            visible={showPass.confirm}
            onToggle={() => setShowPass({...showPass, confirm: !showPass.confirm})}
          />
        </View>

        {/* --- SUBMIT --- */}
        <TouchableOpacity 
          onPress={handleUpdate}
          disabled={loading}
          className={`mt-10 py-5 rounded-2xl flex-row items-center justify-center shadow-lg ${
            loading ? 'bg-primary/50' : 'bg-primary'
          }`}
        >
          <Text className="text-white font-black uppercase tracking-widest">
            {loading ? 'Updating...' : 'Update Password'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- REUSABLE COMPONENT ---
function PasswordField({ label, value, onChange, visible, onToggle }: any) {
  return (
    <View>
      <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-2">
        {label}
      </Text>
      <View className="flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-4">
        <Lock size={18} className="text-primary mr-3" />
        <TextInput
          secureTextEntry={!visible}
          value={value}
          onChangeText={onChange}
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          className="flex-1 text-foreground font-bold"
        />
        <TouchableOpacity onPress={onToggle}>
          {visible ? <EyeOff size={20} className="text-muted-foreground" /> : <Eye size={20} className="text-muted-foreground" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}