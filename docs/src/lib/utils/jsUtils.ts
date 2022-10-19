export type MixedArray = string | Array<string | string[]>;

export const toArray = (slug: MixedArray): string[] => {
    const res = Array.isArray(slug) ? slug.flat() : [slug];
    return res.filter(Boolean);
};

export const uniq = <T>(c: T[]): T[] => [...new Set(c)];

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
