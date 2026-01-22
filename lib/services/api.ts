import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://foodslinkx-backend.vercel.app/api';

// --- LOCAL STORAGE HELPERS ---
export const Storage = {
  save: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) { console.error("Storage Save Error", e); }
  },
  get: async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
  },
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  }
};

// --- NATIVE FETCH WRAPPER ---
export const apiRequest = async (endpoint: string, options: any = {}) => {
  const user = await Storage.get('@AuthUser');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(user?.token && { 'Authorization': `Bearer ${user.token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};