import { SiteConfig } from './configTypes';

export interface RehypeBody {
    code: string;
    raw: string;
}

export interface RehypeRaw {
    contentType: string;
    flattenedPath: string;
    sourceFileDir: string;
    sourceFileName: string;
    sourceFilePath: string;
}

export interface RehypeHeading {
    id: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
}

export interface RehypeFrontMatter {
    description?: string;
    headings: RehypeHeading[];
    path?: string;
    slug?: string;
    title?: string;
    siteConfig: SiteConfig;
}

export interface RehypeData {
    _id: string;
    _raw: RehypeRaw;
    id: string;
    type: string;
    title: string;
    description: string;
    category: string;
    scope: string;
    package: string;
    body: RehypeBody;
    frontMatter: RehypeFrontMatter;
}
