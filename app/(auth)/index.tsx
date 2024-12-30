import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'doc.ai://auth/callback',
        },
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: 'doc.ai://auth/callback',
        },
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleAppleLogin = async () => {
    // try {
    //   const credential = await AppleAuthentication.signInAsync({
    //     requestedScopes: [
    //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //     ],
    //   });
    //   const { error } = await supabase.auth.signInWithIdToken({
    //     provider: 'apple',
    //     token: credential.identityToken,
    //   });
    //   if (error) throw error;
    // } catch (e) {
    //   if (e.code === 'ERR_REQUEST_CANCELED') {
    //     // Handle user cancellation
    //     return;
    //   }
    //   Alert.alert('Error', e.message);
    // }
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

          <View className="mt-6 flex-row items-center">
            <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
            <Text className="mx-4 text-sm text-gray-500">or continue with</Text>
            <View className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800" />
          </View>

          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 dark:border-gray-800"
              onPress={handleGoogleLogin}>
              <FontAwesome name="google" size={20} color="#EA4335" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 dark:border-gray-800"
              onPress={handleTwitterLogin}>
              <FontAwesome name="twitter" size={20} color="#1DA1F2" />
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={{ width: 44, height: 44 }}
                onPress={handleAppleLogin}
              />
            )}
          </View>

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
