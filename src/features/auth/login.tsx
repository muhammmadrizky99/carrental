'use client';

import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NotRegisteredAlert } from './NotRegisteredAlert';
import { useLoginForm } from '../../hooks/useloginform';
import { useRouter } from 'next/navigation';
import { OAuthButtons } from './OAuthButtons';
import { NotVerifiedAlert } from './NotVerifiedAlert';

export function Login(props: PaperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const form = useLoginForm();
  const { push } = useRouter();

  const handleLogin = async () => {
    // Simulasi login tanpa autentikasi
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Login Successful', {
        position: "top-center",
      });
      form.reset();
      setNotRegistered(false);
      setNotVerified(false);
      push('/');
    }, 1000);
  };

  return (
    <Box px="md" py="xl">
      <Paper
        maw="450px"
        radius="sm"
        w="100%"
        p="xl"
        my="xl"
        mx="auto"
        withBorder
        {...props}
      >
        <LoadingOverlay
          visible={isSubmitting}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Text size="lg" fw={500}>
          Welcome back,
        </Text>
        <OAuthButtons />
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => handleLogin())}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@cargo.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />
          </Stack>

          <Group justify="apart" mt="xl">
            <Anchor
              component={Link}
              href="/signup"
              type="button"
              c="dimmed"
              size="xs"
            >
              Don{`'`}t have an account? Register
            </Anchor>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>

          <Group mt="xl">
            <Anchor
              component={Link}
              href="/providers"
              type="button"
              c="dimmed"
              size="xs"
            >
              Want to Rent your Car? Create Provider Account.
            </Anchor>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}
