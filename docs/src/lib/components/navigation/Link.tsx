import React from 'react';
import NextLink from 'next/link';
import { UrlObject } from 'url';

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    to: string | UrlObject;
    target?: string;
}

const Link: React.FC<LinkProps> = ({ children, to, target, ...rest }) => (
    <NextLink href={to} target={target} passHref>
        <a {...rest}>{children}</a>
    </NextLink>
);

export default Link;
