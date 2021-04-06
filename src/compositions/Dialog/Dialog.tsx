import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { default as MuiDialog } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '../../components/Button';

import s from './Dialog.module.scss';
import trans from '../../translation/trans';

interface Props {
    title: string;
    open: boolean;
    isInfoDialog?: boolean;
    onRequestClose: () => void;
    onSubmitClick: () => void;
    canSubmit?: boolean;
    hideButtons?: boolean;
    paperClassName?: string;
}

export default function Dialog({
    title,
    children,
    open,
    isInfoDialog = false,
    onRequestClose,
    onSubmitClick,
    canSubmit = true,
    hideButtons = false,
    paperClassName = '',
}: PropsWithChildren<Props>) {
    return (
        <MuiDialog open={open} classes={{ paper: classnames(s.paper, paperClassName) }}>
            <DialogTitle className={s.title}>
                {title}
            </DialogTitle>
            <DialogContent className={s.content}>
                {children}
            </DialogContent>
            {isInfoDialog && (
                <DialogActions>
                    <Button className={s.cancelButton} onClick={onRequestClose}>
                        {trans('global.action.close')}
                    </Button>
                </DialogActions>
            )}

            {!hideButtons && (
                <DialogActions>
                    <Button className={s.cancelButton} onClick={onRequestClose}>
                        {trans('global.action.cancel')}
                    </Button>
                    <Button disabled={!canSubmit} className={s.confirmButton} onClick={onSubmitClick}>
                        {trans('global.action.submit')}
                    </Button>
                </DialogActions>
            )}
        </MuiDialog>
    );
}
