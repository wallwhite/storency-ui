/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import { ComputedFields, defineDocumentType, makeSource } from '@contentlayer/source-files';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import siteConfig from './configs/site-config.json';
import { getTableOfContents, rehypeMdxCodeMeta } from './src/lib/utils';

const computedFields: ComputedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
};

const Guides = defineDocumentType(() => ({
    name: 'Guide',
    filePathPattern: 'guides/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        tags: { type: 'list', of: { type: 'string' } },
        author: { type: 'string' },
        category: { type: 'string' },
    },
    computedFields: {
        ...computedFields,
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                description: doc.description,
                tags: doc.tags,
                author: doc.author,
                slug: `/${doc._raw.flattenedPath}`,
                headings: getTableOfContents(doc.body.raw),
                siteConfig,
            }),
        },
    },
}));

const Blogs = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/*.mdx',
    contentType: 'mdx',
    fields: {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        author: { type: 'string' },
        publishedDate: { type: 'string' },
    },
    computedFields: {
        ...computedFields,
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                publishedDate: {
                    raw: doc.publishedDate,
                    iso: new Date(doc?.publishedDate ?? '').toISOString(),
                    text: new Date(doc?.publishedDate ?? '').toDateString(),
                },
                author: doc.author,
                title: doc.title,
                description: doc.description,
                slug: `/${doc._raw.flattenedPath}`,
                siteConfig,
            }),
        },
    },
}));

const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: 'docs/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string' },
        path: { type: 'string' },
        description: { type: 'string' },
        id: { type: 'string' },
        scope: {
            type: 'enum',
            options: ['usage', 'other', 'api'],
            default: 'usage',
        },
        version: { type: 'string' },
        author: { type: 'string' },
        video: { type: 'string' },
        category: { type: 'string' },
        aria: { type: 'string' },
        showSource: { type: 'boolean' },
    },
    computedFields: {
        ...computedFields,
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                path: doc.path,
                description: doc.description,
                version: doc.version,
                slug: `/${doc._raw.flattenedPath}`,
                headings: getTableOfContents(doc.body.raw),
                showSource: doc.showSource,
                siteConfig,
            }),
        },
    },
}));

const Recipe = defineDocumentType(() => ({
    name: 'Recipe',
    filePathPattern: 'recipes/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        tags: { type: 'list', of: { type: 'string' } },
        author: { type: 'string' },
    },
    computedFields: {
        ...computedFields,
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                description: doc.description,
                tags: doc.tags,
                author: doc.author,
                slug: `/community/${doc._raw.flattenedPath}`,
                headings: getTableOfContents(doc.body.raw),
                siteConfig,
            }),
        },
    },
}));

const Tutorial = defineDocumentType(() => ({
    name: 'Tutorial',
    filePathPattern: 'tutorial/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
    },
    computedFields: {
        ...computedFields,
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                description: doc.description,
                slug: `/${doc._raw.flattenedPath}`,
                headings: getTableOfContents(doc.body.raw),
                siteConfig,
            }),
        },
    },
}));

const Changelog = defineDocumentType(() => ({
    name: 'Changelog',
    filePathPattern: 'changelog/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        slug: { type: 'string' },
    },
    computedFields: {
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                description: doc.description,
                slug: '/changelog',
            }),
        },
    },
}));

const GettingStarted = defineDocumentType(() => ({
    name: 'GettingStarted',
    filePathPattern: 'getting-started/*.mdx',
    contentType: 'mdx',
    fields: {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        slug: { type: 'string' },
    },
    computedFields: {
        frontMatter: {
            type: 'json',
            resolve: (doc) => ({
                title: doc.title,
                description: doc.description,
                slug: '/getting-started',
            }),
        },
    },
}));

const contentLayerConfig = makeSource({
    contentDirPath: 'content',
    documentTypes: [Doc, Guides, Recipe, Changelog, Blogs, Tutorial, GettingStarted],
    contentDirExclude: ['docs/*.mdx', '*.mdx', '**/*.ts'],
    disableImportAliasWarning: true,
    mdx: {
        rehypePlugins: [rehypeMdxCodeMeta],
        remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
    },
});

export default contentLayerConfig;
