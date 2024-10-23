import { primaryGradient } from '@/const';
import { Button, Container, Flex } from '@mantine/core';
import classes from './searchengine.module.css'
import React from 'react';
import { SelectRegion } from '../selectregion';
import { SelectCarMake } from '../selectcarmake';
import { SelectDate } from '../selectdate';

export const SearchEngine = () => {
    return (
    <Container className={classes.container}>
        <Flex direction={{base:'column', sm:'row', }} 
        justify={'center'} 
        gap={{base:'sm', sm:'lg'}}
        align={{
            base:'stretch',
            sm:'flex-end',
        }}
        >
        
        <SelectRegion />
        <SelectCarMake />
        <SelectDate label="Pickup Date"/>
        <SelectDate label="Return Date"/>
        <Button variant='gradient' gradient={primaryGradient}>
            Search
        </Button>
        </Flex>
    </Container>
);
};