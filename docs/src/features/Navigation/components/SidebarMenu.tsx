import React, { Fragment } from 'react';
import { Heading } from '@/lib/components';
import { NavigationSubCategoryElement, NavigationElement } from '@/features/Navigation/types';
import SidebarMenuItem from '@/features/Navigation/components/SidebarMenuItem';
import styles from '@/features/Navigation/styles/SidebarMenu.module.scss';

interface SidebarMenuProps {
    elements: Array<NavigationSubCategoryElement | NavigationElement>;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ elements }) => {
    const renderMenu = (menuItems: Array<NavigationSubCategoryElement | NavigationElement>): React.ReactNode => (
        <>
            {menuItems.map((menuItem, index) => {
                if (menuItem.type === 'element')
                    return (
                        <SidebarMenuItem key={`menu-element-${menuItem.path}-${index.toString()}`} element={menuItem} />
                    );

                return (
                    <Fragment key={`menu-element-${menuItem.title}-${index.toString()}`}>
                        <Heading variant="h5" className={styles.menuCategory}>
                            {menuItem.title}
                        </Heading>
                        {Boolean(menuItem.children.length) && renderMenu(menuItem.children)}
                    </Fragment>
                );
            })}
        </>
    );

    return <div className={styles.menu}>{renderMenu(elements)}</div>;
};

export default SidebarMenu;
