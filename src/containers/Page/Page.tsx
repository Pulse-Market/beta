import React, { PropsWithChildren, ReactElement } from "react";
import classnames from 'classnames';

import Footer from "../Footer";
import MenuConnector from "../../connectors/MenuConnector";

import styles from './Page.module.scss';
import WrapNearDialogConnector from "../../connectors/WrapNearDialogConnector";
import { useDarkModeThemeContext } from "../../utils/hooks/useDarkModeTheme";
import { Helmet } from "react-helmet";
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
    const { theme } = useDarkModeThemeContext();
    const pageBodyClassName = classnames(styles.page__body, bodyClassName, {
        [styles['page__body--large']]: size === 'large',
        [styles['page__body--unrestricted']]: size === 'unrestricted',
    });

    return (
        <div className={`${styles.page} ${className}`}>
            <Helmet htmlAttributes={{ 'data-theme': theme }} />

            {/* Normally don't put connectors in containers.. */}
            {hasNavigation && <MenuConnector />}
            <WrapNearDialogConnector />
            <main className={pageBodyClassName}>
                {children}
            </main>
            {hasFooter && <Footer />}
        </div>
    );
}
