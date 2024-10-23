'use client'
import { Center, SegmentedControl, useMantineColorScheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconSun, IconMoon } from '@tabler/icons-react'

export const Theme = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Prevent server-side rendering
    }
    return (
        <SegmentedControl
            value={colorScheme}
            onChange={(value) => setColorScheme(value as any)}
            data={[
                {
                    value: 'light',
                    label: (
                        <Center>
                            <IconSun size="1rem" stroke={1.5} />
                        </Center>
                    ),
                },
                {
                    value: 'dark',
                    label: (
                        <Center>
                            <IconMoon size="1rem" stroke={1.5} />
                        </Center>
                    ),
                },
            ]}
        />
    );
};

