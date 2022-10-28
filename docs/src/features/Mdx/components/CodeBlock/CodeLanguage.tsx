import React from 'react';
import { Language } from 'prism-react-renderer';
import {
    LnBashIcon,
    LnCodeIcon,
    LnCssIcon,
    LnHtmlIcon,
    LnJavascriptIcon,
    LnJsonIcon,
    LnReactIcon,
    LnSassIcon,
    LnTypescriptIcon,
    LnGraphQlIcon,
} from '@/lib/components/icons';

interface CodeLanguageProps {
    language: Language;
}

const CodeLanguage: React.FC<CodeLanguageProps> = ({ language }) => {
    switch (language) {
        case 'bash':
            return <LnBashIcon />;
        case 'css':
            return <LnCssIcon />;
        case 'markup':
            return <LnHtmlIcon />;
        case 'javascript':
            return <LnJavascriptIcon />;
        case 'json':
        case 'yaml':
            return <LnJsonIcon />;
        case 'jsx':
        case 'tsx':
            return <LnReactIcon />;
        case 'graphql':
            return <LnGraphQlIcon />;
        case 'typescript':
            return <LnTypescriptIcon />;
        case 'scss':
        case 'sass':
            return <LnSassIcon />;
        default:
            return <LnCodeIcon />;
    }
};

export default CodeLanguage;
