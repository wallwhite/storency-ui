import { useState, useCallback } from 'react';

interface UseToggleBooleanBag {
    on: () => void;
    off: () => void;
    toggle: () => void;
}

type UseToggleBooleanOutput = [boolean, UseToggleBooleanBag];

const useToggleBoolean = (defaultState = false): UseToggleBooleanOutput => {
    const [state, setState] = useState(defaultState);

    const on = useCallback(() => {
        setState(true);
    }, []);

    const off = useCallback(() => {
        setState(false);
    }, []);

    const toggle = useCallback(() => {
        setState((currentState) => !currentState);
    }, []);

    return [
        state,
        {
            on,
            off,
            toggle,
        },
    ];
};

export default useToggleBoolean;
