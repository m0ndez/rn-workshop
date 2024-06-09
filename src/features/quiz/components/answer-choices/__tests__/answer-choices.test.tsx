import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import { AnswerChoices } from "../answer-choices";

describe("AnswerChoices component", () => {
  const choices = ["Choice 1", "Choice 2", "Choice 3"];
  const onValueChange = jest.fn();

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <AnswerChoices
          choices={choices}
          onValueChange={onValueChange}
          value=""
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onValueChange when a choice is selected", () => {
    const { getByText } = render(
      <AnswerChoices choices={choices} onValueChange={onValueChange} value="" />
    );

    fireEvent.press(getByText("Choice 1"));
    expect(onValueChange).toHaveBeenCalledWith("Choice 1");

    fireEvent.press(getByText("Choice 2"));
    expect(onValueChange).toHaveBeenCalledWith("Choice 2");

    fireEvent.press(getByText("Choice 3"));
    expect(onValueChange).toHaveBeenCalledWith("Choice 3");
  });
});
