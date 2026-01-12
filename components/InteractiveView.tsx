import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { View as ViewIcon, X } from 'lucide-react-native';

export default function InteractiveView({ imageUrl, modelUrl }:{imageUrl?:string,modelUrl?:string}) {
  const [show3D, setShow3D] = useState(false);

  // 360/3D HTML Template
  const threeDHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
      </head>
      <body style="margin: 0; overflow: hidden;">
        <a-scene embedded vr-mode-ui="enabled: false">
          <a-sky src="${imageUrl}" rotation="0 -90 0"></a-sky>
          <a-entity camera look-controls></a-entity>
        </a-scene>
      </body>
    </html>
  `;

  if (show3D) {
    return (
      <View className="flex-1 bg-black">
        <TouchableOpacity 
          onPress={() => setShow3D(false)}
          className="absolute top-12 right-6 z-50 bg-white/20 p-2 rounded-full"
        >
          <X color="white" size={24} />
        </TouchableOpacity>
        
        {Platform.OS === 'web' ? (
          <iframe srcDoc={threeDHtml} style={{ width: '100%', height: '100%', border: 'none' }} />
        ) : (
          <WebView originWhitelist={['*']} source={{ html: threeDHtml }} className="flex-1" />
        )}
      </View>
    );
  }

  return (
    <View className="relative w-full h-64 rounded-3xl overflow-hidden">
      <Image source={{ uri: imageUrl }} className="w-full h-full" />
      
      {/* 3D Trigger Button */}
      <View className="absolute inset-0 bg-black/20 items-center justify-center">
        <TouchableOpacity 
          onPress={() => setShow3D(true)}
          className="bg-white/90 px-6 py-3 rounded-2xl flex-row items-center shadow-xl"
        >
          <ViewIcon size={20} color="#F97316" />
          <Text className="text-primary font-bold ml-2">View in 3D</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}