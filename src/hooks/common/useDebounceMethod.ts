import { useCallback, useRef } from "react"

type AnyFn = (...args: any[]) => any;
// below F is used as generic 
export const useDebounceMethod = <F extends AnyFn>(propFunc: F, delay: number) => {

    const timeOutRef = useRef<number | null>(null);

    const debouncedMethod = useCallback((...args: any[]) => {
        if (timeOutRef.current !== null) {
            window.clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(() => {

            propFunc(...args)

        }, delay)

    }, [])

    return { debouncedMethod };

}