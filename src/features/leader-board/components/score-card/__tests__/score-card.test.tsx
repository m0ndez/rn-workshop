import React, { ElementRef } from "react";
import { render } from "@testing-library/react-native";
import { ScoreCard } from "../score-card";
import { Surface } from "@/components";

describe("ScoreCard component", () => {
  it("renders the name, score, and rankPosition 1 correctly", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 1;
    const { getByText, toJSON } = render(
      <ScoreCard name={name} score={score} rankPosition={rankPosition} />
    );
    expect(getByText(name)).toBeTruthy();
    expect(getByText(score.toString())).toBeTruthy();
    expect(getByText(`🏆`)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the name, score, and rankPosition 2 correctly", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 2;
    const { getByText, toJSON } = render(
      <ScoreCard name={name} score={score} rankPosition={rankPosition} />
    );
    expect(getByText(name)).toBeTruthy();
    expect(getByText(score.toString())).toBeTruthy();
    expect(getByText(`🏆`)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the name, score, and rankPosition 3 correctly", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 3;
    const { getByText, toJSON } = render(
      <ScoreCard name={name} score={score} rankPosition={rankPosition} />
    );
    expect(getByText(name)).toBeTruthy();
    expect(getByText(score.toString())).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the name, score, and rankPosition 4 correctly", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 4;
    const { getByText, toJSON } = render(
      <ScoreCard name={name} score={score} rankPosition={rankPosition} />
    );
    expect(getByText(name)).toBeTruthy();
    expect(getByText(score.toString())).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders 'You' when isYou prop is true", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 1;

    const { getByText } = render(
      <ScoreCard name={name} score={score} rankPosition={rankPosition} isYou />
    );

    expect(getByText("(You)")).toBeTruthy();
  });

  it("renders without crashing when ref is passed", () => {
    const name = "John Doe";
    const score = 100;
    const rankPosition = 1;

    const ref = React.createRef<ElementRef<typeof Surface>>();

    expect(() =>
      render(
        <ScoreCard
          name={name}
          score={score}
          rankPosition={rankPosition}
          ref={ref}
        />
      )
    ).not.toThrow();
  });
});
