import { Surface, WaveEmoji } from "@/components";
import { ElementRef, forwardRef, useMemo } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface ScoreCardProps {
  name: string;
  score: number;
  rankPosition: number;
  isYou?: boolean;
}

export const ScoreCard = forwardRef<ElementRef<typeof Surface>, ScoreCardProps>(
  (props, ref) => {
    const { name, score, rankPosition = 1, isYou = false } = props;

    const theme = useTheme();

    const colorRank = useMemo(() => {
      if (rankPosition === 1) {
        return "#FFD700";
      }
      if (rankPosition === 2) {
        return "#C0C0C0";
      }
      if (rankPosition === 3) {
        return "#cd7f32";
      }
      return theme.colors.surface;
    }, [rankPosition]);

    return (
      <Surface
        ref={ref}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colorRank,
        }}
      >
        {rankPosition < 3 && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: -12,
            }}
          >
            <WaveEmoji emoji="🏆" />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium">{name}</Text>
          {isYou && <Text variant="labelMedium">(You)</Text>}
        </View>
        <Text variant="labelLarge">{score}</Text>
      </Surface>
    );
  }
);
