import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedItem = localStorage.getItem(key);
      return savedItem !== null ? JSON.parse(savedItem) : initialValue;
    } catch (error) {
      console.error(`Unable to read localStorage key "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to save localStorage key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
