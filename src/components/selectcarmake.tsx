import { Select } from '@mantine/core';
import React from 'react';

export const SelectCarMake = () => {
    return (
        <Select
            label="Car Make"
            placeholder="All"
            data={['Toyota', 'Nissan']}
            searchable
            nothingFoundMessage="Nothing Found"
        />
    );
};