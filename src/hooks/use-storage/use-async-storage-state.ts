import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useAsyncState, UseStateHook } from "../use-state-async";

type AsyncStorageKeys = "LEADER_BOARD";

export async function setAsyncStorageItemAsync(
  key: AsyncStorageKeys,
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
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  }
}

export function useAsyncStorageState(
  key: AsyncStorageKeys
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
      AsyncStorage.getItem(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setAsyncStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
