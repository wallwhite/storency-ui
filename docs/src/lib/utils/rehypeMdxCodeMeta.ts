/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const rehypeMdxCodeMeta: Plugin = () => (tree) => {
    visit(tree, 'element', (node: any) => {
        const nodeDoesNotHaveContent = !node.data;

        if (node.tagName !== 'code' || nodeDoesNotHaveContent) return;
        node.properties = node.properties || {};
        node.data.meta.split(' ').forEach((t: { split: (arg0: string) => [any, any] }) => {
            const [key, value] = t.split('=');
            node.properties[key] = value;
        });
    });
};

export default rehypeMdxCodeMeta;
