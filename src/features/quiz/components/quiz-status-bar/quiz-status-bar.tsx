import { StatusBar } from "@/components";
import { debounce, wait } from "@/utils";
import { FC, useState } from "react";
import { FAB, ProgressBar, Text } from "react-native-paper";
import { QuizStatusBarProps } from "./types";

export const QuizStatusBar: FC<QuizStatusBarProps> = (props) => {
  const { title, onPressBack, onPressShuffle, totalAnswered, totalQuestions } =
    props;

  const progress = Number(totalAnswered) / Number(totalQuestions);

  const progressText = `${totalAnswered}/${totalQuestions}`;

  const [isShuffle, setIsShuffle] = useState(false);

  const handleShuffle = debounce(async () => {
    onPressShuffle?.();
    setIsShuffle((p) => !p);
    await wait(200);
    setIsShuffle((p) => !p);
  }, 200);

  return (
    <StatusBar
      onPressBack={onPressBack}
      title={title}
      {...(onPressShuffle && {
        rightButtonComponent: (
          <FAB
            size="small"
            variant="surface"
            icon={isShuffle ? "dice-5" : "dice-multiple"}
            onPress={handleShuffle}
          />
        ),
      })}
    >
      <StatusBar.Content>
        <Text variant="labelSmall" style={{ alignSelf: "center" }}>
          {progressText}
        </Text>
        <ProgressBar progress={progress} />
      </StatusBar.Content>
    </StatusBar>
  );
};
