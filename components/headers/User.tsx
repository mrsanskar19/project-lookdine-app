import { router } from "expo-router";
import { ArrowLeft, Share2, Heart } from "lucide-react-native";
import { View, TouchableOpacity } from "react-native";

export default function UserHeader(){
    return(
        <View className="z-50 sticky">
        <View className="absolute top-6 left-6 right-6 flex-row justify-between items-center z-50">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-white p-3 rounded-full shadow-md border border-slate-100"
          >
            <ArrowLeft size={20} color="#1e293b" />
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-white p-3 rounded-full shadow-md border border-slate-100">
              <Share2 size={20} color="#1e293b" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 rounded-full shadow-md border border-slate-100">
              <Heart size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}