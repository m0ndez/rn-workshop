export type QuizStatusBarProps = {
  onPressBack: () => void;
  onPressShuffle?: () => void;
  totalAnswered: number;
  totalQuestions: number;
  title: string;
};
