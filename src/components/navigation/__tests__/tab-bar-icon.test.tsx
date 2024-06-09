import React from "react";
import { render } from "@testing-library/react-native";

import { TabBarIcon } from "../tab-bar-icon";

describe("TabBarIcon component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <TabBarIcon name="home" size={24} style={{ color: "red" }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
