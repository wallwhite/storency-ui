/* eslint-disable no-underscore-dangle */
import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allBlogs } from 'contentlayer/generated';
import { MDXComponents } from '@/features/Mdx/components';
import { RehypeData } from '@/lib/types';
import { DocsEntityLayout } from '@/lib/layouts';

const DocsPage: NextPage<Record<'doc', RehypeData>> = ({
    doc: { title = '', description = '', frontMatter, body },
}) => {
    const Component = useMDXComponent(body?.code);

    return (
        <DocsEntityLayout title={title} description={description} frontMatter={frontMatter} toc={frontMatter.headings}>
            <Component components={MDXComponents} />
        </DocsEntityLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const blogs = allBlogs
        .map((t: ObjectLiteral) => t._id.replace('blog/', '').replace('.mdx', '').replace('index', ''))
        .map((id: string) => ({ params: { slug: [id.replace('blog/', '')] } }));

    return { paths: blogs, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
    const params = Array.isArray(ctx?.params?.slug) ? ctx?.params?.slug : [ctx?.params?.slug];
    const blog = allBlogs.find((blogItem: ObjectLiteral) => blogItem._id.includes(params?.join?.('/')));
    return {
        props: { doc: blog },
    };
};

export default DocsPage;
