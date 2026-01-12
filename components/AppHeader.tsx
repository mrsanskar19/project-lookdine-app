import { View, Text, TouchableOpacity } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Home, Search, Bell, Settings, ChevronLeft, Search as SearchIcon, User } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define the UI State based on Path
  const getHeaderDetails = () => {
    switch (pathname) {
      case '/(main)/(tabs)':
      case '/':
        return {
          title: 'Explore',
          icon: <Home size={22} color="#F97316" />,
          showBack: false,
          rightAction: <Bell size={22} color="#64748b" />
        };
      case 'search':
        return {
          title: 'Find Food',
          icon: <SearchIcon size={22} color="#F97316" />,
          showBack: true,
          rightAction: <Settings size={22} color="#64748b" />
        };
      case '/profile':
        return {
          title: 'Profile',
          icon: <User size={22} color="#F97316" />,
          showBack: true,
          rightAction: null
        };
      case '/settings':
        return {
          title: 'Account',
          icon: <Settings size={22} color="#F97316" />,
          showBack: true,
          rightAction: null
        };
      default:
        return {
          title: 'Social Dine',
          icon: null,
          showBack: true,
          rightAction: null
        };
    }
  };

  const details = getHeaderDetails();

  return (
    <View className="bg-white border-b border-slate-100 px-6 mt-5 py-2 flex-row items-center justify-between shadow-sm">
      <View className="flex-row items-center space-x-3">
        {details.showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <ChevronLeft size={28} color="#334155" />
          </TouchableOpacity>
        )}
        
        <View className="w-10 h-10 bg-orange-50 rounded-xl items-center justify-center">
          {details.icon}
        </View>
        
        <View>
          {/* <Text className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Social Dine - {pathname}
          </Text> */}
          <Text className="text-xl font-bold text-slate-900">
            {details.title}
          </Text>
        </View>
      </View>

      {details.rightAction && (
        <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
          {details.rightAction}
        </TouchableOpacity>
      )}
    </View>
  );
}