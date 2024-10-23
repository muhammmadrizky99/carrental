import { primaryGradient } from "@/const"
import { Text } from "@mantine/core"
import React from "react";
import Link from 'next/link'

export const Logo = () => {
    return <Text fz="lg" fw="bold"
    variant="gradient"
    gradient={primaryGradient}
     component={Link}
     href="/"
     >
        Carrental
     </Text>
};
