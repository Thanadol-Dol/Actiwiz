import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Border, Color, Padding } from "../GlobalStyles";

export type DarkModeYesType = {
  /** Style props */
  darkModeYesPosition?: string;
  darkModeYesPaddingTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DarkModeYes = ({
  darkModeYesPosition,
  darkModeYesPaddingTop,
}: DarkModeYesType) => {
  const darkModeYesStyle = useMemo(() => {
    return {
      ...getStyleValue("position", darkModeYesPosition),
      ...getStyleValue("paddingTop", darkModeYesPaddingTop),
    };
  }, [darkModeYesPosition, darkModeYesPaddingTop]);

  return (
    <View style={[styles.darkModeyes, darkModeYesStyle]}>
      <View style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.iOSFFFFFF,
    width: 134,
    height: 5,
  },
  darkModeyes: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_101xl,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_4xs,
    alignSelf: "stretch",
  },
});

export default DarkModeYes;
