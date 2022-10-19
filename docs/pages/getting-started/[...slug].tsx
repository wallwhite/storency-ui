import React from 'react';
import { allGettingStarteds, GettingStarted } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { toArray } from '@/lib/utils';
import { DocsEntityLayout } from '@/lib/layouts';
import { MDXComponents } from '@/features/Mdx/components';

type GettingStartedArticleProps = Record<'content', GettingStarted>;

const GettingStartedArticle: NextPage<GettingStartedArticleProps> = ({
    content: { title = '', description = '', frontMatter, body },
}) => {
    const Component = useMDXComponent(body?.code);

    return (
        <DocsEntityLayout title={title} description={description} frontMatter={frontMatter} toc={frontMatter.headings}>
            <Component components={MDXComponents} />
        </DocsEntityLayout>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    const paths = allGettingStarteds
        .map(({ _id: id }) => id.replace('getting-started/', '').replace('.mdx', ''))
        .map((id) => ({ params: { slug: id === 'index' ? [] : id.split('/') } }));

    return { paths, fallback: false };
};

export const getStaticProps = (ctx: GetStaticPropsContext): GetStaticPropsResult<GettingStartedArticleProps> => {
    const params = toArray(ctx?.params?.slug ?? '');

    return {
        props: {
            content: allGettingStarteds.find(({ _id: id }) => id.endsWith(`${params.join('/')}.mdx`)) as GettingStarted,
        },
    };
};

export default GettingStartedArticle;
