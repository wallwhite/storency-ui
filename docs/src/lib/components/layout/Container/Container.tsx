import React from 'react';
import cx from 'clsx';
import styles from './Container.module.scss';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    const containerClassName = cx(styles.container, className);

    return <div className={containerClassName}>{children}</div>;
};

export default Container;
