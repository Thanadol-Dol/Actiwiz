import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontSize, FontFamily } from "../GlobalStyles";

const ComponentText = () => {
  return <Text style={styles.component}>Component</Text>;
};

const styles = StyleSheet.create({
  component: {
    fontSize: FontSize.size_77xl,
    fontFamily: FontFamily.ubuntuRegular,
    color: "#f2f5f7",
    textAlign: "center",
    width: 514,
    height: 120,
  },
});

export default ComponentText;
