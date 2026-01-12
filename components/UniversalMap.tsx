import { useRouter } from 'expo-router';
import React from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function UniversalWebView({ html }:{html:any}) {
  const router = useRouter();

  const handleMessage = (event: any) => {
    const hotelId = event.nativeEvent.data;
    // Redirect to the dynamic hotel page
    router.push(`/hotels/${hotelId}`);
  };

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const handleWebMessage = (event:any) => {
        // Ensure the message is from our map
        if (event.data?.type === 'HOTEL_CLICK') {
          router.push(`/hotels/${event.data.id}`);
        }
      };
      window.addEventListener('message', handleWebMessage);
      return () => window.removeEventListener('message', handleWebMessage);
    }
  }, []);
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <iframe 
          srcDoc={html} 
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none', 
            borderRadius: '24px' // Matches your mobile design
          }} 
          title="web-content"
          allow="geolocation"
        />
      </View>
    );
  }

  // 2. Mobile Version: Use High-Performance WebView
  return (
    <View className="flex-1">
      <WebView 
        originWhitelist={['*']} 
        source={{ html }} 
        className="flex-1"
        renderLoading={() => (
          <View className="absolute inset-0 items-center justify-center bg-white">
            <ActivityIndicator color="#F97316" size="large" />
          </View>
        )}
        startInLoadingState={true}
        onMessage={handleMessage}
        androidHardwareAccelerationDisabled={false}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowFileAccess={true}
  allowUniversalAccessFromFileURLs={true}
  mixedContentMode="always"
      />
    </View>
  );
}