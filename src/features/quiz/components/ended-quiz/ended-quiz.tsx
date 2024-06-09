import { FC, useRef } from "react";
import { WaveEmoji } from "@/components/wave-emoji";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "@/components";
import WinnerLottie from "@/assets/lotties/winner.json";
import { EndedQuizProps } from "./types";

export const EndedQuiz: FC<EndedQuizProps> = (props) => {
  const { totalQuestions, totalScore, onPressBack } = props;
  const animation = useRef(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={{
          width: "100%",
          height: 300,
        }}
        source={WinnerLottie}
      />
      <View
        style={{
          gap: 16,
          alignItems: "center",
        }}
      >
        <Text variant="displaySmall">Success !</Text>
        <Text variant="labelMedium">You have completed the quiz</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Text variant="titleLarge">
            Your score is {totalScore} / {totalQuestions}
          </Text>
          <WaveEmoji emoji="🎉" />
        </View>
        <Button mode="contained" onPress={onPressBack}>
          Go back
        </Button>
      </View>
    </View>
  );
};
