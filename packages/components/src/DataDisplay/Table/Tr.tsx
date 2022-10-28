import React, { Component, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { withTableContext, TableContextValue } from './TableContext';

export interface TrProps extends HTMLAttributes<HTMLTableRowElement>, ObjectLiteral {
    children: ReactElement[];
    isHeader?: boolean;
}

const findChildrenContent = (element: ReactElement): string => {
    if (element?.props?.children) {
        if (typeof element.props.children === 'string') return element.props.children;

        return findChildrenContent(element.props.children);
    }
    return '';
};

class Tr extends Component<TrProps & Partial<TableContextValue>> {
    constructor(props: TrProps & TableContextValue) {
        super(props);

        const { isHeader, children, headers } = this.props;

        if (!isHeader || !headers) return;
        if (headers.length === children.length) return;

        children.forEach((child, i) => {
            headers[i] = findChildrenContent(child);
        });
    }

    renderChildren = (): ReactNode => {
        const { children, isHeader } = this.props;
        if (!children.length) return null;
        if (isHeader) return children;

        return children.map((child, index) =>
            React.cloneElement(child, { key: `head-${index.toString()}`, headerKey: index, ...child?.props }),
        );
    };

    render(): ReactNode {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { headers, isUnstylized, isHeader, ...props } = this.props;

        return <tr {...props}>{this.renderChildren()}</tr>;
    }
}

export default withTableContext<TrProps>(Tr as React.ComponentType<TrProps & Partial<TableContextValue>>);
