import React from 'react';
import Link from 'next/link';
import cx from 'clsx';
import styles from './Button.module.scss';

interface ButtonOptions {
    to?: string;
    type?: 'button' | 'link' | 'submit';
    size?: 's' | 'm' | 'l';
    colorMode?: 'default' | 'primary' | 'line';
    wide?: boolean;
    disabled?: boolean;
    isActive?: boolean;
    className?: string;
    activeClassName?: string;
    ariaLabel?: string;
    tabIndex?: number;
    role?: string;
    form?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface ButtonEventHandlers {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    onMouseDown?: (e: React.SyntheticEvent<HTMLElement>) => void;
    onMouseUp?: (e: React.SyntheticEvent<HTMLElement>) => void;
    onMouseMove?: (e: React.SyntheticEvent<HTMLElement>) => void;
    onMouseLeave?: (e: React.SyntheticEvent<HTMLElement>) => void;
    onSubmit?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

interface ButtonProps extends ButtonOptions, ButtonEventHandlers {}

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    size = 'm',
    wide,
    ariaLabel,
    tabIndex = 0,
    role,
    to = '',
    target,
    onClick = (): void => {},
    onMouseDown = (): void => {},
    onMouseUp = (): void => {},
    onSubmit = (): void => {},
    onFocus = (): void => {},
    onBlur = (): void => {},
    className,
    colorMode = 'default',
    isActive,
    style = {},
    activeClassName = '',
    disabled,
    ...restProps
}) => {
    const buttonClasses = cx(styles.button, className, {
        [styles[colorMode]]: !!colorMode,
        [activeClassName]: isActive && activeClassName,
        [styles[`size-${size}`]]: size,
        [styles.wide]: wide,
        [styles.disabled]: disabled,
        disabled,
    });

    if (disabled)
        return (
            <button
                type="button"
                disabled
                className={buttonClasses}
                style={style}
                aria-label={ariaLabel}
                onFocus={onFocus}
                onBlur={onBlur}
                {...restProps}
            >
                {children}
            </button>
        );

    switch (type) {
        case 'button':
            return (
                <button
                    className={buttonClasses}
                    type="button"
                    role={role}
                    onClick={onClick}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    aria-label={ariaLabel}
                    title={ariaLabel}
                    tabIndex={tabIndex}
                    style={style}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...restProps}
                >
                    {children}
                </button>
            );
        case 'link':
            return (
                <Link href={to} passHref>
                    <a
                        className={buttonClasses}
                        aria-label={ariaLabel}
                        target={target}
                        style={style}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        title={ariaLabel}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    >
                        {children}
                    </a>
                </Link>
            );
        default:
            return (
                <button
                    className={buttonClasses}
                    type="submit"
                    onClick={onSubmit}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    aria-label={ariaLabel}
                    title={ariaLabel}
                    tabIndex={tabIndex}
                    style={style}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...restProps}
                >
                    {children}
                </button>
            );
    }
};

export default Button;
