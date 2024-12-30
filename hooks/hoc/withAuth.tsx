import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { supabase } from '~/utils/supabase';

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function WithAuth(props: T) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session) {
            router.replace('/(auth)');
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
