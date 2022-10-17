export interface AlgoliaConfig {
    apiKey: string;
    indexName: string;
    inputSelector: string;
}

export interface RepoConfig {
    url: string;
    blobUrl: string;
}

export interface ImageConfigItem {
    alt: string;
    url: string;
    height: number;
    width: number;
}

export interface OpenGraphConfig {
    description: string;
}

export interface SeoConfig {
    description: string;
    images: ImageConfigItem[];
    locale: string;
    site_name: string;
    title: string;
    type: string;
    url: string;
}

export interface SiteConfig {
    algolia: AlgoliaConfig;
    author: ObjectLiteral;
    copyright: string;
    repo: RepoConfig;
    seo: SeoConfig;
}
