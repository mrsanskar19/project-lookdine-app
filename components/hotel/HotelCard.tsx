import { router } from "expo-router";
import { Star, Clock } from "lucide-react-native";
import { TouchableOpacity, Text, Image, View } from "react-native";

export default function HotelCard({item}:{item:any}){
    return(
        <TouchableOpacity 
        key={item.id} 
        onPress={()=>router.push("/(main)/hotels/1")}
        className="bg-white mx-1 rounded-3xl border border-slate-100 mb-6 overflow-hidden shadow-sm"
      >
        <Image source={{ uri: item.image }} className="w-full h-48" />
        <View className="p-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-xl font-bold text-foreground">{item.name}</Text>
              <Text className="text-slate-500 mt-1">{item.category} • Modern</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-xl flex-row items-center">
              <Star size={14} color="#16a34a" fill="#16a34a" />
              <Text className="text-green-700 font-bold ml-1">{item.rating}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mt-4 pt-4 border-t border-slate-50">
            <Clock size={16} color="#94a3b8" />
            <Text className="text-slate-500 ml-2 font-medium">{item.time}</Text>
            <View className="w-1 h-1 bg-slate-300 rounded-full mx-3" />
            <Text className="text-slate-500 font-medium">Free Delivery</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}