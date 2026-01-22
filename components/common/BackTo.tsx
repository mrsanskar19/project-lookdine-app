import { useRouter } from 'expo-router';
import { Home, ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity, Text } from 'react-native';

export default function BackTo() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.back()}
      className="p-3 bg-card rounded-2xl border border-border/50 shadow-sm flex-row items-center"
    >
      <ChevronLeft size={20} className="text-primary" />
    </TouchableOpacity>
  );
}