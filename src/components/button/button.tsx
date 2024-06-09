import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Button as PaperButton, useTheme } from "react-native-paper";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "default";

interface ButtonProps extends ComponentPropsWithoutRef<typeof PaperButton> {
  variant?: ButtonVariants;
}

type ButtonRef = ElementRef<typeof PaperButton>;

export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const { textColor, buttonColor, variant, mode, ...otherProps } = props;

  const theme = useTheme();

  const variantLookup: Record<
    ButtonVariants,
    Record<"textColor" | "buttonColor", string | undefined>
  > = {
    primary: {
      textColor: theme.colors.primary,
      buttonColor: theme.colors.primaryContainer,
    },
    secondary: {
      textColor: theme.colors.secondary,
      buttonColor: theme.colors.secondaryContainer,
    },
    tertiary: {
      textColor: theme.colors.tertiary,
      buttonColor: theme.colors.tertiaryContainer,
    },
    error: {
      textColor: theme.colors.error,
      buttonColor: theme.colors.errorContainer,
    },
    default: {
      textColor: undefined,
      buttonColor: undefined,
    },
  };

  return (
    <PaperButton
      ref={ref}
      theme={{
        roundness: 1,
      }}
      mode={mode}
      {...otherProps}
      {...variantLookup[variant ?? "default"]}
    />
  );
});
