import React, { HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
    children?: React.ReactNode;
    className?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    title?: string;
    style?: React.CSSProperties;
    apply?: string;
}

const Heading: React.FC<HeadingProps> = ({
    children = '',
    className = '',
    variant = 'h1',
    title = '',
    style,
    ...props
}) => React.createElement(variant, { className, title, style, ...props }, children);

export default Heading;
