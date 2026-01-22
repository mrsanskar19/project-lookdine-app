import { TextInput, View,Text } from "react-native";

export function InputField({ label, ...props }: any) {
    return (
      <View className="mb-5">
        <Text className="text-sm font-bold text-foreground/70 mb-2 ml-1">{label}</Text>
        <TextInput 
          className="bg-muted/40 h-14 px-5 rounded-2xl text-foreground text-base border border-border/50 focus:border-primary"
          placeholderTextColor="#94a3b8"
          {...props}
        />
      </View>
    );
  }