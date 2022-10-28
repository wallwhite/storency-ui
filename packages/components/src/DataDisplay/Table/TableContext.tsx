import React, { createContext, FC, PropsWithChildren, useState, useContext } from 'react';

export interface TableContextValue {
    isUnstylized: boolean;
    headers: string[];
}

const initialValue: TableContextValue = {
    headers: [],
    isUnstylized: false,
};

const TableContext = createContext<TableContextValue>(initialValue);

export type TableProviderProps = PropsWithChildren<Partial<Omit<TableContextValue, 'addHeader'>>>;

export const TableProvider: FC<TableProviderProps> = ({ children, isUnstylized = false, headers: initialHeaders }) => {
    const [headers] = useState<string[]>(initialHeaders || []);

    return <TableContext.Provider value={{ headers, isUnstylized }}>{children}</TableContext.Provider>;
};

export const useTableContext = (): TableContextValue => useContext(TableContext);

type WrappedComponentType<PT> = (props: PT) => JSX.Element;

export const withTableContext = <PropsType extends ObjectLiteral>(
    Component: React.ComponentType<PropsType & Partial<TableContextValue>>,
): WrappedComponentType<PropsType> => {
    const WrappedComponent = (props: PropsType): JSX.Element => {
        const context = useTableContext();

        return <Component {...props} {...context} />;
    };

    return WrappedComponent;
};
