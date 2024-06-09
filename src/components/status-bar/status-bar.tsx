import { Surface } from "../surface";
import { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { RootStatusBarProps } from "./types";

const baseStyles = StyleSheet.create({
  root: {
    gap: 8,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressBackButtonWrapper: {
    position: "absolute",
    left: 0,
  },
});

const RootStatusBar: FC<RootStatusBarProps> = (props) => {
  const { title, onPressBack, children, rightButtonComponent, styles } = props;

  const { contentWrapper, pressBackButtonWrapper, root } = baseStyles;

  return (
    <Surface style={[root, styles?.root]}>
      <View style={[contentWrapper, styles?.contentWrapper]}>
        <View style={[pressBackButtonWrapper, styles?.pressBackButtonWrapper]}>
          <IconButton size={24} icon={"chevron-left"} onPress={onPressBack} />
        </View>
        <Text variant="titleMedium">{title}</Text>
        <StatusBarRightButton>{rightButtonComponent}</StatusBarRightButton>
      </View>
      {children}
    </Surface>
  );
};

const StatusBarRightButton = forwardRef<
  View,
  ComponentPropsWithoutRef<typeof View>
>((props, ref) => {
  const { children, style, ...otherProps } = props;

  const baseStyle: ViewStyle = {
    position: "absolute",
    right: 0,
  };

  return (
    <View ref={ref} style={[baseStyle, style]} {...otherProps}>
      {children}
    </View>
  );
});

const StatusBarContent = forwardRef<
  View,
  ComponentPropsWithoutRef<typeof View>
>((props, ref) => {
  const { children, style, ...otherProps } = props;
  const baseStyle: ViewStyle = {
    justifyContent: "center",
    gap: 4,
  };

  return (
    <View ref={ref} style={[baseStyle, style]} {...otherProps}>
      {children}
    </View>
  );
});

export const StatusBar = Object.assign(RootStatusBar, {
  Content: StatusBarContent,
});
