import React, { ReactElement } from 'react';
import classnames from 'classnames';
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
    error = false,
    onChange,
}: Props): ReactElement {
    const className = classnames(s.root, {
        [s.error]: error,
    });

    return (
        <MuiDateTimePicker
            inputVariant="outlined"
            value={value}
            className={className}
            ampm={false}
            onChange={onChange}
            helperText={helperText}
            error={error}
        />
    );
}
