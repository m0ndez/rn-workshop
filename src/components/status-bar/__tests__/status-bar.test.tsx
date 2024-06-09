import React from "react";
import renderer from "react-test-renderer";
import { StatusBar } from "../status-bar";

describe("StatusBar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<StatusBar title="Snapshot test!" onPressBack={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
