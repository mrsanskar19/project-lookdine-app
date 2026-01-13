import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, ActionSheetIOS } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, MoreVertical, Send, Plus, Phone, Video, Smile, Reply, Trash2, Copy } from 'lucide-react-native';

export default function ChatRoom() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! Is the reservation still on for 8 PM?', sender: 'other', time: '10:00 AM' },
    { id: '2', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
    { id: '3', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
    { id: '4', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
    { id: '5', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
    { id: '6', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
    { id: '7', text: 'Yes, Chef Mario confirmed the table.', sender: 'me', time: '10:02 AM', replyingTo: 'Hey! Is the reservation still on for 8 PM?' },
  ]);
  const [replyTo, setReplyTo] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // --- ACTIONS ---
  useEffect(() => {
    // Small timeout ensures the layout has rendered before scrolling
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);
  
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyingTo: replyTo?.text
    };
    setMessages([...messages, newMessage]);
    setInput('');
    setReplyTo(null);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleLongPress = (msg: any) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Cancel', 'Reply', 'Copy', 'Delete'], destructiveButtonIndex: 3, cancelButtonIndex: 0 },
        (buttonIndex) => {
          if (buttonIndex === 1) setReplyTo(msg);
          if (buttonIndex === 3) setMessages(messages.filter(m => m.id !== msg.id));
        }
      );
    } else {
      Alert.alert("Message Options", "Choose an action", [
        { text: "Reply", onPress: () => setReplyTo(msg) },
        { text: "Delete", onPress: () => setMessages(messages.filter(m => m.id !== msg.id)), style: 'destructive' },
        { text: "Cancel", style: 'cancel' }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-background">
      {/* --- HEADER --- */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-border/50 bg-background/80">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-1"><ChevronLeft size={28} className="text-foreground" /></TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/100?u=1' }} className="w-10 h-10 rounded-full" />
          <View className="ml-3">
            <Text className="text-base font-black text-foreground">Chef Mario</Text>
            <Text className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Now</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity className="p-2 bg-muted/50 rounded-full"><Phone size={18} className="text-foreground" /></TouchableOpacity>
          <TouchableOpacity className="p-2 bg-muted/50 rounded-full"><MoreVertical size={18} className="text-foreground" /></TouchableOpacity>
        </View>
      </View>

      {/* --- MESSAGES --- */}
      <ScrollView ref={scrollViewRef} className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          {messages.map((msg) => (
            <TouchableOpacity 
              key={msg.id} 
              onLongPress={() => handleLongPress(msg)}
              activeOpacity={0.9}
              className={`mb-4 flex-row ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <View className={`max-w-[80%] px-4 py-3 rounded-[24px] ${msg.sender === 'me' ? 'bg-primary rounded-tr-none' : 'bg-card border border-border/50 rounded-tl-none'}`}>
                {msg?.replyingTo && (
                  <View className="bg-black/10 p-2 rounded-lg mb-2 border-l-4 border-primary">
                    <Text className="text-[10px] opacity-60 italic" numberOfLines={1}>{msg?.replyingTo}</Text>
                  </View>
                )}
                <Text className={`text-[15px] ${msg.sender === 'me' ? 'text-white' : 'text-foreground'}`}>{msg.text}</Text>
                <Text className={`text-[9px] mt-1 text-right opacity-60 ${msg.sender === 'me' ? 'text-white' : 'text-foreground'}`}>{msg.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- INPUT BAR --- */}
      <View className="bg-background border-t border-border/20 p-3">
        {replyTo && (
          <View className="flex-row justify-between items-center bg-muted/50 p-3 rounded-t-2xl border-x border-t border-border/20">
            <View className="flex-row items-center">
              <Reply size={14} className="text-primary mr-2" />
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>Replying to: {replyTo.text}</Text>
            </View>
            <TouchableOpacity onPress={() => setReplyTo(null)}><Text className="text-xs font-bold text-primary">Cancel</Text></TouchableOpacity>
          </View>
        )}
        <View className="flex-row items-end space-x-2">
          <View className="flex-1 flex-row items-end bg-muted/50 rounded-[24px] px-3 py-2">
            <TouchableOpacity className="p-1"><Plus size={24} className="text-primary" /></TouchableOpacity>
            <TextInput
              placeholder="Type message..."
              value={input}
              onChangeText={setInput}
              multiline
              numberOfLines={1}
              className="flex-1 mx-2 text-foreground text-[16px] max-h-24 pt-1"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity className="p-1"><Smile size={24} className="text-muted-foreground" /></TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={sendMessage}
            disabled={!input.trim()}
            className={`p-3.5 rounded-full ${input.trim() ? 'bg-primary' : 'bg-muted opacity-50'}`}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}