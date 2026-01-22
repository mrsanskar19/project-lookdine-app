import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, ArrowRight, Camera } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputField } from '@/components/common/Input';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '', dob: '', email: '', mobile: '', username: '', interests: [] as string[], avatar: null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })); // Clear error on type
  };

  const validateStep = () => {
    let newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required";
      if (!formData.dob.trim()) newErrors.dob = "Birth Date is required";
    } else if (step === 2) {
      if (!formData.email.includes('@')) newErrors.email = "Enter a valid email";
      if (formData.mobile.length < 10) newErrors.mobile = "Enter a valid phone number";
    } else if (step === 3) {
      if (formData.username.length < 3) newErrors.username = "Username too short";
    } else if (step === 4) {
      if (formData.interests.length < 3) {
          Alert.alert("Selection Required", "Please select at least 3 interests");
          return false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < 5) setStep(s => s + 1);
      else router.replace('/home');
    }
  };


  const handleDateInput = (text: string) => {
    // If user is deleting (new text shorter than current), just update and return
    if (text.length < formData.dob.length) {
      setFormData(prev => ({ ...prev, dob: text }));
      return;
    }
  
    let cleaned = text.replace(/\D/g, '');
    let masked = cleaned;
  
    if (cleaned.length > 2) {
      masked = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      masked = masked.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
  
    handleInputChange('dob', masked);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        <ScrollView className="flex-1 px-8 pt-8" showsVerticalScrollIndicator={false}>
          {step > 1 && (
            <TouchableOpacity onPress={() => setStep(s => s - 1)} className="mb-4">
              <ChevronLeft size={28} className="text-foreground" />
            </TouchableOpacity>
          )}

          {step === 1 && (
            <StepContent title="Basic Info" sub="All fields are required">
              <InputField 
                label="Full Name" 
                placeholder="Full Name"
                value={formData.name} 
                required 
                error={errors.name}
                onChangeText={(text: string) => handleInputChange('name', text)} 
              />
            <InputField 
                label="Birth Date" 
                placeholder="DD/MM/YYYY" 
                keyboardType="number-pad"
                maxLength={10}
                value={formData.dob} 
                required 
                error={errors.dob}
                onChangeText={handleDateInput} 
              />
            </StepContent>
          )}

          {step === 2 && (
            <StepContent title="Contact" sub="Valid email and mobile required">
              <InputField 
                label="Email" 
                value={formData.email} 
                required 
                error={errors.email}
                onChangeText={(text: string) => handleInputChange('email', text)} 
              />
              <InputField 
                label="Mobile" 
                value={formData.mobile} 
                required 
                error={errors.mobile}
                onChangeText={(text: string) => handleInputChange('mobile', text)} 
              />
            </StepContent>
          )}

          {step === 3 && (
            <StepContent title="Identity" sub="Create your unique handle">
              <InputField 
                label="Username" 
                value={formData.username} 
                required 
                error={errors.username}
                onChangeText={(text: string) => handleInputChange('username', text)} 
              />
            </StepContent>
          )}

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

          {step === 5 && (
            <StepContent title="Profile" sub="Upload a photo">
               <View className="items-center py-10">
                <TouchableOpacity className="w-44 h-44 rounded-full bg-muted border-2 border-dashed border-primary items-center justify-center">
                  <Camera size={40} className="text-primary" />
                </TouchableOpacity>
              </View>
            </StepContent>
          )}
        </ScrollView>

        <View className="p-8">
          <TouchableOpacity onPress={nextStep} className="bg-primary h-16 rounded-[24px] flex-row items-center justify-center">
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

function StepContent({ title, sub, children }: any) {
  return (
    <View className="mb-6">
      <Text className="text-3xl font-black text-foreground mb-1">{title}</Text>
      <Text className="text-muted-foreground text-base mb-8">{sub}</Text>
      {children}
    </View>
  );
}