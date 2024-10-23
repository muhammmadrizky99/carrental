'use client'
import { Box, Burger, Button, Center, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { AuthButtons } from './authbuttons';
import { Logo } from './logo';
import { Theme } from './theme';

export const NavigationMobile = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
      <Drawer
      size="xs"
      title={<Logo />}
      opened={opened}
      onClose={close} 
      transitionProps={{
        transition:'slide-right',
      }} >
        <AuthButtons />

        <Center hiddenFrom='sm' pos='fixed' bottom={0} mx='auto' w='90%' py={8}>
          <Theme />
        </Center>

      </Drawer>

      <Burger opened={opened} onClick={open} aria-label="Toggle navigation" />
    </>
    );
};
