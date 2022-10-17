import React from 'react';
import cx from 'clsx';
import styles from './Label.module.scss';

interface LabelProps {
    htmlFor?: string;
    htmlLabel?: boolean;
    children: React.ReactNode;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, htmlLabel, children, className }) => {
    const isHtmlLabel = !!htmlFor || htmlLabel;
    const labelClassName = cx(styles.label, className, { [styles.htmlLabel]: isHtmlLabel });

    return isHtmlLabel ? (
        <label htmlFor={htmlFor} className={labelClassName}>
            {children}
        </label>
    ) : (
        <span className={labelClassName}>{children}</span>
    );
};

export default Label;
