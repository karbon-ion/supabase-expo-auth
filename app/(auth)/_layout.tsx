import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;