import React from 'react';
import cx from 'clsx';
import BaseHighlight, { Language, PrismTheme, defaultProps } from 'prism-react-renderer';
import { EDITOR_LIVE_STYLES } from '@/features/Mdx/constants';
import { calculateLinesToHighlight } from '@/features/Mdx/utils';
import styles from '@/features/Mdx/styles/CodeStatic.module.scss';

const SYMBOL_SIZE = 14;

interface CodeStaticProps {
    code: string;
    language: Language;
    theme: PrismTheme;
    meta?: string;
    showLines?: boolean;
}

const CodeStatic: React.FC<CodeStaticProps> = ({ code, language, meta, showLines, ...props }) => {
    const shouldHighlightLine = calculateLinesToHighlight(meta);

    return (
        <BaseHighlight {...defaultProps} code={code} language={language} {...props}>
            {({ className, style, tokens, getLineProps, getTokenProps }): JSX.Element => {
                const maxLineSymbolLength = tokens.length.toString().length;
                const lineNumbersIdent = showLines ? SYMBOL_SIZE * maxLineSymbolLength : 0;

                return (
                    <div style={EDITOR_LIVE_STYLES} data-language={language}>
                        <pre className={className} style={style}>
                            {tokens.map((line, index) => {
                                const { className: lineClassName, lineProps } = getLineProps({ line, key: index });
                                const lineNumberClassNames = cx(styles.lineNumber, {
                                    [styles.highlighted]: shouldHighlightLine(index),
                                });
                                const lineClassNames = cx(styles.line, lineClassName, {
                                    [styles.highlighted]: shouldHighlightLine(index),
                                });

                                return (
                                    <div
                                        key={`line-${index.toString()}`}
                                        className={lineClassNames}
                                        style={{ paddingLeft: `${lineNumbersIdent + 16}px` }}
                                        {...lineProps}
                                    >
                                        {showLines && (
                                            <span
                                                className={lineNumberClassNames}
                                                style={{ minWidth: `${lineNumbersIdent}px` }}
                                            >
                                                {index + 1}
                                            </span>
                                        )}
                                        {line.map((token, key) => (
                                            <span key={`key-${key.toString()}`} {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                );
            }}
        </BaseHighlight>
    );
};

export default CodeStatic;
