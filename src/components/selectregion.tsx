import { Select } from '@mantine/core';
import React from 'react';

export const SelectRegion = () => {
    return (
        <Select
            label="Region"
            placeholder="Padang barat"
            data={['Lubuk begalung', 'Pauh', 'Kuranji', 'Koto tangah']}
            searchable
            nothingFoundMessage="Nothing Found"
        />
    );
};