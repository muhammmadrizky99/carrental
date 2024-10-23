import { Container } from '@mantine/core';
import React from 'react';
import { Slider } from './slider';
import classes from './style.module.css';
import { SearchEngine } from '@/components/searchengine';

export const Hero = () => {
    return (
        <Container fluid pb="4rem" className={classes.hero}>
            <Slider />
            <Container>
                <SearchEngine />
            </Container>
        </Container>
    )
}