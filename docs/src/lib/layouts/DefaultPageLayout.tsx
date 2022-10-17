import React from 'react';
import { SEO, Main } from '@/lib/components';
import { BaseHeader } from '@/features/Header/components';
import { Footer } from '@/features/Footer/components';

interface DefaultPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

const DefaultPageLayout: React.FC<DefaultPageLayoutProps> = ({ title, description, className, children }) => (
    <>
        <SEO title={title} description={description} />
        <BaseHeader />
        <Main className={className}>{children}</Main>
        <Footer />
    </>
);

export default DefaultPageLayout;
