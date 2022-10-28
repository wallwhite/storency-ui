/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare interface ObjectLiteral {
    [key: string]: any;
}

declare type Maybe<T> = T | undefined | null;
