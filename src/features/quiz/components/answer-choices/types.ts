export type AnswerChoicesProps = {
  label?: string;
  choices: string[];
  onValueChange: (choice: string) => void;
  value: string;
};
