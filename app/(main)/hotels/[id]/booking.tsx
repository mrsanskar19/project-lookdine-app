import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, Sparkles, ArrowRight, ChevronLeft, Info } from 'lucide-react-native';

const TABLES = [
  { id: 'T1', pos: 'Corner', desc: 'Private & Quiet, perfect for dates' },
  { id: 'T5', pos: 'Window', desc: 'City view, high-top seating' },
  { id: 'T8', pos: 'Center', desc: 'Main hall, lively atmosphere' },
  { id: 'P2', pos: 'Poolside', desc: 'Outdoor breezy seating' },
];

const SLOTS = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export default function BookSpace() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState('T1');
  const [selectedTime, setSelectedTime] = useState("20:00");
  const [selectedDecor, setSelectedDecor] = useState(null);

  return (
    <View className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-6 pt-6 flex-row items-center border-b border-border/5 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-card rounded-full">
          <ChevronLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-foreground ml-4">Reserve Space</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* --- 1. TIME SELECTION --- */}
        <SectionHeader title="Select Arrival Time" icon={Clock} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {SLOTS.map(slot => (
            <TouchableOpacity 
              key={slot}
              onPress={() => setSelectedTime(slot)}
              className={`mr-3 px-6 py-3 rounded-2xl border ${selectedTime === slot ? 'bg-primary border-primary' : 'bg-card border-border/50'}`}
            >
              <Text className={`font-black ${selectedTime === slot ? 'text-white' : 'text-foreground'}`}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- 2. TABLE POSITION & DESCRIPTION --- */}
        <SectionHeader title="Choose Your Table" icon={MapPin} />
        {TABLES.map(table => (
          <TouchableOpacity 
            key={table.id}
            onPress={() => setSelectedTable(table.id)}
            className={`p-4 rounded-[24px] mb-4 border flex-row items-center ${selectedTable === table.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-card border-border/10'}`}
          >
            <View className={`w-12 h-12 rounded-2xl items-center justify-center ${selectedTable === table.id ? 'bg-primary' : 'bg-muted'}`}>
              <Text className={`font-black ${selectedTable === table.id ? 'text-white' : 'text-muted-foreground'}`}>{table.id}</Text>
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-base font-black text-foreground">{table.pos} Position</Text>
              <Text className="text-muted-foreground text-xs font-medium">{table.desc}</Text>
            </View>
            {selectedTable === table.id && <Info size={16} className="text-primary" />}
          </TouchableOpacity>
        ))}

        {/* --- 3. OPTIONAL DECORATION --- */}
        <SectionHeader title="Ambiance Package" icon={Sparkles} />
        <View className="flex-row space-x-4 mb-10">
           <DecorCard name="Romantic" price="₹1500" id="D1" selected={selectedDecor} onSelect={setSelectedDecor} />
           <DecorCard name="Birthday" price="₹1200" id="D2" selected={selectedDecor} onSelect={setSelectedDecor} />
        </View>
      </ScrollView>

      {/* --- FOOTER --- */}
      <View className="p-6 bg-card border-t border-border/10">
        <TouchableOpacity 
          onPress={() => router.push('/(main)/hotels/1/menu')}
          className="bg-primary py-5 rounded-2xl flex-row items-center justify-center"
        >
          <Text className="text-white font-black uppercase tracking-widest mr-2">Continue</Text>
          <ArrowRight size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const SectionHeader = ({ title, icon: Icon }: any) => (
    <View className="flex-row items-center mb-4 mt-2">
      <Icon size={14} className="text-primary" />
      <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2">{title}</Text>
    </View>
  );
  
  const DecorCard = ({ name, price, id, selected, onSelect }: any) => (
    <TouchableOpacity 
      onPress={() => onSelect(id === selected ? null : id)}
      className={`flex-1 p-4 rounded-[28px] border items-center ${selected === id ? 'bg-primary border-primary' : 'bg-card border-border/10'}`}
    >
      <Text className={`font-black ${selected === id ? 'text-white' : 'text-foreground'}`}>{name}</Text>
      <Text className={`text-[10px] font-bold ${selected === id ? 'text-white/80' : 'text-primary'}`}>{price}</Text>
    </TouchableOpacity>
  );