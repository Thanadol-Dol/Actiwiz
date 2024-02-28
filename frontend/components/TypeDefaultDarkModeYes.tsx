import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

export type TypeDefaultDarkModeYesType = {
  prop?: string;

  /** Style props */
  typeDefaultDarkModeYesPosition?: string;
  typeDefaultDarkModeYesBackgroundColor?: string;
  typeDefaultDarkModeYesElevation?: number | string;
  typeDefaultDarkModeYesWidth?: number | string;
  typeDefaultDarkModeYesHeight?: number | string;
  typeDefaultDarkModeYesPadding?: number | string;
  typeDefaultDarkModeYesFlex?: number;
  typeDefaultDarkModeYesMarginLeft?: number | string;
  textFlex?: number | string;
  textFontSize?: number;
  textLineHeight?: number | string;
  textColor?: string;
  textFontFamily?: string;
  textHeight?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TypeDefaultDarkModeYes = ({
  prop,
  typeDefaultDarkModeYesPosition,
  typeDefaultDarkModeYesBackgroundColor,
  typeDefaultDarkModeYesElevation,
  typeDefaultDarkModeYesWidth,
  typeDefaultDarkModeYesHeight,
  typeDefaultDarkModeYesPadding,
  typeDefaultDarkModeYesFlex,
  typeDefaultDarkModeYesMarginLeft,
  textFlex,
  textFontSize,
  textLineHeight,
  textColor,
  textFontFamily,
  textHeight,
}: TypeDefaultDarkModeYesType) => {
  const typeDefaultDarkModeYesStyle = useMemo(() => {
    return {
      ...getStyleValue("position", typeDefaultDarkModeYesPosition),
      ...getStyleValue(
        "backgroundColor",
        typeDefaultDarkModeYesBackgroundColor
      ),
      ...getStyleValue("elevation", typeDefaultDarkModeYesElevation),
      ...getStyleValue("width", typeDefaultDarkModeYesWidth),
      ...getStyleValue("height", typeDefaultDarkModeYesHeight),
      ...getStyleValue("padding", typeDefaultDarkModeYesPadding),
      ...getStyleValue("flex", typeDefaultDarkModeYesFlex),
      ...getStyleValue("marginLeft", typeDefaultDarkModeYesMarginLeft),
    };
  }, [
    typeDefaultDarkModeYesPosition,
    typeDefaultDarkModeYesBackgroundColor,
    typeDefaultDarkModeYesElevation,
    typeDefaultDarkModeYesWidth,
    typeDefaultDarkModeYesHeight,
    typeDefaultDarkModeYesPadding,
    typeDefaultDarkModeYesFlex,
    typeDefaultDarkModeYesMarginLeft,
  ]);

  const text1Style = useMemo(() => {
    return {
      ...getStyleValue("flex", textFlex),
      ...getStyleValue("fontSize", textFontSize),
      ...getStyleValue("lineHeight", textLineHeight),
      ...getStyleValue("color", textColor),
      ...getStyleValue("fontFamily", textFontFamily),
      ...getStyleValue("height", textHeight),
    };
  }, [
    textFlex,
    textFontSize,
    textLineHeight,
    textColor,
    textFontFamily,
    textHeight,
  ]);

  return (
    <View style={[styles.typedefaultDarkModeyes, typeDefaultDarkModeYesStyle]}>
      <Text style={[styles.text, text1Style]}>{prop}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: FontSize.iOSDefaultTitle2_size,
    lineHeight: 28,
    fontFamily: FontFamily.iOSDefaultTitle2,
    color: Color.iOSFFFFFF,
    textAlign: "center",
  },
  typedefaultDarkModeyes: {
    borderRadius: Border.br_8xs_6,
    backgroundColor: Color.iOS434343,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 1,
    width: 32,
    height: 42,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_6xs,
  },
});

export default TypeDefaultDarkModeYes;
