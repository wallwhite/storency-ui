import React from 'react';
import { SEO, Main } from '@/lib/components';
import { BaseHeader } from '@/features/Header/components';

interface BlogLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ title, description, children }) => (
    <>
        <SEO title={title} description={description} />
        <BaseHeader />
        <Main>{children}</Main>
    </>
);

export default BlogLayout;
