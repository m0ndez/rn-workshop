import { FC, useState } from "react";
import { FlatList, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { AnswerChoicesProps } from "./types";

export const AnswerChoices: FC<AnswerChoicesProps> = (props) => {
  const { choices, onValueChange, label, value } = props;

  return (
    <View>
      {label && <Text variant="labelLarge">{label}</Text>}
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        <FlatList
          scrollEnabled={false}
          data={choices}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <RadioButton.Item
              labelVariant="bodyMedium"
              label={item}
              value={item}
              mode="android"
            />
          )}
        />
      </RadioButton.Group>
    </View>
  );
};
