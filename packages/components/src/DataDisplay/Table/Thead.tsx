import React, { ReactElement, HTMLAttributes } from 'react';

export interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactElement<ObjectLiteral>;
}

const Thead: React.FC<TheadProps> = ({ children, ...props }) => (
    <thead {...props}>{React.cloneElement(children, { isHeader: true, ...children?.props })}</thead>
);

export default Thead;
