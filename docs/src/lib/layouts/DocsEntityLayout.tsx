/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useRouter } from 'next/router';
import cx from 'clsx';
import { MDXComponents } from '@/features/Mdx/components';
import { Link, GithubIcon } from '@/lib/components';
import DocsLayout, { DocsLayoutProps } from '@/lib/layouts/DocsLayout';
import { RehypeFrontMatter } from '@/lib/types';
import { getComponentTabsData } from '@/lib/utils';
import styles from '@/lib/layouts/Layout.module.scss';

interface DocsEntityLayoutProps extends DocsLayoutProps {
    frontMatter: RehypeFrontMatter;
}
const DocsEntityLayout: React.FC<DocsEntityLayoutProps> = ({ frontMatter, children, ...props }) => {
    const title = frontMatter?.title ?? 'Component';
    const slug = frontMatter.slug ?? '';
    const description = frontMatter?.description ?? '';
    const entityGHFilePath = frontMatter?.path ?? '';
    const blobGHUrl = frontMatter.siteConfig.repo.blobUrl;
    const sourceLinkPath = `${blobGHUrl}${entityGHFilePath}`;

    const { query, asPath } = useRouter();
    const tabsData = getComponentTabsData(['components', query?.slug ?? '']);

    return (
        <DocsLayout {...props}>
            <div className={styles.entityHeader}>
                <MDXComponents.h1>{title}</MDXComponents.h1>
                {description && <MDXComponents.p>{description}</MDXComponents.p>}
                <div className={styles.externalLinksList}>
                    <Link className={styles.externalLink} to={sourceLinkPath} target="_blank">
                        <GithubIcon />
                        Source
                    </Link>
                </div>
            </div>
            <div className={styles.sectionTabs}>
                {tabsData.map(({ id, label, doc }) => {
                    const isEqualSlug = doc.slug === slug;
                    const isEqualPath = doc.slug === asPath;
                    const isActive = isEqualSlug || isEqualPath;
                    const linkClassName = cx(styles.tab, { [styles.active]: isActive });

                    return (
                        <Link key={id} to={doc.slug} className={linkClassName}>
                            {label}
                        </Link>
                    );
                })}
            </div>
            <article className={styles.entityArticle}>{children}</article>
        </DocsLayout>
    );
};

export default DocsEntityLayout;
