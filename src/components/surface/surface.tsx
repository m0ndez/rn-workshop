import { Component, ComponentProps, ElementRef, forwardRef } from "react";
import { StyleSheet } from "react-native";
import { Surface as PaperSurface } from "react-native-paper";

type SurfaceProps = ComponentProps<typeof PaperSurface>;

type SurfaceRef = ElementRef<typeof PaperSurface>;

export const Surface = forwardRef<SurfaceRef, SurfaceProps>((props, ref) => {
  const { style, ...otherProps } = props;
  return (
    <PaperSurface ref={ref} style={[styles.root, style]} {...otherProps} />
  );
});

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderRadius: 8,
  },
});
