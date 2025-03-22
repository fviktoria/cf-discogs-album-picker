import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value
 * @param value - The value that needs to be debounced (can be string, number, etc.)
 * @param delay - The debounce delay in milliseconds (default is 500ms)
 * @returns The debounced value
 */
function useDebounceValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounceValue;
