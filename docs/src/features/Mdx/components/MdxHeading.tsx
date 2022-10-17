import React from 'react';
import { HashIcon } from '@/lib/components/icons';
import Link from '@/lib/components/navigation/Link';
import Heading, { HeadingProps } from '@/lib/components/dataDisplay/Heading';
import styles from '@/features/Mdx/styles/MdxHeading.module.scss';

const MdxHeading: React.FC<HeadingProps> = ({ id, ...props }) => (
    <div className={styles.wrapper}>
        {id && (
            <Link to={`#${id}`} className={styles.hashLink}>
                <span className={styles.hash}>
                    <HashIcon />
                </span>
            </Link>
        )}
        <Heading id={id} {...props} />
    </div>
);

export default MdxHeading;
