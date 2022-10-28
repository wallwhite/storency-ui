import React, { useEffect, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { Language } from 'prism-react-renderer';
import { useToggleBoolean } from '@storency-ui/hooks';
import CodeStatic from '@/features/Mdx/components/CodeBlock/CodeStatic';
import CodeBlockContainer from '@/features/Mdx/components/CodeBlock/CodeBlockContainer';
import { EDITOR_STATIC_THEME } from '@/features/Mdx/constants';

const CodeLiveBlock = dynamic(() => import('../CodeLive'));
const DEFAULT_FILE_NAME = 'example';

interface ChildCodeProps {
    className?: string;
    live?: boolean | string;
    manual?: boolean;
    readOnly?: string;
    viewlines?: boolean;
    ln?: string;
    fileName?: string;
    mountStylesheet?: boolean;
    children: string;
}

interface CodeBlockProps {
    children?: ReactElement<ChildCodeProps>;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    const [isMounted, { on }] = useToggleBoolean();
    const {
        fileName: fileNameRaw,
        className,
        live = false,
        manual,
        readOnly,
        children: codeChildren = '',
        viewlines,
        ln,
        mountStylesheet = false,
    } = children?.props ?? {};

    const rawCode = codeChildren.trim();
    const language = (className?.replace(/language-/, '') ?? 'clike') as Language;
    const fileName = fileNameRaw || `${DEFAULT_FILE_NAME}.${language}`;

    // Lazily-load CodeLiveBlock to reduce initial bundle size
    useEffect(on, []);

    const reactLiveBlockProps = {
        code: rawCode,
        language,
        fileName,
        theme: EDITOR_STATIC_THEME,
        noInline: manual,
        mountStylesheet,
    };

    if (isMounted && readOnly === 'true') {
        return <CodeLiveBlock readonly {...reactLiveBlockProps} />;
    }

    if (isMounted && language === 'jsx' && live === 'true') {
        return <CodeLiveBlock {...reactLiveBlockProps} />;
    }

    return (
        <CodeBlockContainer language={language} fileName={fileName} code={rawCode}>
            <CodeStatic
                code={rawCode}
                language={language}
                theme={EDITOR_STATIC_THEME}
                meta={ln}
                showLines={viewlines}
            />
        </CodeBlockContainer>
    );
};

export default CodeBlock;
