import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

export type RootStatusBarProps = PropsWithChildren<{
  title: string;
  onPressBack: () => void;
  rightButtonComponent?: JSX.Element;
  styles?: {
    root?: ViewStyle;
    contentWrapper?: ViewStyle;
    pressBackButtonWrapper?: ViewStyle;
  };
}>;
