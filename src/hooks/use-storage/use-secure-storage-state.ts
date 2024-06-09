import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useAsyncState, UseStateHook } from "../use-state-async";

type SessionStorageKeys = "USERNAME";

export async function setSecureStorageItemAsync(
  key: SessionStorageKeys,
  value: string | null
) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useSecureStorageState(
  key: SessionStorageKeys
): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setSecureStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
