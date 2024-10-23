import { Box, Group } from "@mantine/core";
import React from "react";
import classes from './style.module.css'
import { Logo } from "./logo";
import { AuthButtons } from "./authbuttons";
import { Theme } from "./theme";
import { NavigationMobile } from "./navigationmobile";

export const Navbar = () => {
    return (
        <Box className={classes.header}>
            <Group justify="space-between" h="100%">
                <Logo />
                <Box visibleFrom="md">
                    <AuthButtons />
                </Box>
                <Box visibleFrom="sm">
                    <Theme />
                </Box>
                <Box hiddenFrom="md">
                    <NavigationMobile />
                </Box>

            </Group>
        </Box>

    )

};
