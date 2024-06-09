import { Button, Surface } from "@/components";
import { useQuestionContext } from "@/contexts";
import { useNavigation } from "expo-router";
import { FC, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { AnswerChoices, EndedQuiz, QuizStatusBar } from "../../components";

const AllQuizScreen: FC = () => {
  const { goBack } = useNavigation();

  const {
    totalQuestions,
    totalScore,
    allQuestions,
    isSuccess,
    handleReset,
    handleShuffle,
    handleMultiAnswer,
  } = useQuestionContext();

  const [selectedAnswer, setSelectedAnswer] = useState<Record<string, string>>(
    {}
  );

  const onAnswer = () => {
    handleMultiAnswer(
      Object.entries(selectedAnswer).map(([question, answer]) => ({
        question,
        answer,
      }))
    );
  };

  const handleExit = () => {
    setSelectedAnswer({});
    handleReset();
    goBack();
  };

  if (isSuccess) {
    return (
      <EndedQuiz
        onPressBack={handleExit}
        totalQuestions={totalQuestions}
        totalScore={totalScore}
      />
    );
  }

  return (
    <View style={styles.root}>
      <QuizStatusBar
        onPressBack={handleExit}
        title="All Question Quiz"
        totalAnswered={Object.keys(selectedAnswer)?.length}
        totalQuestions={totalQuestions}
      />
      <FlatList
        data={allQuestions}
        keyExtractor={(item) => item.question}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleShuffle} />
        }
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              marginVertical: 8,
            }}
          />
        )}
        renderItem={(flatListProps) => {
          const { item } = flatListProps;
          return (
            <Surface style={styles.root} elevation={0}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text variant="titleMedium">{item.question}</Text>
              </View>
              <AnswerChoices
                choices={item.choices}
                value={selectedAnswer[item.question]}
                onValueChange={(choice) =>
                  setSelectedAnswer({
                    ...selectedAnswer,
                    [item.question]: choice,
                  })
                }
              />
            </Surface>
          );
        }}
      />
      <View
        style={{
          marginTop: "auto",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button onPress={onAnswer} mode="contained">
            Answer
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
  },
});

export default AllQuizScreen;
