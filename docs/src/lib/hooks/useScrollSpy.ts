import { useEffect, useRef, useState } from 'react';

interface UseScrollSpyInput {
    selectors: string[];
    options?: IntersectionObserverInit;
}

interface UseScrollSpyOutput {
    activeId: string;
}

const useScrollSpy = ({ selectors, options }: UseScrollSpyInput): UseScrollSpyOutput => {
    const [activeId, setActiveId] = useState('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const elements = selectors.map((selector) => document.querySelector(selector));

        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.getAttribute('id') ?? '');
                }
            });
        }, options);

        elements.forEach((el) => {
            if (el) observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [selectors, options]);

    return { activeId };
};

export default useScrollSpy;
