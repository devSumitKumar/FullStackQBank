import { useEffect, useState } from "react"

export const useDEbounceValue = (value: string, delay: number) => {


    const [debouncedValue, setDebouncedValue] = useState<string>("");

    useEffect(() => {

        const timeOut = setTimeout(() => {

            setDebouncedValue(value);
        }, delay)

        return () => clearTimeout(timeOut);

    }, [])


    return { debouncedValue };

}