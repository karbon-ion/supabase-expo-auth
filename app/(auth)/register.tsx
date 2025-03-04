import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { supabase } from '~/utils/supabase';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (loading) return;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data) {
        Alert.alert('Registration Successful', 'Please check your email for verification link', [
          { text: 'OK', onPress: () => router.replace('/(tabs)') },
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-gray-950">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-full flex-1 justify-center px-6 py-20">
          <View className="mb-8">
            <Text className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Create account
            </Text>
            <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign up to get started
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </Text>
              <TextInput
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View>
              <Text className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </Text>
              <TextInput
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className={`mt-2 w-full rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'} py-3`}
              onPress={handleRegister}
              disabled={loading}>
              <View className="flex-row items-center justify-center space-x-2">
                {loading && <FontAwesome name="spinner" size={20} color="white" className="animate-spin" />}
                <Text className="text-center font-semibold text-white">
                  {loading ? 'Creating account...' : 'Create account'}
                </Text>
              </View>
            </TouchableOpacity>

            <View className="mt-4 flex-row justify-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)')}>
                <Text className="text-sm font-semibold text-blue-600">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
