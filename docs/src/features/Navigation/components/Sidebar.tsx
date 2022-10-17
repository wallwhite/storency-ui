import React, { useMemo } from 'react';
import cx from 'clsx';
import { useRouter } from 'next/router';
import { NavigationConfig } from '@/features/Navigation/types';
import SidebarCategory from '@/features/Navigation/components/SidebarCategory';
import SidebarMenu from '@/features/Navigation/components/SidebarMenu';
import styles from '@/features/Navigation/styles/Sidebar.module.scss';

interface SidebarProps {
    config: NavigationConfig;
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ config, className }) => {
    const { pathname } = useRouter();
    const sidebarClassName = cx(styles.sidebar, className);

    const menuItems = useMemo(
        () => config.find(({ path }) => pathname.includes(path))?.children ?? [],
        [pathname, config],
    );

    return (
        <nav className={sidebarClassName}>
            <ul className={styles.categories}>
                {config.map((item, index) => {
                    if (item.type !== 'category') return null;

                    return <SidebarCategory key={`category-${item.path}-${index.toString()}`} category={item} />;
                })}
            </ul>
            {Boolean(menuItems.length) && <SidebarMenu elements={menuItems} />}
        </nav>
    );
};

export default Sidebar;
