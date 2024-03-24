import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import TypeDefaultDarkModeYes from "./TypeDefaultDarkModeYes";
import DarkModeYes from "./DarkModeYes";
import { Padding, Color } from "../GlobalStyles";

export type TypeDefaultModeDarkModeYType = {
  /** Style props */
  typeDefaultModeDarkModeYPosition?: string;
  typeDefaultModeDarkModeYAlignSelf?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TypeDefaultModeDarkModeY = ({
  typeDefaultModeDarkModeYPosition,
  typeDefaultModeDarkModeYAlignSelf,
}: TypeDefaultModeDarkModeYType) => {
  const typeDefaultModeDarkModeYStyle = useMemo(() => {
    return {
      ...getStyleValue("position", typeDefaultModeDarkModeYPosition),
      ...getStyleValue("alignSelf", typeDefaultModeDarkModeYAlignSelf),
    };
  }, [typeDefaultModeDarkModeYPosition, typeDefaultModeDarkModeYAlignSelf]);

  return (
    <View
      style={[styles.typedefaultModeDarkModey, typeDefaultModeDarkModeYStyle]}
    >
      <View style={styles.keys}>
        <TypeDefaultDarkModeYes
          prop="􀎸"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="unset"
          typeDefaultDarkModeYesWidth={47}
          typeDefaultDarkModeYesHeight={47}
          typeDefaultDarkModeYesPadding={8}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFontSize={26}
          textColor="#e7e7e7"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="􀊱"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="unset"
          typeDefaultDarkModeYesWidth={47}
          typeDefaultDarkModeYesHeight={47}
          typeDefaultDarkModeYesPadding={8}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFontSize={26}
          textColor="#e7e7e7"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
      </View>
      <DarkModeYes darkModeYesPosition="unset" darkModeYesPaddingTop={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  keys: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_4xs,
  },
  typedefaultModeDarkModey: {
    backgroundColor: Color.iOSAlfa20202092,
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
});

export default TypeDefaultModeDarkModeY;
