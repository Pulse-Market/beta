import React, { FormEvent } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { Account } from '../../../../models/Account';

import s from './AccountButton.module.scss';

interface Props {
    account: Account;
    onClick: (event: FormEvent) => void,
    className?: string;
}

export default function AccountButton({
    account,
    onClick,
    className = '',
}: Props) {
    return (
        <div>
            <IconButton aria-label="darkmode" onClick={onClick} className={s.iconButton}>
                <MoreHorizIcon />
            </IconButton>
        </div>
    );
}
