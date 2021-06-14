import React, { PropsWithChildren, ReactElement, useEffect } from "react";
import classnames from 'classnames';

import Footer from "../Footer";
import MenuConnector from "../../connectors/MenuConnector";

import styles from './Page.module.scss';
import WrapNearDialogConnector from "../../connectors/WrapNearDialogConnector";
import { setDarkmode } from "../../utils/darkmode";
import DisclaimerDialogConnector from "../../connectors/DisclaimerDialogConnector";
import StorageManagerDialogConnector from "../../connectors/StorageManagerDialogConnector";
interface Props {
    className?: string;
    bodyClassName?: string;
    hasNavigation?: boolean;
    hasFooter?: boolean;
    size?: 'large' | 'medium' | 'unrestricted';
}

export default function Page({
    children,
    hasNavigation = true,
    hasFooter = true,
    size = 'medium',
    className = '',
    bodyClassName = '',
}: PropsWithChildren<Props>): ReactElement {
    const pageBodyClassName = classnames(styles.page__body, bodyClassName, {
        [styles['page__body--large']]: size === 'large',
        [styles['page__body--unrestricted']]: size === 'unrestricted',
    });

    useEffect(() => {
        setDarkmode(false);
    }, []);

    return (
        <div className={`${styles.page} ${className}`}>
            {/* Normally don't put connectors in containers.. */}
            {hasNavigation && <MenuConnector />}
            <WrapNearDialogConnector />
            <DisclaimerDialogConnector />
            <StorageManagerDialogConnector />
            <main className={pageBodyClassName}>
                {children}
            </main>
            {hasFooter && <Footer />}
        </div>
    );
}
