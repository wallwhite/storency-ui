import React, { ReactElement } from 'react';
import cx from 'clsx';
import { Table, Thead, Tbody, Th, Tr, Td } from '@storency-ui/components';
import { Text, CheckMarkIcon, CrossIcon } from '@/lib/components';
import MdxHeading from '@/features/Mdx/components/MdxHeading';
import CodeBlock from '@/features/Mdx/components/CodeBlock';
import styles from '@/features/Mdx/styles/Mdx.module.scss';

const MDXComponents = {
    h1: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h1" {...props} />,
    h2: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h2" {...props} />,
    h3: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h3" {...props} />,
    h4: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h4" {...props} />,
    hr: (props: ObjectLiteral): JSX.Element => <hr {...props} />,
    br: (props: ObjectLiteral): JSX.Element => <br {...props} />,
    blockquote: (props: ObjectLiteral): JSX.Element => <blockquote className={styles.mdxBlockquote} {...props} />,
    strong: (props: ObjectLiteral): JSX.Element => <Text as="strong" {...props} />,
    code: (props: ObjectLiteral): JSX.Element => <span className={styles.mdxInlineCode} {...props} />,
    pre: (props: ObjectLiteral): JSX.Element => {
        if (typeof props.children === 'string') return <div className={styles.mdxPre} {...props} />;
        return <CodeBlock {...props} />;
    },
    kbd: (): JSX.Element => <>kbd TODO!</>,
    table: (props: ObjectLiteral): JSX.Element => <Table className={styles.mdxTable} {...props} />,
    thead: (props: ObjectLiteral & Record<'children', ReactElement>): JSX.Element => (
        <Thead className={styles.mdxTableHead} {...props} />
    ),
    tbody: (props: ObjectLiteral): JSX.Element => <Tbody className={styles.mdxTableBody} {...props} />,
    th: (props: ObjectLiteral): JSX.Element => <Th className={styles.mdxTableHeadCell} {...props} />,
    tr: (props: ObjectLiteral & Record<'children', ReactElement[]>): JSX.Element => (
        <Tr className={styles.mdxTableRow} {...props} />
    ),
    td: (props: ObjectLiteral & Record<'children', ReactElement>): JSX.Element => (
        <Td
            className={styles.mdxTableCell}
            contentClassName={styles.content}
            titleClassName={styles.title}
            {...props}
        />
    ),
    p: ({ className, ...props }: ObjectLiteral): JSX.Element => (
        <Text className={cx(className, styles.mdxP)} {...props} />
    ),
    ul: ({ className, ...props }: ObjectLiteral): JSX.Element => (
        <ul className={cx(className, styles.mdxList)} {...props} />
    ),
    ol: (props: ObjectLiteral): JSX.Element => <ol {...props} />,
    li: ({ className, ...props }: ObjectLiteral): JSX.Element => (
        <li className={cx(className, styles.mdxListItem)} {...props} />
    ),
    a: (props: ObjectLiteral): JSX.Element => <a className={styles.mdxLink} {...props} />,
    input: (props: ObjectLiteral): JSX.Element => {
        const { type, checked = false } = props;

        if (type !== 'checkbox') return <input {...props} />;

        const markClassName = cx(styles.mdxCheckboxMark, {
            [styles.checked]: props.checked,
            [styles.unchecked]: !props.checked,
        });

        return <span className={markClassName}>{checked ? <CheckMarkIcon /> : <CrossIcon />}</span>;
    },
};

export default MDXComponents;
