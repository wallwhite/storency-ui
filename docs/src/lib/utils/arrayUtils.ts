export type MixedArray = string | Array<string | string[]>;

export const toArray = (slug: MixedArray): Array<string | string[]> => {
    const res = Array.isArray(slug) ? slug.flat() : [slug];
    return res.filter(Boolean);
};
// @ts-ignore
export const uniq = <T>(c: T[]): Array<string> => [...new Set(c)];
