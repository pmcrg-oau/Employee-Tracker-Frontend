import { useEffect, useRef } from 'react';

const useFirstRender = (func: Function, deps: any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useFirstRender;