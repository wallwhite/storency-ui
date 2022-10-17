import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';
import siteConfig from '@/configs/site-config.json';

type SEOProps = Pick<NextSeoProps, 'title' | 'description'>;

const SEO: React.FC<SEOProps> = ({ title, description }) => (
    <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
        titleTemplate={siteConfig.seo.titleTemplate}
    />
);

export default SEO;
