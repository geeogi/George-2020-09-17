import { useEffect, useState } from "react";

/**
 * Returns a debounced value which changes at most once per specified delay period
 * @param delay 
 * @param initialValue 
 */
export default function useDebounce<T>(
  delay: number,
  initialValue?: T
): [T | undefined, T | undefined, (next: T) => void] {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue];
}
