import React, { useContext } from 'react';
import { LiveEditor, LiveContext } from 'react-live';
import { Language } from 'prism-react-renderer';
import CodeBlockContainer from '@/features/Mdx/components/CodeBlock/CodeBlockContainer';
import { EDITOR_LIVE_STYLES } from '@/features/Mdx/constants';

interface CodeLiveEditorProps {
    language: Language;
    fileName: string;
    code: string;
    readonly?: boolean;
    onChange: (code: string) => void;
}

const CodeLiveEditor: React.FC<CodeLiveEditorProps> = ({ language, fileName, code, readonly, onChange }) => {
    const { error } = useContext(LiveContext);
    const isWrong = Boolean(error);

    return (
        <CodeBlockContainer fileName={fileName} language={language} code={code} isWrong={isWrong}>
            <LiveEditor onChange={onChange} style={EDITOR_LIVE_STYLES} readOnly={readonly} disabled={readonly} />
        </CodeBlockContainer>
    );
};

export default CodeLiveEditor;
