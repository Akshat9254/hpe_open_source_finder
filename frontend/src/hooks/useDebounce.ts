import { useEffect } from "react";

const useDebounce = (value: string, fn: () => void, delay = 500) => {
  useEffect(() => {
    const intervalId = setTimeout(() => {
      fn();
    }, delay);

    return () => clearInterval(intervalId);
  }, [value]);
};

export default useDebounce;
