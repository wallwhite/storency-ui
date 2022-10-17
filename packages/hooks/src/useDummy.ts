import { useEffect } from 'react';

const useDummy = (): void => {
    useEffect((): void => {
        // eslint-disable-next-line no-console
        console.log('Hello!');
    }, []);
};

export default useDummy;
