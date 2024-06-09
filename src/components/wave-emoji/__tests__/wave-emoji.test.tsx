import React from "react";
import { render } from "@testing-library/react-native";
import { WaveEmoji } from "../wave-emoji";

describe("WaveEmoji component", () => {
  it("renders without crashing", () => {
    render(<WaveEmoji />);
  });

  it("renders the provided emoji", () => {
    const emoji = "👋";
    const { getByText, toJSON } = render(<WaveEmoji emoji={emoji} />);
    const emojiText = getByText(emoji);
    expect(emojiText).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
