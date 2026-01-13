import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Trash2, AlertCircle } from 'lucide-react-native';

export default function StoryDeleteAlert({ isVisible, setIsVisible }:{isVisible:any, setIsVisible:any}) {
//   const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      {/* 1. Blurred Backdrop */}
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center px-10"
        onPress={() => setIsVisible(false)}
      >
        
        {/* 2. White Alert Box (Centered) */}
        <View 
          className="w-full bg-white rounded-[32px] p-8 shadow-2xl items-center"
          onStartShouldSetResponder={() => true} // Prevents click-through to backdrop
        >
          {/* Icon Header */}
          <View className="bg-red-50 p-4 rounded-full mb-4">
            <Trash2 size={32} color="#ef4444" />
          </View>

          {/* Text Content */}
          <Text className="text-2xl font-black text-slate-900 text-center">
            Story Delete
          </Text>
          <Text className="text-slate-500 text-center mt-2 mb-8 leading-5">
            Are you sure you want to remove this story? This action cannot be undone.
          </Text>

          {/* Action Buttons */}
          <View className="w-full space-y-3">
            <TouchableOpacity 
              onPress={() => setIsVisible(false)}
              className="bg-red-500 py-4 rounded-2xl items-center shadow-md shadow-red-200"
            >
              <Text className="text-white font-bold text-lg">Delete Now</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setIsVisible(false)}
              className="bg-slate-100 py-4 rounded-2xl items-center"
            >
              <Text className="text-slate-600 font-bold text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Pressable>
    </Modal>
  );
}