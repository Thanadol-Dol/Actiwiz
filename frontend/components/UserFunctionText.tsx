import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontSize, FontFamily } from "../GlobalStyles";

const UserFunctionText = () => {
  return <Text style={styles.userFunction}>User Function</Text>;
};

const styles = StyleSheet.create({
  userFunction: {
    fontSize: FontSize.size_77xl,
    fontFamily: FontFamily.ubuntuRegular,
    color: "#fffdfd",
    textAlign: "center",
    width: 601,
    height: 120,
  },
});

export default UserFunctionText;
