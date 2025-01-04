import { Stack } from 'expo-router';

import { withNoAuth } from '~/hooks/hoc/withNoAuth';

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="callback" options={{ headerShown: false }} />
    </Stack>
  );
}

export default withNoAuth(AuthLayout);
