import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Bell, Settings, User } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export function CustomTabBar({ state, descriptors, navigation }:{state:any,descriptors:any,navigation:any}) {
  return (
    <View className="flex-row bg-white h-20 border-t border-slate-100 px-4 pb-4 items-center justify-around shadow-lg">
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Dynamic Icon Logic
        const renderIcon = (color: string) => {
          switch (route.name) {
            case 'index': return <Home size={24} color={color} />;
            case 'search': return <Search size={24} color={color} />;
            case 'notifications': return (
              <View>
                <Bell size={24} color={color} />
                <View className="absolute -top-1 -right-1 bg-primary w-4 h-4 rounded-full border-2 border-white items-center justify-center">
                  <Text className="text-[8px] text-white font-bold">3</Text>
                </View>
              </View>
            );
            case 'settings': return <Settings size={24} color={color} />;
            default: return <User size={24} color={color} />;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className="items-center justify-center flex-1"
          >
            <View className={cn(
              "p-2 rounded-2xl items-center",
              isFocused ? "bg-primary" : "bg-transparent"
            )}>
              {renderIcon(isFocused ? "#F97316" : "#94a3b8")}
            </View>
            <Text 
              className={cn(
                "text-[10px] mt-1 font-medium",
                isFocused ? "text-primary" : "text-slate-400"
              )}
            >
              {options.title || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}