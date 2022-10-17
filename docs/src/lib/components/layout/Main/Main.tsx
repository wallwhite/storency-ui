import React from 'react';
import cx from 'clsx';
import styles from './Main.module.scss';

interface MainProps {
    children: React.ReactNode;
    className?: string;
}

const Main: React.FC<MainProps> = ({ children, className = '' }) => (
    <main className={cx(styles.main, className)}>{children}</main>
);

export default Main;
