import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { supabase } from '~/utils/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-gray-950">
      <View className="flex-1 justify-center px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome back
          </Text>
          <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please sign in to your account
          </Text>
        </View>

        <View className="space-y-4">
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
                placeholder="Enter your password"
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

          <TouchableOpacity
            className="mt-2 w-full rounded-lg bg-blue-600 py-3"
            onPress={handleLogin}
            disabled={loading}>
            <Text className="text-center font-semibold text-white">
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </TouchableOpacity>

          <View className="mt-4 flex-row justify-center">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-sm font-semibold text-blue-600">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
