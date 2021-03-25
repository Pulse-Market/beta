import React, { ReactElement } from 'react';

import { SvgIconProps } from '../types';

import s from '../Icon.module.scss';

export default function IconSwap({ className = '' }: SvgIconProps): ReactElement {
    return (
        <svg viewBox="0 0 16 22" className={`${s.icon} ${className}`}>
            <path d="M3 21.5V22H4V21.5H3ZM3.5 0.5L0.613249 5.5H6.38675L3.5 0.5ZM4 21.5V5H3V21.5H4Z"/>
            <path d="M12.5 0.5V0H13.5V0.5H12.5ZM13 21.5L10.1132 16.5H15.8868L13 21.5ZM13.5 0.5V17H12.5V0.5H13.5Z"/>
        </svg>
        // <svg viewBox="0 0 100 100" className={`icon ${className}`}>
        //     <polygon points="72.2,55.6 58.1,55.6 58.1,38.9 41.9,38.9 41.9,55.6 27.8,55.6 50,77.8" />
        //     <path d="M97.4,12.4l-7.7-9.3C88.2,1.2,85.9,0,83.3,0H16.7c-2.6,0-4.9,1.2-6.4,3.1l-7.7,9.3C0.9,14.3,0,16.8,0,19.4v69.4C0,95,5,100,11.1,100h77.8c6.1,0,11.1-5,11.1-11.1V19.4C100,16.8,99.1,14.3,97.4,12.4z M18,11.1h64l4.5,5.4H13.6L18,11.1zM88.9,88.9H11.1V27.8h77.8V88.9z" />
        // </svg>
    );
}
