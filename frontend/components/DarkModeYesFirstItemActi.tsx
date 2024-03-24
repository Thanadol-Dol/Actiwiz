import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

export type DarkModeYesFirstItemActiType = {
  prop?: string;
  prop1?: string;
  prop2?: string;

  /** Style props */
  darkModeYesFirstItemActiPosition?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DarkModeYesFirstItemActi = ({
  prop,
  prop1,
  prop2,
  darkModeYesFirstItemActiPosition,
}: DarkModeYesFirstItemActiType) => {
  const darkModeYesFirstItemActiStyle = useMemo(() => {
    return {
      ...getStyleValue("position", darkModeYesFirstItemActiPosition),
    };
  }, [darkModeYesFirstItemActiPosition]);

  return (
    <View
      style={[styles.darkModeyesFirstItemActi, darkModeYesFirstItemActiStyle]}
    >
      <View style={styles.componentItemFlexBox}>
        <Text style={styles.text} numberOfLines={1}>
          {prop}
        </Text>
      </View>
      <Image
        style={styles.seperatorIcon}
        contentFit="cover"
        source={require("../assets/seperator.png")}
      />
      <View
        style={[styles.componentSuggestionItem1, styles.componentItemFlexBox]}
      >
        <Text style={styles.text} numberOfLines={1}>
          {prop1}
        </Text>
      </View>
      <Image
        style={styles.seperatorIcon}
        contentFit="cover"
        source={require("../assets/seperator1.png")}
      />
      <View
        style={[styles.componentSuggestionItem1, styles.componentItemFlexBox]}
      >
        <Text style={styles.text} numberOfLines={1}>
          {prop2}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentItemFlexBox: {
    height: 34,
    borderRadius: Border.br_8xs_6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: FontSize.iOSDefaultBody_size,
    lineHeight: 20,
    fontFamily: FontFamily.iOSDefaultBody,
    color: Color.iOSFFFFFF,
    textAlign: "center",
    height: 20,
    flex: 1,
    overflow: "hidden",
  },
  seperatorIcon: {
    maxWidth: "100%",
    height: 24,
    marginLeft: 2,
    overflow: "hidden",
  },
  componentSuggestionItem1: {
    marginLeft: 2,
  },
  darkModeyesFirstItemActi: {
    backgroundColor: Color.iOSAlfa20202092,
    paddingHorizontal: Padding.p_12xs,
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
});

export default DarkModeYesFirstItemActi;
