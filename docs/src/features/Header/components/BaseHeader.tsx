import React from 'react';
import cx from 'clsx';
import { Container, Logo, LogoIcon, LogoSymbolIcon } from '@/lib/components';
import styles from '@/features/Header/styles/Header.module.scss';

interface BaseHeaderProps {
    logoTitle?: string;
    logoHint?: string;
    children?: React.ReactNode;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({ logoTitle, logoHint = 'Documentation', children }) => {
    const title = logoTitle || 'Logo';
    const leftColClassNames = cx(styles.headerCol, styles.logoWrapper);
    const defaultLogoClassNames = cx(styles.logoPic, 'mobile-hide');
    const symbolLogoClassNames = cx(styles.logoPic, 'mobile-show');

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    <div className={leftColClassNames}>
                        <div className={styles.logo}>
                            <Logo logoElement={<LogoIcon />} className={defaultLogoClassNames} title={title} />
                            <Logo logoElement={<LogoSymbolIcon />} className={symbolLogoClassNames} title={title} />
                        </div>
                        {logoHint && <span className={styles.logoHint}>{logoHint}</span>}
                    </div>
                    {!!children && <div className={styles.headerCol}>{children}</div>}
                </div>
            </Container>
        </header>
    );
};

export default BaseHeader;
