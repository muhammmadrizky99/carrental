'use client';
import { primaryGradient } from "@/const";
import { Button, Group } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const excludedPaths = ['/login', '/signup'];
export const AuthButtons = () => {
    const smallScreen = useMediaQuery('(max-width: 991px)');
    const pathname = usePathname();

    return (
        <>

            {!excludedPaths.includes(pathname) && (
                <Group grow={smallScreen}>
                    <Button component={Link} href="/login" variant="default">
                        Log in
                    </Button>
                    <Button component={Link} href="/signup" variant="gradient"
                        gradient={primaryGradient}>
                        Sign up
                    </Button>

                </Group>
            )
            }
        </>

    );
};
