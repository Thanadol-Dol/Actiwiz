import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const Rectangle = () => {
  return <View style={styles.rectangleView} />;
};

const styles = StyleSheet.create({
  rectangleView: {
    backgroundColor: Color.colorMediumaquamarine,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 5,
    flex: 1,
    width: "100%",
    height: 2616,
  },
});

export default Rectangle;
