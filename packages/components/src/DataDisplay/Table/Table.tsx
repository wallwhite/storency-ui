import React, { HTMLAttributes } from 'react';
import cx from 'clsx';
import { TableProvider } from './TableContext';

interface Table extends HTMLAttributes<HTMLTableElement> {
    headers?: string[];
    isUnstylized?: boolean;
}

const Table: React.FC<Table> = ({ children, className, headers, isUnstylized, ...props }) => {
    const tableClassNames = cx(className) || undefined;

    return (
        <TableProvider headers={headers} isUnstylized={isUnstylized}>
            <table className={tableClassNames} {...props}>
                {children}
            </table>
        </TableProvider>
    );
};

export default Table;
