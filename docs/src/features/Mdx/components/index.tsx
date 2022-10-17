import React from 'react';
import cx from 'clsx';
import { Text } from '@/lib/components';
import MdxHeading from '@/features/Mdx/components/MdxHeading';
import styles from '@/features/Mdx/styles/Mdx.module.scss';

export const MDXComponents = {
    h1: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h1" apply="mdx.h1" {...props} />,
    h2: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h2" apply="mdx.h2" {...props} />,
    h3: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h3" apply="mdx.h3" {...props} />,
    h4: (props: ObjectLiteral): JSX.Element => <MdxHeading variant="h4" apply="mdx.h4" {...props} />,
    hr: (props: ObjectLiteral): JSX.Element => <hr {...props} />,
    br: (props: ObjectLiteral): JSX.Element => <br {...props} />,
    strong: (props: ObjectLiteral): JSX.Element => <Text as="strong" {...props} />,
    code: (props: ObjectLiteral): JSX.Element => <span className={styles.mdx_inlineCode} {...props} />,
    pre: (): JSX.Element => <>pre TODO!</>,
    kbd: (): JSX.Element => <>kbd TODO!</>,
    table: (): JSX.Element => <>table TODO!</>,
    p: ({ className = '', ...props }: ObjectLiteral): JSX.Element => (
        <Text className={cx(className, styles.mdx_p)} {...props} />
    ),
    ul: ({ className = '', ...props }: ObjectLiteral): JSX.Element => (
        <ul className={cx(className, styles.mdx_list)} {...props} />
    ),
    ol: (props: ObjectLiteral): JSX.Element => <ol {...props} />,
    li: ({ className, ...props }: ObjectLiteral): JSX.Element => (
        <li className={cx(className, styles.mdx_listItem)} {...props} />
    ),
};
