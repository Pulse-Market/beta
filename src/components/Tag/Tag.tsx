import React from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';

import { MarketCategory } from '../../models/Market';
import getCategoryInfo from '../../utils/getCategoryInfo';

import s from './Tag.module.scss';

interface Props {
    category?: MarketCategory | string;
    className?: string;
    active?: boolean;
    type?: 'label' | 'button';
    onClick?: () => void;
}

export default function Tag({
    category,
    onClick,
    active = false,
    type = 'label',
    className = '',
}: Props) {
    const categoryInfo = getCategoryInfo(category);

    const rootClassName = classnames(s.root, className, {
        [s['root--active']]: active,
    });

    if (type === 'button') {
        return (
            <Button onClick={onClick} className={rootClassName}>
                <span className={s.title}>{categoryInfo.title}</span>
                <div className={s.cardImage} style={{ backgroundColor: categoryInfo.color }}>
                    <img src={categoryInfo.cardIcon} alt={categoryInfo.title} className={s.icon} />
                </div>
            </Button>
        );
    }

    return (
        <div className={rootClassName}>
            <span className={s.title}>{categoryInfo.title}</span>
            <div className={s.cardImage} style={{ backgroundColor: categoryInfo.color }}>
                <img src={categoryInfo.cardIcon} alt={categoryInfo.title} className={s.icon} />
            </div>
        </div>
    );
}
