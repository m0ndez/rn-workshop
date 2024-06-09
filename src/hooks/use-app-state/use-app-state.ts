import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
type Opt = {
  handleForegroundState: () => void;
};

export const useAppState = (params: Opt) => {
  const { handleForegroundState } = params;
  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        handleForegroundState();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return;
};
