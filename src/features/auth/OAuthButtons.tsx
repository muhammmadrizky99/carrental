import { GoogleIcon } from '@/components/icons/googleicon';
import { Button, Group } from '@mantine/core';
import React from 'react';

export const OAuthButtons = () => {
  const handleGoogleSignIn = () => {
    // Simulasi klik Google Sign-In tanpa autentikasi
    console.log("Google Sign-In clicked");
  };

  return (
    <Group grow mb="md" mt="md">
      <Button
        leftSection={<GoogleIcon />}
        variant="default"
        color="gray"
        radius="xl"
        onClick={handleGoogleSignIn}
      >
        Google
      </Button>
    </Group>
  );
};
