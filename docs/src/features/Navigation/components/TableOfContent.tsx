import React from 'react';
import cx from 'clsx';
import { Heading, Link, ArrowRightIcon } from '@/lib/components';
import { RehypeHeading } from '@/lib/types';
import { useScrollSpy } from '@/lib/hooks';
import styles from '@/features/Navigation/styles/TableOfContent.module.scss';

interface TableOfContentProps {
    toc: RehypeHeading[];
}

const TableOfContent: React.FC<TableOfContentProps> = ({ toc }) => {
    const { activeId } = useScrollSpy({
        selectors: toc.map(({ id }) => `[id="${id}"]`),
        options: {
            rootMargin: '0% 0% -24% 0%',
            threshold: 0.5,
        },
    });

    return (
        <nav className={styles.toc}>
            <Heading variant="h5" className={styles.title}>
                On this page
            </Heading>
            <ol className={styles.orderedList}>
                {toc.map(({ id, text, level }) => {
                    const isNested = level !== 'h2';
                    const isActive = id === activeId;

                    const linkClassName = cx(styles.link, {
                        [styles.active]: isActive,
                    });

                    return (
                        <li key={id} className={styles.listItem}>
                            {isNested && (
                                <span className={styles.nestedIcon}>
                                    <ArrowRightIcon />
                                </span>
                            )}
                            <Link to={`#${id}`} className={linkClassName}>
                                {text}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default TableOfContent;
