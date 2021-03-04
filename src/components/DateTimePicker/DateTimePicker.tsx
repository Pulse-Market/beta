import React, { ReactElement } from 'react';
import { DateTimePicker as MuiDateTimePicker } from "@material-ui/pickers";

import s from './DateTimePicker.module.scss';

interface Props {
    value: Date;
    onChange: (date: Date | null) => void;
    helperText?: string;
    error?: boolean;
}

export default function DateTimePicker({
    value,
    helperText,
    error,
    onChange,
}: Props): ReactElement {
    return (
        <MuiDateTimePicker
            inputVariant="outlined"
            value={value}
            className={s.root}
            ampm={false}
            onChange={onChange}
            helperText={helperText}
            error={error}
        />
    );
}
