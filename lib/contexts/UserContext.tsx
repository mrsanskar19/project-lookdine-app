import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { apiRequest, Storage } from '../services/api';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const segments = useSegments();
  const router = useRouter();

  // 1. Core Logic: Manage State and Routing
  useEffect(() => {
    const syncApp = async () => {
      try {
        const [authData, introData] = await Promise.all([
          Storage.get('@AuthUser'),
          Storage.get('@Intro')
        ]);

        const currentUser = authData?.user || null;
        const hasFinishedIntro = introData?.show === false;

        // Update user state if it changed
        if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
          setUser(currentUser);
        }


        if (isLoading) return; // Wait for initial storage check

        if(!currentUser){
          if(hasFinishedIntro){
            router.replace("/")
          }else{
            router.replace("/(auth)/login")
          }
        }else{
          router.replace("/(main)/(tabs)/home")
        }

      } catch (e) {
        console.error("Sync Error", e);
      } finally {
        if (isLoading) setIsLoading(false);
      }
    };

    syncApp();
  }, [user, isLoading]);

  // --- ACTIONS ---

  const login = async (credentials: any) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (res.data) {
        await Storage.save('@AuthUser', res.data);
        setUser(res.data.user); // The useEffect above handles the redirect
      }
    } catch (err: any) {
      setError(err.message === '401' ? "Invalid credentials" : "Server error");
      setIsLoading(false); // Only set false on error; success handles it via redirect
    }
  };

  const logout = async () => {
    setUser(null);
    await Storage.remove('@AuthUser');
    // useEffect will auto-redirect to login
  };

  const closeIntro = async () => {
    await Storage.save('@Intro', { show: false });
    router.replace('/(auth)/login');
  };

  // Memoize context to prevent unnecessary child re-renders
  const value = useMemo(() => ({
    user, isLoading, error, setError, login, logout, closeIntro
  }), [user, isLoading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);