import React from 'react';
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface FeatureListProps {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
  variant?: 'primary' | 'muted'; // For different UI styles
}

export default function FeatureList({ 
  items, 
  activeItem, 
  onSelect, 
  variant = 'primary' 
}: FeatureListProps) {
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      className="pl-6 py-2" // Added vertical padding to prevent shadow clipping
      contentContainerStyle={{ paddingRight: 40 }} // Extra space at the end
    >
      {items.map((item) => {
        const isActive = activeItem === item;
        
        return (
          <TouchableOpacity 
            key={item}
            onPress={() => onSelect(item)}
            // Use 'bg-primary' for active, 'bg-muted' for inactive
            className={`mr-3 px-4 py-2 rounded-full border ${
              isActive 
                ? 'bg-primary border-primary' 
                : 'bg-muted border-transparent'
            }`}
          >
            <Text className={`font-bold ${
              isActive ? 'text-white' : 'text-muted-foreground'
            }`}>
              {item.startsWith('@') ? item : item.toUpperCase()} 
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}