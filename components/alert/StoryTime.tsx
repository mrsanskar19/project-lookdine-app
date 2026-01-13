import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Clock, Check } from 'lucide-react-native';

export default function StoryExtendAlert({ isVisible, onClose }:{isVisible:any, onClose:any}) {
  const [selectedTime, setSelectedTime] = useState('24h');
  const options = [
    { label: '12 Hours', value: '12h' },
    { label: '24 Hours', value: '24h' },
    { label: '48 Hours', value: '48h' },
  ];

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable 
        className="flex-1 bg-black/60 justify-center items-center px-10"
        onPress={onClose}
      >
        {/* White Alert Box */}
        <View 
          className="w-full bg-white rounded-[32px] p-8 shadow-2xl"
          onStartShouldSetResponder={() => true}
        >
          {/* Icon Header */}
          <View className="items-center mb-4">
            <View className="bg-orange-50 p-4 rounded-full">
              <Clock size={32} color="#f97316" />
            </View>
          </View>

          {/* Text Content */}
          <Text className="text-2xl font-black text-slate-900 text-center">
            Extend Story
          </Text>
          <Text className="text-slate-500 text-center mt-2 mb-6">
            Choose how much longer you want your story to be visible.
          </Text>

          {/* Dynamic Options List */}
          <View className="space-y-3 mb-8">
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setSelectedTime(item.value)}
                className={`flex-row items-center justify-between p-4 rounded-2xl border-2 ${
                  selectedTime === item.value ? 'border-orange-500 bg-orange-50' : 'border-slate-100'
                }`}
              >
                <Text className={`font-bold ${selectedTime === item.value ? 'text-orange-600' : 'text-slate-600'}`}>
                  {item.label}
                </Text>
                {selectedTime === item.value && <Check size={18} color="#f97316" />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="w-full space-y-3">
            <TouchableOpacity 
              onPress={onClose}
              className="bg-orange-500 py-4 rounded-2xl items-center shadow-md shadow-orange-200"
            >
              <Text className="text-white font-bold text-lg">Confirm Extension</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onClose}
              className="py-2 items-center"
            >
              <Text className="text-slate-400 font-bold">Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}