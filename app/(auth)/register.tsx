import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, Check, ArrowRight, Utensils } from 'lucide-react-native';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', dob: '', email: '', mobile: '', username: '', interests: [] as string[], avatar: null
  });

  // --- Handlers ---
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(s => s + 1);
    else router.replace('/home'); // Redirect to Home
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        {/* --- DYNAMIC PROGRESS BAR --- */}
        {/* <View className="px-8 flex-row gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-muted/30'}`} />
          ))}
        </View> */}

        <ScrollView className="flex-1 px-8 pt-8" showsVerticalScrollIndicator={false}>
          {step > 1 && (
            <TouchableOpacity onPress={() => setStep(s => s - 1)} className="mb-4">
              <ChevronLeft size={28} className="text-foreground" />
            </TouchableOpacity>
          )}

          {/* STEP 1: PERSONAL INFO */}
          {step === 1 && (
            <StepContent title="Basic Info" sub="Enter your legal name and birthday">
              <InputField 
                label="Full Name" 
                placeholder="Ex: John Doe" 
                value={formData.name} 
                onChangeText={(text: string) => handleInputChange('name', text)} 
              />
              <InputField 
                label="Birth Date" 
                placeholder="MM/DD/YYYY" 
                value={formData.dob} 
                onChangeText={(text: string) => handleInputChange('dob', text)} 
              />
            </StepContent>
          )}

          {/* STEP 2: CONTACT */}
          {step === 2 && (
            <StepContent title="Contact" sub="We'll send a verification code">
              <InputField 
                label="Email" 
                keyboardType="email-address" 
                value={formData.email} 
                onChangeText={(text: string) => handleInputChange('email', text)} 
              />
              <InputField 
                label="Mobile" 
                keyboardType="phone-pad" 
                value={formData.mobile} 
                onChangeText={(text: string) => handleInputChange('mobile', text)} 
              />
            </StepContent>
          )}

          {/* STEP 3: USERNAME */}
          {step === 3 && (
            <StepContent title="Identity" sub="Create your unique handle">
              <View className="relative">
                <InputField 
                  label="Username" 
                  autoCapitalize="none"
                  value={formData.username} 
                  onChangeText={(text: string) => handleInputChange('username', text)} 
                />
                {formData.username.length > 3 && (
                  <View className="absolute right-4 top-11 bg-green-500 rounded-full p-1">
                    <Check size={12} color="white" />
                  </View>
                )}
              </View>
            </StepContent>
          )}

          {/* STEP 4: INTERESTS */}
          {step === 4 && (
            <StepContent title="Taste" sub="Select at least 3 favorites">
              <View className="flex-row flex-wrap gap-3">
                {['Italian', 'Sushi', 'Burgers', 'Vegan', 'Fine Dining', 'Bakery'].map(tag => (
                  <TouchableOpacity 
                    key={tag} 
                    onPress={() => toggleInterest(tag)}
                    className={`px-5 py-3 rounded-2xl border ${formData.interests.includes(tag) ? 'bg-primary border-primary' : 'bg-card border-border'}`}
                  >
                    <Text className={`font-bold ${formData.interests.includes(tag) ? 'text-white' : 'text-foreground'}`}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </StepContent>
          )}

          {/* STEP 5: AVATAR */}
          {step === 5 && (
            <StepContent title="Profile" sub="Upload a photo for your profile">
              <View className="items-center justify-center py-10">
                <TouchableOpacity className="w-44 h-44 rounded-full bg-muted border-2 border-dashed border-primary items-center justify-center overflow-hidden">
                  <Camera size={40} className="text-primary" />
                </TouchableOpacity>
              </View>
            </StepContent>
          )}
        </ScrollView>

        {/* --- FOOTER BUTTON --- */}
        <View className="p-8">
          <TouchableOpacity 
            onPress={nextStep}
            activeOpacity={0.8}
            className="bg-primary h-16 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/40"
          >
            <Text className="text-white font-bold text-lg mr-2">
              {step === 5 ? "Finish Setup" : "Continue"}
            </Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- REUSABLE COMPONENTS ---

function StepContent({ title, sub, children }: any) {
  return (
    <View className="mb-6">
      <Text className="text-3xl font-black text-foreground mb-1">{title}</Text>
      <Text className="text-muted-foreground text-base mb-8">{sub}</Text>
      {children}
    </View>
  );
}

function InputField({ label, ...props }: any) {
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