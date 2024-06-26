export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];
