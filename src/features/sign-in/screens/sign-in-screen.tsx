import { Button } from "@/components";
import { useSession } from "@/contexts";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Text, HelperText } from "react-native-paper";
import { FormModel, formSchema } from "../schemas";
import { Redirect, useNavigation } from "expo-router";

export default function SignIn() {
  const { signIn, session } = useSession();

  const navigation = useNavigation();

  const methods = useForm<FormModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (formData: FormModel) => {
    navigation.reset(navigation.getState());

    signIn(formData.name);
  };

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text variant="headlineMedium">Please enter your name to sign in.</Text>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              dense
              label="Player Name"
              placeholder="Enter you name"
              value={value}
              mode="outlined"
              onChangeText={(text) => onChange(text)}
              error={!!error}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />
      <Button
        icon="login-variant"
        mode="contained-tonal"
        onPress={handleSubmit(onSubmit)}
      >
        Sign In
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 16,
    padding: 16,
  },
});
