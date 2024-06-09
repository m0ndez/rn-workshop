import { Question } from "@/constants";

export type AnswerParams = Pick<Question, "question" | "answer">;

export type ContextValues = {
  handleShuffle: () => void;
  handleReset: () => void;
  handleAnswer: (answer: AnswerParams) => void;
  handleMultiAnswer: (answers: AnswerParams[]) => void;
  singleQuestion?: Question;
  allQuestions: Question[];
  totalQuestions: number;
  totalAnswered: number;
  totalScore: number;
  isSuccess: boolean;
};

export type ReducerAction =
  | { type: "SHUFFLE" }
  | { type: "ANSWER"; payload: AnswerParams }
  | { type: "MULTI_ANSWER"; payload: AnswerParams[] }
  | { type: "RESET"; payload: ReducerState };

export type ActionType = ReducerAction["type"];

export type ReducerState = {
  questions: Question[];
  totalQuestions: number;
  totalAnswered: number;
  totalScore: number;
};
