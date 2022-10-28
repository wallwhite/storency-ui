import React, { FC, PropsWithChildren, HTMLAttributes } from 'react';

type TbodyProps = HTMLAttributes<HTMLTableSectionElement>;

const Tbody: FC<PropsWithChildren<TbodyProps>> = ({ ...props }) => <tbody {...props} />;

export default Tbody;
