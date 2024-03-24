import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

export type AtomsButtonsLabelsWhType = {
  prop?: string;

  /** Style props */
  atomsButtonsLabelsWhPosition?: string;
  atomsButtonsLabelsWhBackgroundColor?: string;
  atomsButtonsLabelsWhMarginTop?: number | string;
  atomsButtonsLabelsWhTop?: number | string;
  atomsButtonsLabelsWhRight?: number | string;
  atomsButtonsLabelsWhLeft?: number | string;
  textLeft?: number | string;
  textMarginTop?: number | string;
  textFontSize?: number;
  textColor?: string;
  textFontFamily?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsButtonsLabelsWh = ({
  prop,
  atomsButtonsLabelsWhPosition,
  atomsButtonsLabelsWhBackgroundColor,
  atomsButtonsLabelsWhMarginTop,
  atomsButtonsLabelsWhTop,
  atomsButtonsLabelsWhRight,
  atomsButtonsLabelsWhLeft,
  textLeft,
  textMarginTop,
  textFontSize,
  textColor,
  textFontFamily,
}: AtomsButtonsLabelsWhType) => {
  const atomsButtonsLabelsWhStyle = useMemo(() => {
    return {
      ...getStyleValue("position", atomsButtonsLabelsWhPosition),
      ...getStyleValue("backgroundColor", atomsButtonsLabelsWhBackgroundColor),
      ...getStyleValue("marginTop", atomsButtonsLabelsWhMarginTop),
      ...getStyleValue("top", atomsButtonsLabelsWhTop),
      ...getStyleValue("right", atomsButtonsLabelsWhRight),
      ...getStyleValue("left", atomsButtonsLabelsWhLeft),
    };
  }, [
    atomsButtonsLabelsWhPosition,
    atomsButtonsLabelsWhBackgroundColor,
    atomsButtonsLabelsWhMarginTop,
    atomsButtonsLabelsWhTop,
    atomsButtonsLabelsWhRight,
    atomsButtonsLabelsWhLeft,
  ]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("left", textLeft),
      ...getStyleValue("marginTop", textMarginTop),
      ...getStyleValue("fontSize", textFontSize),
      ...getStyleValue("color", textColor),
      ...getStyleValue("fontFamily", textFontFamily),
    };
  }, [textLeft, textMarginTop, textFontSize, textColor, textFontFamily]);

  return (
    <View style={[styles.atomsButtonsLabelsWh, atomsButtonsLabelsWhStyle]}>
      <Text style={[styles.text, textStyle]}>{prop}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    marginTop: -6.5,
    top: "50%",
    left: "0%",
    fontSize: FontSize.size_xs,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.iOSFFFFFF,
    textAlign: "center",
  },
  atomsButtonsLabelsWh: {
    backgroundColor: "#363636",
    height: 13,
  },
});

export default AtomsButtonsLabelsWh;
