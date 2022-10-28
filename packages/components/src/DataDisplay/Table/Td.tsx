import React, { HTMLAttributes, FC, PropsWithChildren } from 'react';
import { useTableContext } from './TableContext';

interface TdProps extends HTMLAttributes<HTMLTableCellElement> {
    headerKey?: number;
    contentClassName?: string;
    titleClassName?: string;
}

const Td: FC<PropsWithChildren<TdProps>> = ({
    children,
    headerKey = '',
    titleClassName = '',
    contentClassName = '',
    ...props
}) => {
    const { headers } = useTableContext();

    const isValidHeaderKey = typeof headerKey === 'number' && headerKey >= 0;
    const headerValue = isValidHeaderKey ? headers[headerKey] : '';

    return (
        <td {...props}>
            {headerValue && <div className={titleClassName}>{headerValue}</div>}
            <div className={contentClassName}>{children}</div>
        </td>
    );
};

export default Td;
