import { useEffect, useState } from "react";

export default function useDebounce(initializeVale = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState();
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(initializeVale), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initializeVale]);
  return debounceValue;
}
