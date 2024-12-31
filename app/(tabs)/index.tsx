import { Session } from '@supabase/supabase-js';
import { Stack, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.replace('/(auth)');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View className="flex-1 p-6">
        {session && (
          <View className="mt-4 rounded-lg bg-gray-100 p-4">
            <Text className="text-lg font-semibold">User Information</Text>
            <Text className="mt-2">Email: {session.user.email}</Text>
            <Text className="mt-1">User ID: {session.user.id}</Text>
            <Text className="mt-1">
              Last Sign In: {new Date(session.user.last_sign_in_at || '').toLocaleString()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="mt-4 items-center rounded-lg bg-red-600 p-3"
          onPress={handleLogout}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base font-semibold text-white">Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
