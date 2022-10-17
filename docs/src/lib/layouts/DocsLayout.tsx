import React from 'react';
import cx from 'clsx';
import config from '@/configs/content-categories-config.json';
import { SEO, Main, Container } from '@/lib/components';
import { RehypeHeading } from '@/lib/types';
import { BaseHeader } from '@/features/Header/components';
import { Sidebar, TableOfContent } from '@/features/Navigation/components';
import { NavigationConfig } from '@/features/Navigation/types';
import styles from '@/lib/layouts/Layout.module.scss';

export interface DocsLayoutProps {
    title: string;
    description: string;
    toc?: RehypeHeading[];
    children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ title, description, toc = [], children }) => {
    const isTocExists = !!toc.length;
    const contentClassNames = cx(styles.content, {
        [styles.contentWithToc]: isTocExists,
    });
    return (
        <>
            <SEO title={title} description={description} />
            <BaseHeader />
            <Main>
                <Container>
                    <div className={styles.wrapper}>
                        <div className={styles.sidebar}>
                            <Sidebar config={config.items as NavigationConfig} />
                        </div>
                        <div className={contentClassNames}>{children}</div>
                        {isTocExists && (
                            <div className={styles.tocBar}>
                                <TableOfContent toc={toc} />
                            </div>
                        )}
                    </div>
                </Container>
            </Main>
        </>
    );
};

export default DocsLayout;
