import React from 'react';
import { useRouter } from 'next/router';
import cx from 'clsx';
import { Link } from '@/lib/components';
import { NavigationElement } from '@/features/Navigation/types';
import styles from '@/features/Navigation/styles/SidebarMenuItem.module.scss';

interface SidebarMenuItemProps {
    element: NavigationElement;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ element: { title, path } }) => {
    const { asPath } = useRouter();

    const isActiveItem = asPath.includes(path);
    const menuItemClassName = cx(styles.menuItem, {
        [styles.active]: isActiveItem,
    });

    return (
        <Link to={path} className={menuItemClassName}>
            {title}
        </Link>
    );
};

export default SidebarMenuItem;
