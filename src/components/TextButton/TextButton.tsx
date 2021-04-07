import React, { ReactNode } from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';

import s from './TextButton.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export default function TextButton({
    children,
    className = '',
    ...props
}: Props) {
    const buttonClassName = classnames(s.root, className, {
        [s.disabled]: props.disabled,
    });

    return (
        <Button {...props} className={buttonClassName}>{children}</Button>
    );
}
