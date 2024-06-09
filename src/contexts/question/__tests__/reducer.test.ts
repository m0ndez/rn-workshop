import { questionReducer } from "@/contexts/question/reducer";
import { ReducerAction } from "../types";
import { QUESTIONS } from "@/constants";

describe("questionReducer", () => {
  const initialState = {
    questions: QUESTIONS,
    totalQuestions: 10,
    totalAnswered: 0,
    totalScore: 0,
  };

  it("should shuffle the questions and choices when action type is 'SHUFFLE'", () => {
    const action: ReducerAction = { type: "SHUFFLE" };
    const newState = questionReducer(initialState, action);

    expect(newState.questions).not.toEqual(initialState.questions);
    expect(newState.questions[0].choices).not.toEqual(
      initialState.questions[0].choices
    );
  });

  it("should mark a question as answered and update the score when action type is 'ANSWER'", () => {
    const action: ReducerAction = {
      type: "ANSWER",
      payload: {
        question: "What is the capital of France?",
        answer: "Paris",
      },
    };
    const newState = questionReducer(initialState, action);

    expect(newState.questions[0].answered).toBe(true);
    expect(newState.totalAnswered).toBe(initialState.totalAnswered + 1);
    expect(newState.totalScore).toBe(initialState.totalScore + 1);
  });

  it("should mark multiple questions as answered and calculate the total score when action type is 'MULTI_ANSWER'", () => {
    const action: ReducerAction = {
      type: "MULTI_ANSWER",
      payload: [
        {
          question: "What is the capital of France?",
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          answer: "Mars",
        },
        {
          question: 'Who wrote "To Kill a Mockingbird"?',
          answer: "Harper Lee",
        },
      ],
    };
    const newState = questionReducer(initialState, action);

    expect(newState.questions[0].answered).toBe(true);
    expect(newState.totalAnswered).toBe(initialState.totalQuestions);
    expect(newState.totalScore).toBeGreaterThan(initialState.totalScore);
  });

  it("should reset the state to the provided payload when action type is 'RESET'", () => {
    const action: ReducerAction = {
      type: "RESET",
      payload: {
        questions: [],
        totalQuestions: 0,
        totalAnswered: 0,
        totalScore: 0,
      },
    };
    const newState = questionReducer(initialState, action);

    expect(newState).toEqual(action.payload);
  });
});
