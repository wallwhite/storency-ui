import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import MDXComponents from '@/features/Mdx/components/MDXComponents';
import styles from '@/features/Mdx/styles/Mdx.module.scss';

interface MDXRendererProps {
    code: Maybe<string>;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ code }) => {
    const Component = useMDXComponent(code ?? '');

    return (
        <div className={styles.mdx}>
            <Component components={MDXComponents} />
        </div>
    );
};

export default MDXRenderer;
