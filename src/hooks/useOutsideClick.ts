import React, { useEffect, useRef } from 'react';

function useOutsideClick(callBack: () => void) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callBack()
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return [ref] as const


}

export default useOutsideClick;
