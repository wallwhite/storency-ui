import theme from 'prism-react-renderer/themes/github';
import { PrismTheme } from 'prism-react-renderer';

enum Colors {
    backgroundColor = '#FAFAFB',
    plainColor = '#FFFFFF',
    builtin = '#B7CBD5',
    changed = '#9EDBFC',
}

export const EDITOR_STATIC_THEME: PrismTheme = {
    plain: {
        // ...theme.plain,
        backgroundColor: Colors.backgroundColor,
        color: '#775f94',
    },
    styles: [
        ...theme.styles,
        {
            types: ['atrule'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['attr-name'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['attr-value'],
            style: {
                color: '#EE5DA5',
            },
        },
        {
            types: ['attribute'],
            style: {
                color: '#f6a434',
            },
        },
        {
            types: ['boolean'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['builtin'],
            style: {
                color: '#5497FF',
            },
        },
        {
            types: ['cdata'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['char'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['class'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['class-name', 'maybe-class-name'],
            style: {
                color: '#0064FF',
            },
        },
        {
            types: ['comment'],
            style: {
                color: '#9d9ba5',
            },
        },
        {
            types: ['constant', 'imports'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: '#e53935',
            },
        },
        {
            types: ['doctype'],
            style: {
                color: '#aabfc9',
            },
        },
        {
            types: ['entity'],
            style: {
                color: '#e53935',
            },
        },
        {
            types: ['function'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['hexcode'],
            style: {
                color: '#f76d47',
            },
        },
        {
            types: ['id'],
            style: {
                color: '#7c4dff',
                fontWeight: 'bold',
            },
        },
        {
            types: ['important'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['inserted'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['keyword'],
            style: {
                color: '#40b1ba',
            },
        },
        {
            types: ['number'],
            style: {
                color: '#f76d47',
            },
        },
        {
            types: ['operator'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['prolog'],
            style: {
                color: '#aabfc9',
            },
        },
        {
            types: ['property'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['pseudo-class'],
            style: {
                color: '#f6a434',
            },
        },
        {
            types: ['pseudo-element'],
            style: {
                color: '#f6a434',
            },
        },
        {
            types: ['punctuation'],
            style: {
                color: '#39adb5',
            },
        },
        {
            types: ['regex'],
            style: {
                color: '#6182b8',
            },
        },
        {
            types: ['selector'],
            style: {
                color: '#e53935',
            },
        },
        {
            types: ['string'],
            style: {
                color: '#EE5DA5',
            },
        },
        {
            types: ['symbol'],
            style: {
                color: '#7c4dff',
            },
        },
        {
            types: ['tag'],
            style: {
                color: '#0083B5',
            },
        },
        {
            types: ['unit'],
            style: {
                color: '#f76d47',
            },
        },
        {
            types: ['url'],
            style: {
                color: '#e53935',
            },
        },
        {
            types: ['variable'],
            style: {
                color: '#e53935',
            },
        },
        {
            types: ['attr-name'],
            style: {
                color: '#8B5CF6',
            },
        },
        // {
        //     types: ['changed', 'control-flow', 'module', 'interpolation-punctuation'],
        //     style: {
        //         color: Colors.changed,
        //     },
        // },
        // {
        //     types: ['builtin'],
        //     style: {
        //         color: Colors.builtin,
        //     },
        // },
        // {
        //     types: ['keyword'],
        //     style: {
        //         color: '#BE94E6',
        //     },
        // },
        // {
        //     types: ['plain'],
        //     style: {
        //         color: '#BE94E6',
        //     },
        // },
        {
            types: ['script', 'language-javascript'],
            style: {
                color: '#EE5DA5',
            },
        },
        // {
        //     types: ['constant', 'spread'],
        //     style: {
        //         color: '#EDFAFB',
        //     },
        // },
        {
            types: ['variable'],
            style: {
                color: '#FB923C',
            },
        },
        // {
        //     types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
        //     style: {
        //         color: '#CBE795',
        //     },
        // },

        // {
        //     types: ['selector'],
        //     style: {
        //         color: '#8BA8FA',
        //     },
        // },
        // {
        //     types: ['tag'],
        //     style: {
        //         color: '#DC787A',
        //     },
        // },
        // {
        //     types: ['tag'],
        //     languages: ['markup'],
        //     style: {
        //         color: '#F6CD77',
        //     },
        // },
        // {
        //     types: ['punctuation', 'operator'],
        //     style: {
        //         color: '#9EDBFC',
        //     },
        // },
        // {
        //     types: ['punctuation'],
        //     languages: ['markup'],
        //     style: {
        //         color: '#808080',
        //     },
        // },
        // {
        //     types: ['literal-property', 'property'],
        //     style: {
        //         color: '#8BA8FA',
        //     },
        // },
        // {
        //     types: ['maybe-class-name'],
        //     style: {
        //         color: '#F6CD77',
        //     },
        // },
        // {
        //     types: ['function'],
        //     style: {
        //         color: '#8BA8FA',
        //     },
        // },
        // {
        //     types: ['class-name'],
        //     style: {
        //         color: '#F6CD77',
        //     },
        // },
        // {
        //     types: ['imports'],
        //     style: {
        //         color: '#44444F',
        //     },
        // },
    ],
};
