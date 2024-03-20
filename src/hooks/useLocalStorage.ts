import { useState } from 'react';

export function loadFromLocalStorage<T>(key: string, initialValue: T) {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState ? JSON.parse(serializedState) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

// Save state to local storage
export function saveToLocalStorage<T>(key: string, newValue: T) {
  try {
    const serializedState = JSON.stringify(newValue);

    localStorage.setItem(key, serializedState);
  } catch (e) {
    return undefined;
  }

  return undefined;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.remove(key);

      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
