import { shuffleArray } from "@/utils";
import { ReducerAction, ReducerState } from "./types";
import shuffle from "lodash/shuffle";

export const questionReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case "SHUFFLE": {
      const shuffledQuestion = state.questions.map((question) => ({
        ...question,
        choices: shuffle(question.choices),
      }));

      return {
        ...state,
        questions: shuffle(shuffledQuestion),
      };
    }

    case "ANSWER": {
      const answeredQuestions = state.questions.map((question) => {
        if (question.question === action.payload.question) {
          return {
            ...question,
            answered: true,
          };
        }
        return question;
      });

      const correctAnswer =
        answeredQuestions.find((q) => q.question === action.payload.question)
          ?.answer === action.payload.answer;

      return {
        ...state,
        questions: answeredQuestions,
        totalAnswered: state.totalAnswered + 1,
        totalScore: correctAnswer ? state.totalScore + 1 : state.totalScore,
      };
    }

    case "MULTI_ANSWER": {
      const answeredQuestions = state.questions.map((question) => {
        const answeredQuestion = action.payload.find(
          (a) => a.question === question.question
        );

        if (answeredQuestion) {
          return {
            ...question,
            answered: true,
          };
        }
        return question;
      });

      const totalScore = answeredQuestions.reduce((acc, question) => {
        const correctAnswer =
          question.answer ===
          action.payload.find((a) => a.question === question.question)?.answer;

        return correctAnswer ? acc + 1 : acc;
      }, 0);

      return {
        ...state,
        questions: answeredQuestions,
        totalAnswered: state.totalQuestions,
        totalScore: totalScore,
      };
    }

    case "RESET":
      return action.payload;

    default:
      return state;
  }
};
