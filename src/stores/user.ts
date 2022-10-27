import { atom } from 'jotai';

function atomWithLocalStorage<T>(key: string, initialValue: T) {
  const getInitialValue = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    },
  );
  return derivedAtom;
}

export const usernameAtom = atomWithLocalStorage<string>('username', '');
