import { Redirect, Tabs } from "expo-router";

import { Text, useTheme } from "react-native-paper";
import { LeaderBoardProvider, QuestionProvider, useSession } from "@/contexts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarIcon } from "@/components";

export default function TabLayout() {
  const theme = useTheme();
  const { session, isLoading } = useSession();

  const safeAreaInsets = useSafeAreaInsets();

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <LeaderBoardProvider>
      <QuestionProvider>
        <Tabs
          safeAreaInsets={safeAreaInsets}
          screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="(leader-board)"
            options={{
              title: "Leader Board",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "bar-chart" : "bar-chart-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </QuestionProvider>
    </LeaderBoardProvider>
  );
}
