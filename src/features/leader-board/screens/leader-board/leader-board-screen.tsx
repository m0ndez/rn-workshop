import { Button, StatusBar } from "@/components";
import { useLeaderBoardContext, useSession } from "@/contexts";
import { useNavigation } from "expo-router";
import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ScoreCard } from "../../components";

const LeaderBoard: FC = () => {
  const { goBack } = useNavigation();

  const { leaderBoardData: scoreData, handleResetLeaderBoard: resetScore } =
    useLeaderBoardContext();

  const { session } = useSession();

  const scrollList = scoreData;

  return (
    <View style={styles.root}>
      <StatusBar onPressBack={goBack} title="🏅 LeaderBoard 🏅" />
      <FlatList
        data={scrollList}
        ListEmptyComponent={() => {
          return <Text variant="titleLarge">No score data</Text>;
        }}
        keyExtractor={({ name }) => name}
        contentContainerStyle={styles.ScoreListContentContainer}
        renderItem={({ item: { name, score }, index }) => {
          return (
            <ScoreCard
              name={name}
              score={score}
              rankPosition={index + 1}
              isYou={session === name}
            />
          );
        }}
      />

      {scrollList?.length > 0 && (
        <View
          style={{
            marginTop: "auto",
          }}
        >
          <Button mode="contained-tonal" onPress={resetScore}>
            Reset LeaderBoard
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
  },
  ScoreListContentContainer: {
    gap: 16,
    padding: 16,
  },
});

export default LeaderBoard;
