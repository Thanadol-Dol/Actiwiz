import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import DarkModeYesFirstItemActi from "./DarkModeYesFirstItemActi";
import KeysLayoutAlphabeticEng from "./KeysLayoutAlphabeticEng";
import TypeDefaultModeDarkModeY from "./TypeDefaultModeDarkModeY";

export type IOSAlphbeticKeyboardEngliType = {
  onClose?: () => void;
  suggestionBar?: boolean;
};

const IOSAlphbeticKeyboardEngli = ({
  onClose,
  suggestionBar = true,
}: IOSAlphbeticKeyboardEngliType) => {
  return (
    <View style={styles.iosAlphbeticKeyboardEngli}>
      <DarkModeYesFirstItemActi
        prop="Suggest"
        prop1="Suggest"
        prop2="Suggest"
        darkModeYesFirstItemActiPosition="unset"
      />
      <KeysLayoutAlphabeticEng
        keysLayoutAlphabeticEngPosition="unset"
        keysLayoutAlphabeticEngAlignSelf="stretch"
      />
      <TypeDefaultModeDarkModeY
        typeDefaultModeDarkModeYPosition="unset"
        typeDefaultModeDarkModeYAlignSelf="stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iosAlphbeticKeyboardEngli: {
    width: 390,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default IOSAlphbeticKeyboardEngli;
