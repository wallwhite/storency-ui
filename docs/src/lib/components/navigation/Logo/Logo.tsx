import React from 'react';
import Link from 'next/link';
import cx from 'clsx';
import styles from './LogoStyles.module.scss';

interface LogoProps {
    path?: string;
    title?: string;
    logoImgUrl?: string;
    logoElement?: React.ReactNode;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ path = '/', title = 'Logo', logoImgUrl, logoElement, className }) => (
    <Link href={path} passHref>
        <a className={cx(styles.container, className)}>
            {!!(logoElement && !logoImgUrl) && logoElement}
            {!!logoImgUrl && <img src={logoImgUrl} alt={title ?? ''} />}
            {!logoElement && !logoImgUrl && <span>{title}</span>}
        </a>
    </Link>
);

export default Logo;
