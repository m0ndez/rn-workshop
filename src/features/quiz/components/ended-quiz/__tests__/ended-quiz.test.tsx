import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { EndedQuiz } from "../ended-quiz";

describe("EndedQuiz component", () => {
  const totalScore = 8;
  const totalQuestions = 10;
  const onPressBack = jest.fn(() => {
    return;
  });

  it("renders correctly", () => {
    const { getByText, toJSON } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    expect(getByText("Success !")).toBeTruthy();
    expect(getByText("You have completed the quiz")).toBeTruthy();
    expect(
      getByText(`Your score is ${totalScore} / ${totalQuestions}`)
    ).toBeTruthy();
    expect(getByText("🎉")).toBeTruthy();
    expect(getByText("Go back")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onPressBack when Go back button is pressed", () => {
    const { getByText } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    fireEvent.press(getByText("Go back"));
    expect(onPressBack).toHaveBeenCalled();
  });

  it("displays the correct score and total questions", () => {
    const { getByText } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    const scoreText = getByText(
      `Your score is ${totalScore} / ${totalQuestions}`
    );
    expect(scoreText).toBeTruthy();
  });

  it("displays the success message", () => {
    const { getByText } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    const successMessage = getByText("Success !");
    expect(successMessage).toBeTruthy();
  });

  it("displays the completion message", () => {
    const { getByText } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    const completionMessage = getByText("You have completed the quiz");
    expect(completionMessage).toBeTruthy();
  });

  it("displays the celebration emoji", () => {
    const { getByText } = render(
      <EndedQuiz
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        onPressBack={onPressBack}
      />
    );

    const celebrationEmoji = getByText("🎉");
    expect(celebrationEmoji).toBeTruthy();
  });
});
