import { Stack } from "expo-router";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
} from "react";
import { ViewStyle } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

type MainLayoutProps = ComponentPropsWithoutRef<typeof Stack>;

type RefMainLayout = ElementRef<typeof Stack>;

export const MainLayout = forwardRef<RefMainLayout, MainLayoutProps>(
  (props, ref) => {
    const { screenOptions, ...otherProps } = props;

    const safeAreaInsets = useSafeAreaInsets();

    const contentStyle = createRootStackStyle(safeAreaInsets);

    const baseScreenOptions: MainLayoutProps["screenOptions"] = {
      headerShown: false,
      contentStyle,
      ...screenOptions,
    };

    return (
      <Stack ref={ref} screenOptions={baseScreenOptions} {...otherProps} />
    );
  }
);

const createRootStackStyle = (edgeInsets: EdgeInsets): ViewStyle => {
  const { left, right, top } = edgeInsets;

  const mergePadding = (padding: number) => {
    return {
      paddingTop: top,
      paddingLeft: padding + left,
      paddingRight: padding + right,
      paddingBottom: padding,
    };
  };

  return { ...mergePadding(16) };
};
