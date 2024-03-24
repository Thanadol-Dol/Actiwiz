import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const Rectangle1 = () => {
  return <View style={styles.rectangleView} />;
};

const styles = StyleSheet.create({
  rectangleView: {
    backgroundColor: Color.colorMediumaquamarine,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 5,
    width: 4131,
    height: 615,
  },
});

export default Rectangle1;
