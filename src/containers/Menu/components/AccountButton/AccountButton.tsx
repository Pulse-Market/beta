import React, { FormEvent } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import Button from '../../../../components/Button';
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
            {/* <Button variant="outlined" endIcon={<AccountCircleIcon />} onClick={onClick} className={s.accountMenuButton}>
                {account.accountId}
            </Button> */}
            <IconButton aria-label="darkmode" onClick={onClick} className={s.iconButton}>
                <AccountCircleIcon />
            </IconButton>
        </div>
    );
}
