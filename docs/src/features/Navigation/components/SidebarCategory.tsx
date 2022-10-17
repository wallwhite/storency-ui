import React from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import { CustomPlaceholder } from 'react-placeholder-image';
import { Link } from '@/lib/components';
import * as icons from '@/lib/components/icons';
import { NavigationCategory } from '@/features/Navigation/types';
import styles from '@/features/Navigation/styles/SidebarCategory.module.scss';

interface SidebarCategoryProps {
    category: NavigationCategory;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ category: { path, icon, title, color } }) => {
    const { pathname } = useRouter();

    const IconComponent = icons?.[icon as keyof typeof icons];
    const isActiveCategory = pathname.includes(path);
    const iconClassName = cx(styles.icon, {
        [styles?.[`icon-color-${color}`]]: color,
    });
    const categoryClassName = cx(styles.category, {
        [styles?.active]: isActiveCategory,
    });

    return (
        <Link to={path} className={categoryClassName}>
            <span className={iconClassName}>
                <span className={styles.iconContent}>
                    {IconComponent ? <IconComponent /> : <CustomPlaceholder width={20} height={20} text="Icon" />}
                </span>
            </span>
            <span className={styles.title}>{title}</span>
        </Link>
    );
};

export default SidebarCategory;
