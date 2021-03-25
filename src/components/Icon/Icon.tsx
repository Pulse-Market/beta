import React, { FC, ReactElement } from 'react';

import {
    IconSwap
} from './set';
import { SvgIconProps } from './types';

type IconSet = Record<string, FC<SvgIconProps>>;

interface IconProps extends SvgIconProps {
    name: string;
}

const icons: IconSet = {
    swap: IconSwap,
};

export default function Icon({
    name,
    className = '',
    accentClassName = '',
}: IconProps): ReactElement | null {
    const IconComponent = icons[name] ? icons[name] : null;

    return IconComponent ? <IconComponent className={className} accentClassName={accentClassName} /> : null;
}
