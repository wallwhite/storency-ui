import React from 'react';
import { allGuides, Guide } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { toArray } from '@/lib/utils';
import { DocsEntityLayout } from '@/lib/layouts';
import { MDXRenderer } from '@/features/Mdx/components';

type GettingStartedArticleProps = Record<'content', Guide>;

const GettingStartedArticle: NextPage<GettingStartedArticleProps> = ({
    content: { title = '', description = '', frontMatter, body },
}) => (
    <DocsEntityLayout title={title} description={description} frontMatter={frontMatter} toc={frontMatter.headings}>
        <MDXRenderer code={body?.code} />
    </DocsEntityLayout>
);

export const getStaticPaths: GetStaticPaths = () => {
    const paths = allGuides
        .map(({ _id: id }) => id.replace('guides/', '').replace('.mdx', ''))
        .map((id) => ({ params: { slug: id === 'index' ? [] : id.split('/') } }));

    return { paths, fallback: false };
};

export const getStaticProps = (ctx: GetStaticPropsContext): GetStaticPropsResult<GettingStartedArticleProps> => {
    const params = toArray(ctx?.params?.slug ?? '');

    return {
        props: {
            content: allGuides.find(({ _id: id }) => id.endsWith(`${params.join('/')}.mdx`)) as Guide,
        },
    };
};

export default GettingStartedArticle;
