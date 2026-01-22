import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, RotateCcw, X } from 'lucide-react-native';

interface ErrorViewProps {
  show: boolean;
  type?: 'fullscreen' | 'toast';
  title?: string;
  message?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export default function ErrorView({ 
  show = false,
  type = 'fullscreen',
  title = "Something went wrong", 
  message = "We couldn't load the data.", 
  onRetry,
  onClose
}: ErrorViewProps) {
  
  if (!show) return null;

  // --- TOAST MODE ---
  if (type === 'toast') {
    return (
      <View className="z-[999]">
        <View className="bg-red-50 border border-red-200 p-4 rounded-2xl flex-row items-center shadow-xl">
          <AlertTriangle size={20} color="#ef4444" className="mr-3" />
          <View className="flex-1">
            <Text className="text-red-900 font-black text-xs uppercase tracking-tight">{title}</Text>
            <Text className="text-red-800 text-xs font-medium" numberOfLines={1}>{message}</Text>
          </View>
          {onRetry && (
            <TouchableOpacity onPress={onRetry} className="bg-red-500 px-3 py-1.5 rounded-lg mr-2">
              <RotateCcw size={14} color="white" />
            </TouchableOpacity>
          )}
          {onClose && (
            <TouchableOpacity onPress={onClose}>
              <X size={18} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // --- FULLSCREEN MODE ---
  return (
    <View className="flex-1 items-center justify-center p-8 bg-background">
      <View className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle size={48} color="#ef4444" />
      </View>
      <Text className="text-2xl font-black text-foreground text-center mb-2">{title}</Text>
      <Text className="text-muted-foreground text-center font-medium mb-8">{message}</Text>
      
      {onRetry && (
        <TouchableOpacity 
          onPress={onRetry}
          className="bg-primary px-10 py-4 rounded-2xl flex-row items-center shadow-lg"
        >
          <RotateCcw size={20} color="white" className="mr-2" />
          <Text className="text-white font-black uppercase tracking-tight">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}