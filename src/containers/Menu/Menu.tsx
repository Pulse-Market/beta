import React, { FormEvent, ReactElement, useState } from "react";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';

import Button from "../../components/Button";
import trans from "../../translation/trans";
import { Account } from "../../models/Account";
import { formatCollateralToken } from "../../services/CollateralTokenService";

import s from './Menu.module.scss';
import DarkmodeButton from "../../components/DarkmodeButton";
import AccountButton from "./components/AccountButton/AccountButton";
import FluxSdk from "@fluxprotocol/amm-sdk";
import { TokenViewModel } from "../../models/TokenViewModel";

interface Props {
    className?: string;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onProfileClick: () => void;
    onWrapNearClick: () => void;
    account: Account | null;
    wrappedNear?: TokenViewModel;
}

export default function Menu({
    onLoginClick,
    onLogoutClick,
    onProfileClick,
    onWrapNearClick,
    account,
    wrappedNear,
    className = ''
}: Props): ReactElement {
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);

    function handleMenuClick(event: FormEvent) {
        setMenuAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchorEl(null);
    }

    function handleLogoutClick() {
        handleMenuClose();
        onLogoutClick();
    }

    function handleProfileClick() {
        handleMenuClose();
        onProfileClick();
    }

    function handleWrapNearClick() {
        handleMenuClose();
        onWrapNearClick();
    }

    return (
        <header className={classnames(s.menu, className)}>
            <div className={s.menu__items}>
                <div className={s.menu__item}>
                    <Link to="/" className={s.menu__logoWrapper}>
                        <div className={s.menu__logo} />
                    </Link>
                </div>
                <div className={classnames(s.menu__item, s['menu__last-item'])}>
                    {account === null && (
                        <DarkmodeButton />
                    )}

                    {account === null && (
                        <Button onClick={onLoginClick}>{trans('auth.login')}</Button>
                    )}

                    {account && (
                        <>
                            <span className={s.accountName}>{account.accountId}</span>
                            <span className={s.divider}></span>
                            <span>
                                <Button className={s.wNearBalance} variant="text" onClick={handleWrapNearClick}>
                                    {trans('menu.balance', {
                                        amount: FluxSdk.utils.formatToken(wrappedNear?.balance ?? '0', 24, 2),
                                        tokenSymbol: wrappedNear?.tokenSymbol ?? 'wNEAR',
                                    })}
                                </Button>
                            </span>
                            <DarkmodeButton />
                            <AccountButton account={account} onClick={handleMenuClick} />
                            <MuiMenu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                                <MuiMenuItem disabled>{account.accountId}</MuiMenuItem>
                                <MuiMenuItem disabled>NEAR: {formatCollateralToken(account.balance, 24)} Ⓝ</MuiMenuItem>
                                <MuiMenuItem onClick={handleWrapNearClick}>{trans('menu.wrapNear')}</MuiMenuItem>
                                <MuiMenuItem onClick={handleProfileClick}>{trans('menu.profile')}</MuiMenuItem>
                                <MuiMenuItem onClick={handleLogoutClick}>{trans('menu.logout')}</MuiMenuItem>
                            </MuiMenu>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}
