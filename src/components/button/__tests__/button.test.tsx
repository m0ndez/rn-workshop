import * as React from "react";
import { Button } from "../button";
import { render } from "@testing-library/react-native";

describe("Button component", () => {
  it("should render correctly", () => {
    const { toJSON } = render(<Button>Snapshot test!</Button>);
    expect(toJSON()).toMatchSnapshot();
  });
});
