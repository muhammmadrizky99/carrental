'use client';
import { Checkbox, PasswordInput, Stack, TextInput } from '@mantine/core';

export const AuthDetails = () => {
  return (
    <Stack>
      <TextInput
        label="Email"
        placeholder="hello@cargo.com"
      />

      <PasswordInput
        label="Password"
        placeholder="Your password"
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm Your password"
      />

      <Checkbox
        label="I accept terms and conditions"
      />
    </Stack>
  );
};
