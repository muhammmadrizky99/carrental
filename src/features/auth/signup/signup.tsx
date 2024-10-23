'use client';
import { EmailConfirmation } from '@/components/emailconfir';
import { Logo } from '@/components/header/logo';
import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { OAuthButtons } from '../OAuthButtons';
import { AuthDetails } from './authdetails';

export function Signup() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    // Simulasi proses pendaftaran
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Simulasi sukses pendaftaran
      console.log('Signup Successful. Please check your email to verify your account');
    }, 1000);
  };

  return (
    <>
      {isSubmitted ? (
        <EmailConfirmation email="user@example.com" /> 
      ) : (
        <>
          <LoadingOverlay
            visible={isSubmitting}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Box px="md" py="xl">
            <Paper maw="450px" radius="md" p="xl" mx="auto" my="xl" withBorder>
              <Text size="lg" fw={500}>
                Welcome to <Logo />
              </Text>
              <OAuthButtons />
              <Divider label="Or Continue with" labelPosition="center" my="md" />

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}>
                <AuthDetails /> {/* Hapus properti 'form' */}
                <FormSubmitSection label="Sign up" />
              </form>

              <Group mt="xl">
                <Anchor
                  component={Link}
                  href="/providers"
                  type="button"
                  color="dimmed"
                  size="xs"
                >
                  Want to Rent your Car? Create Provider Account.
                </Anchor>
              </Group>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}

export const FormSubmitSection = ({ label }: { label: string }) => {
  return (
    <Group justify="apart" mt="xl">
      <Anchor component={Link} href="/login" type="button" color="dimmed" size="xs">
        Already have an account? Login
      </Anchor>
      <Button type="submit" radius="xl">
        {label}
      </Button>
    </Group>
  );
};
