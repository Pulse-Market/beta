import React, { FormEvent, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { default as MuiButton } from '@material-ui/core/Button';

import s from './Button.module.scss';

interface ButtonProps {
    children: ReactNode | string;
    className?: string;
    onClick?: (event: FormEvent<HTMLButtonElement>) => void;
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
};

export default function Button({
    className = '',
    children,
    ...props
}: ButtonProps) {
    const classname = classnames(s.button, className, {
        [s['button--text']]: props.variant === 'text',
        [s['button--outlined']]: props.variant === 'outlined',
    });

    return (
        <MuiButton {...props} className={classname}>{children}</MuiButton>
    );
}
