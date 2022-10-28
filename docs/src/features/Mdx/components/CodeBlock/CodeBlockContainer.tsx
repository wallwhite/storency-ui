import React, { PropsWithChildren } from 'react';
import cx from 'clsx';
import type { Language } from 'prism-react-renderer';
import { CopyToClipboardButton } from '@/lib/components';
import CodeLanguage from '@/features/Mdx/components/CodeBlock/CodeLanguage';
import styles from '@/features/Mdx/styles/CodeBlockContainer.module.scss';

interface CodeBlockContainerProps {
    fileName: string;
    language: Language;
    code: string;
    isWrong?: boolean;
}

const CodeBlockContainer: React.FC<PropsWithChildren<CodeBlockContainerProps>> = ({
    fileName,
    language,
    code,
    children,
    isWrong,
}) => {
    // TODO: there is hardcoded tabs, but in future
    // we will add ability to add multiple files tabs
    const tabClassName = cx(styles.tab, styles.active, {
        [styles.wrong]: isWrong,
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <div className={tabClassName}>
                        <span className={styles.fileIcon}>
                            <CodeLanguage language={language} />
                        </span>
                        {fileName}
                    </div>
                </div>
                <div className={styles.controls}>
                    <CopyToClipboardButton text={code} size="s" />
                </div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default CodeBlockContainer;
