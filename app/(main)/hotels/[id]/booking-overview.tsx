import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, MapPin, Sparkles, Utensils, CreditCard, ShieldCheck } from 'lucide-react-native';
// import { useToast } from '@/lib/contexts/toast-context';

export default function BookingOverview() {
  const router = useRouter();
//   const { showToast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);

  // Mock data representing the flow results
  const bookingSummary = {
    hotelName: "The Grand Regency",
    date: "Jan 25, 2026",
    time: "08:30 PM",
    table: "T-5 (Window Side)",
    package: "Romantic Decor",
    menuItems: ["Paneer Tikka", "Butter Chicken"],
    total: "₹4,250"
  };

  const handleFinalConfirm = async () => {
    setIsConfirming(true);
    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      // router.replace('/(main)/hotels/booking-success'); 
      router.replace('/(main)/hotels/booking-failed'); 
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 py-4 flex-row items-center border-b border-border/5">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-card rounded-full">
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4">Confirm Booking</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* 1. MAIN HOTEL CARD */}
        <View className="bg-primary p-6 rounded-[32px] mb-6 shadow-lg shadow-primary/20">
          <Text className="text-white/70 font-bold uppercase text-[10px] tracking-widest">Reserving at</Text>
          <Text className="text-white text-2xl font-black mt-1">{bookingSummary.hotelName}</Text>
          <View className="flex-row items-center mt-4 bg-white/10 self-start px-3 py-1.5 rounded-full">
            <Calendar size={14} color="white" />
            <Text className="text-white text-xs font-bold ml-2">{bookingSummary.date} at {bookingSummary.time}</Text>
          </View>
        </View>

        {/* 2. SPACE & AMBIANCE SUMMARY */}
        <SectionTitle title="Space & Ambiance" />
        <View className="bg-card border border-border/50 rounded-3xl p-5 mb-6">
          <SummaryRow icon={MapPin} label="Table" value={bookingSummary.table} />
          <View className="h-[1px] bg-border/10 my-4" />
          <SummaryRow icon={Sparkles} label="Package" value={bookingSummary.package} color="text-primary" />
        </View>

        {/* 3. MENU PRE-ORDER (IF SELECTED) */}
        <SectionTitle title="Pre-ordered Menu" />
        <View className="bg-card border border-border/50 rounded-3xl p-5 mb-6">
          {bookingSummary.menuItems.map((item, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <Utensils size={14} className="text-muted-foreground" />
              <Text className="text-foreground font-bold ml-3 flex-1">{item}</Text>
              <Text className="text-muted-foreground text-xs">x 1</Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => router.back()} className="mt-2">
            <Text className="text-primary font-black text-xs">+ Add more items</Text>
          </TouchableOpacity>
        </View>

        {/* 4. PAYMENT SUMMARY */}
        <SectionTitle title="Payment Details" />
        <View className="bg-card border border-border/50 rounded-3xl p-5 mb-10">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <CreditCard size={18} className="text-muted-foreground" />
              <Text className="text-foreground font-bold ml-3">Pay at Hotel</Text>
            </View>
            <Text className="text-2xl font-black text-foreground">{bookingSummary.total}</Text>
          </View>
          <View className="flex-row items-center mt-4 bg-green-500/5 p-3 rounded-2xl">
            <ShieldCheck size={16} color="#22c55e" />
            <Text className="text-green-600 text-[11px] font-bold ml-2">Secure booking with SocialDine Guarantee</Text>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* --- CONFIRM BUTTON --- */}
      <View className="p-6 bg-background border-t border-border/10">
        <TouchableOpacity 
          onPress={handleFinalConfirm}
          disabled={isConfirming}
          className={`py-5 rounded-2xl flex-row items-center justify-center shadow-lg ${isConfirming ? 'bg-primary/50' : 'bg-primary'}`}
        >
          <Text className="text-white font-black uppercase tracking-widest mr-2">
            {isConfirming ? 'Confirming...' : 'Place Reservation'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- HELPERS ---
function SectionTitle({ title }: { title: string }) {
  return (
    <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-3">
      {title}
    </Text>
  );
}

function SummaryRow({ icon: Icon, label, value, color = "text-foreground" }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="bg-muted p-2 rounded-xl">
          <Icon size={16} className="text-muted-foreground" />
        </View>
        <Text className="text-muted-foreground font-bold ml-3">{label}</Text>
      </View>
      <Text className={`font-black ${color}`}>{value}</Text>
    </View>
  );
}