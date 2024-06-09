import { StyleSheet, View } from "react-native";

import { useSession } from "@/contexts";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";

import { Button } from "@/components";
import { WaveEmoji } from "@/components/wave-emoji/wave-emoji";
import { ComponentPropsWithoutRef } from "react";

const Menus: {
  title: string;
  route: string;
  variant?: ComponentPropsWithoutRef<typeof Button>["variant"];
}[] = [
  {
    title: "Quiz Question",
    route: "/single-quiz",
    variant: "primary",
  },
  {
    title: "All Quiz Question",
    route: "/all-quiz",
  },
];

export default function HomeScreen() {
  const { signOut, session } = useSession();

  const { navigate } = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <View>
          <View style={styles.titleWrapper}>
            <Text variant="displaySmall">Hello</Text>
            <WaveEmoji />
          </View>
          <View>
            <Text variant="titleLarge">Welcome {session}</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium">Available Playground 🚀</Text>
          {Menus.map((menu) => {
            return (
              <Button
                key={menu.route}
                onPress={() => {
                  navigate(menu.route);
                }}
                variant={menu?.variant}
                mode="elevated"
                contentStyle={{
                  padding: 16,
                }}
              >
                {menu.title}
              </Button>
            );
          })}
        </View>
      </View>
      <View>
        <Button onPress={signOut} mode="contained-tonal" variant="error">
          Sign out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: "column", justifyContent: "space-between" },
  titleContainer: {
    gap: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
