/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { allDocs } from 'contentlayer/generated';
import { RehypeData } from '@/lib/types';
import { MixedArray, toArray, uniq } from './arrayUtils';

export const getDocByType = (id: string): any[] =>
    allDocs.filter((doc: { slug: string }) => doc.slug.startsWith(`/docs/${id}`));

const toCapitalized = (str: string): string => {
    const result = str.charAt(0).toUpperCase() + str.slice(1);
    return result.replace(/-/g, ' ');
};

interface GroupedComponents {
    [key: string]: any[];
}

export const getGroupedComponents = (): GroupedComponents =>
    getDocByType('components').reduce((acc: GroupedComponents, doc: { category: any }) => {
        const { category } = doc;
        if (!category) return acc;
        acc[toCapitalized(category)] ??= [];
        acc[toCapitalized(category)].push(doc);
        return acc;
    }, {} as GroupedComponents);

const getUsageDoc = (id: string): Maybe<RehypeData> =>
    (allDocs as unknown as RehypeData[]).find((_doc): boolean => _doc.id === id && _doc.scope === 'usage');

export const getDocDoc = (slug: MixedArray): Maybe<RehypeData> => {
    const params = toArray(slug);
    const _slug = params.join('/');
    const doc = allDocs.find(
        (_doc: { slug: string }): boolean => _doc.slug.endsWith(_slug) || _doc.slug.endsWith(`${_slug}/usage`),
    ) as Maybe<RehypeData>;

    if (!doc) return null;

    // the presence of scope, means its a component documentation
    if (doc.scope && doc.scope !== 'usage') {
        doc.frontMatter = {
            ...doc.frontMatter,
            ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
        };
    }

    return doc;
};

interface ComponentTabs {
    id: string;
    match: boolean;
    href: {
        query: {
            slug: string[];
        };
    };
    label: string;
    doc: any;
}

export const getComponentTabsData = (slug: MixedArray): ComponentTabs[] => {
    const params = toArray(slug);
    const _slug = params.join('/');

    const getSlug = (id: string): string[] => {
        const res = uniq([...params, id]);
        if (res.length > 3) res.splice(2, 1);
        return res;
    };

    const usageSlug = getSlug('usage');
    const propsSlug = getSlug('api');
    const themingSlug = getSlug('other');

    const data = [
        {
            id: 'usage',
            match: _slug.endsWith('/usage') || params.length === 2,
            href: { query: { slug: usageSlug.slice(1) } },
            label: 'Usage',
            doc: getDocDoc(getSlug('usage')),
        },
        {
            id: 'api',
            match: _slug.endsWith('/api'),
            href: { query: { slug: propsSlug.slice(1) } },
            label: 'API',
            doc: getDocDoc(getSlug('api')),
        },
        {
            id: 'other',
            match: _slug.endsWith('/other'),
            label: 'Other',
            href: { query: { slug: themingSlug.slice(1) } },
            doc: getDocDoc(getSlug('other')),
        },
    ];
    return (data as ComponentTabs[]).filter((item) => Boolean(item?.doc));
};
