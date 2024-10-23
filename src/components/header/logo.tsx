import React from 'react';
import { Text } from '@mantine/core';
import { primaryGradient } from '@/const';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Text
      component={Link}
      href="/"
      fz="lg"
      fw="bold"
      variant="gradient"
      gradient={primaryGradient}
    >
      Carrental
    </Text>
  );
};