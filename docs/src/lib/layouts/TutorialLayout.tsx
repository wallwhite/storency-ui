import React from 'react';
import { SEO, Main } from '@/lib/components';
import { BaseHeader } from '@/features/Header/components';

interface TutorialLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const TutorialLayout: React.FC<TutorialLayoutProps> = ({ title, description, children }) => (
    <>
        <SEO title={title} description={description} />
        <BaseHeader />
        <Main>{children}</Main>
    </>
);

export default TutorialLayout;
