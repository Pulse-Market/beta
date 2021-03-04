import React, { useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { storeDarkmode, useDarkmode } from '../../utils/darkmode';

import s from './DarkmodeButton.module.scss';

export default function DarkmodeButton() {
    const isDarkmodeActive = useDarkmode();

    const handleButtonClick = useCallback(() => {
        storeDarkmode(!isDarkmodeActive);
    }, [isDarkmodeActive]);

    return (
        <IconButton aria-label="darkmode" className={s.root} onClick={handleButtonClick}>
            {!isDarkmodeActive && <div className={s.icon}>🌚</div>}
            {isDarkmodeActive && <div className={s.icon}>🌞</div>}
        </IconButton>
    );
}
