/* eslint-disable no-underscore-dangle */
import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { MDXRenderer } from '@/features/Mdx/components';
import { getDocByType, getDocDoc, uniq } from '@/lib/utils';
import { RehypeData } from '@/lib/types';
import { DocsEntityLayout } from '@/lib/layouts';

const DocsPage: NextPage<Record<'content', RehypeData>> = ({
    content: { title = '', description = '', frontMatter, body },
}) => (
    <DocsEntityLayout title={title} description={description} frontMatter={frontMatter} toc={frontMatter.headings}>
        <MDXRenderer code={body?.code} />
    </DocsEntityLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = uniq(getDocByType('components').flatMap((doc) => [doc.slug, `/${doc._raw.sourceFileDir}`]));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => ({
    props: { content: getDocDoc(['components', ctx?.params?.slug ?? '']) },
});

export default DocsPage;
