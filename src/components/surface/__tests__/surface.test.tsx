import React from "react";
import { render } from "@testing-library/react-native";
import { Surface } from "../surface";
import { Text } from "react-native";

describe("Surface component", () => {
  it("should render correctly", () => {
    const { toJSON } = render(
      <Surface children={<Text>Snap Shot Test</Text>} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
