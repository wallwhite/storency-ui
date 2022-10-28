import React, { useEffect, useRef } from 'react';
import cx from 'clsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToggleBoolean } from '@storency-ui/hooks';
import CopyIcon from '@/lib/components/icons/CopyIcon';
import Button, { ButtonProps } from '@/lib/components/inputs/Button/Button';
import styles from './CopyToClipboardButton.module.scss';

const RESET_TIMEOUT = 1000;

interface CopyToClipboardButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
    text: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ text, className, ...props }) => {
    const [copied, { on, off }] = useToggleBoolean(false);
    const timerRef = useRef<NodeJS.Timeout>();

    const buttonClassName = cx(styles.button, className);

    useEffect(() => {
        if (!copied) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(off, RESET_TIMEOUT);
    }, [copied]);

    return (
        <CopyToClipboard text={text}>
            <Button className={buttonClassName} onClick={on} {...props}>
                <CopyIcon />
                {copied ? 'Copied' : 'Copy'}
            </Button>
        </CopyToClipboard>
    );
};

export default CopyToClipboardButton;
