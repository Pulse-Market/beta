import React, { ChangeEvent, ReactElement } from 'react';

import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export interface SelectItem {
    value: string;
    label: string;

}

interface Props {
    value: string;
    items: SelectItem[];
    onChange: (item: SelectItem) => void;
}

export default function Select({
    value,
    items,
    onChange,
}: Props): ReactElement {
    function handleChange(event: ChangeEvent<{ name?: string, value: unknown }>) {
        const value = event.target.value as string;
        const item = items.find(item => item.value === value);

        if (item) {
            onChange(item);
        }
    }

    return (
        <MuiSelect value={value} onChange={handleChange}>
            {items.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
        </MuiSelect>
    )
}
