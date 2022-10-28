import React, { useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import { Language, PrismTheme } from 'prism-react-renderer';
import CodeLiveEditor from '@/features/Mdx/components/CodeLive/CodeLiveEditor';
import CodeLiveError from '@/features/Mdx/components/CodeLive/CodeLiveError';
import { LIVE_EDITOR_SCOPE } from '@/features/Mdx/constants';
import styles from '@/features/Mdx/styles/CodeLive.module.scss';

interface CodeLiveProps {
    code: string;
    fileName: string;
    language: Language;
    theme: PrismTheme;
    noInline?: boolean;
    mountStylesheet?: boolean;
    readonly?: boolean;
}

const CodeLive: React.FC<CodeLiveProps> = ({ fileName, code: rawCode, language, readonly, ...rest }) => {
    const code = rawCode.trim().replace('// prettier-ignore', '');
    const [editorCode, setEditorCode] = useState(code.trim());
    const onChange = (newCode: string): void => setEditorCode(newCode.trim());

    const liveProviderProps = {
        code: editorCode,
        scope: LIVE_EDITOR_SCOPE,
        ...rest,
    };

    return (
        <LiveProvider language={language} {...liveProviderProps}>
            <div className={styles.header}>
                <span className={styles.pulse}>
                    <span className={styles.pulseDot} />
                </span>
                Live preview
            </div>
            <div className={styles.preview}>
                <div className={styles.previewCard}>
                    <LivePreview />
                </div>
            </div>
            <CodeLiveEditor
                fileName={fileName}
                language={language}
                onChange={onChange}
                code={editorCode}
                readonly={readonly}
            />
            <CodeLiveError />
        </LiveProvider>
    );
};

export default CodeLive;
