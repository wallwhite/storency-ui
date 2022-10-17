import React from 'react';
import cx from 'clsx';
import styles from './Text.module.scss';

interface TextProps {
    size?: 's' | 'm' | 'l';
    className?: string;
    as?: 'span' | 'p' | 'div' | 'strong';
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, size = 's', className = '', as: Element = 'span' }) => {
    const sizeClassName = styles?.[`textSize-${size.toLocaleLowerCase()}`];
    const textClassNames = cx(styles.text, className, {
        [sizeClassName]: size,
    });

    return <Element className={textClassNames}>{children}</Element>;
};

export default Text;
