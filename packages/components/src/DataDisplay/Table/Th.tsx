import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'clsx';

type ThProps = HTMLAttributes<HTMLTableCellElement>;

const Th: FC<PropsWithChildren<ThProps>> = ({ className, ...props }) => {
    const tableHeadCellClassNames = cx(className) || undefined;

    return <th className={tableHeadCellClassNames} {...props} />;
};

export default Th;
