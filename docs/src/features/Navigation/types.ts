export interface NavigationBaseElement {
    title: string;
}

export interface NavigationElement extends NavigationBaseElement {
    type: 'element';
    path: string;
    tag?: string;
}

export interface NavigationSubCategoryElement extends NavigationBaseElement {
    type: 'subCategory';
    sort: boolean;
    children: NavigationElement[];
}

export interface NavigationCategory extends NavigationBaseElement {
    type: 'category';
    path: string;
    icon: string;
    image?: string;
    description?: string;
    color?: 'blue' | 'brightBlue' | 'red' | 'green' | 'yellow' | 'orange' | 'purple';
    children: Array<NavigationSubCategoryElement | NavigationElement>;
}

export type NavigationConfig = NavigationCategory[];
