/* eslint-disable @typescript-eslint/explicit-function-return-type */
import slugger from 'github-slugger';

const getTableOfContents = (mdxContent: string) => {
    const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm');
    // @ts-ignore
    const headings = [...mdxContent.matchAll(regexp)];
    // @ts-ignore
    let tableOfContents = [];

    if (headings.length) {
        tableOfContents = headings.map((heading) => {
            const headingText = heading[2].trim();
            const headingType = heading[1].trim() === '##' ? 'h2' : 'h3';
            const headingLink = slugger.slug(headingText, false);

            return {
                text: headingText,
                id: headingLink,
                level: headingType,
            };
        });
    }
    // @ts-ignore
    return tableOfContents;
};

export default getTableOfContents;
