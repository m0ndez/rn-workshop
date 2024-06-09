import { Button, Surface } from "@/components";
import { useQuestionContext } from "@/contexts";
import { useNavigation } from "expo-router";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AnswerChoices, EndedQuiz, QuizStatusBar } from "../../components";

const SingleQuizScreen: FC = () => {
  const { goBack } = useNavigation();

  const {
    singleQuestion,
    handleAnswer,
    handleShuffle,
    totalQuestions,
    totalAnswered,
    handleReset,
    totalScore,
    isSuccess,
  } = useQuestionContext();

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleExit = () => {
    setSelectedAnswer("");
    handleReset();
    goBack();
  };

  const onAnswer = (answer: string) => {
    handleAnswer({
      answer,
      question: singleQuestion?.question ?? "",
    });
    setSelectedAnswer("");
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
        onPressShuffle={handleShuffle}
        totalAnswered={totalAnswered + 1}
        totalQuestions={totalQuestions}
        title="Question"
      />

      <Surface
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text variant="titleMedium">{singleQuestion?.question}</Text>
      </Surface>

      <AnswerChoices
        label="Select your answer"
        choices={singleQuestion?.choices ?? []}
        value={selectedAnswer}
        onValueChange={(choice) => setSelectedAnswer(choice)}
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
          <Button
            mode="contained-tonal"
            onPress={() => {
              onAnswer("");
            }}
          >
            Skip
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            disabled={!selectedAnswer}
            mode="contained"
            onPress={() => {
              onAnswer(selectedAnswer);
            }}
          >
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

export default SingleQuizScreen;
