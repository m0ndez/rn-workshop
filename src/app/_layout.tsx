import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SessionProvider } from "../contexts/session/session.context";
import { useColorScheme } from "@/hooks";
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, MD3LightTheme);
const CombinedDarkTheme = merge(DarkTheme, MD3DarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme =
    Platform.OS === "web"
      ? CombinedDefaultTheme
      : colorScheme === "dark"
      ? CombinedDarkTheme
      : CombinedDefaultTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <SessionProvider>
            <Stack
              initialRouteName="(main)"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(main)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SessionProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
