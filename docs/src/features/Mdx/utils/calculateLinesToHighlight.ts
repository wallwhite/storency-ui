/* eslint-disable @typescript-eslint/no-unused-vars */
const RE = /{([\d,-]+)}/;

type CalculateLinesToHighlight = (index: number) => boolean;

const calculateLinesToHighlight = (meta: Maybe<string>): CalculateLinesToHighlight => {
    if (!meta || !RE.test(meta)) {
        return (): boolean => false;
    }
    const [_, data] = RE.exec(meta) ?? [];
    const lineNumbers = data.split(`,`).map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

    return (index: number): boolean => {
        const lineNumber = index + 1;
        const inRange = lineNumbers.some(([start, end]) =>
            end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
        );
        return inRange;
    };
};

export default calculateLinesToHighlight;
