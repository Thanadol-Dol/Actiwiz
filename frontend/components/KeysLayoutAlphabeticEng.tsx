import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import TypeDefaultDarkModeYes from "./TypeDefaultDarkModeYes";
import { Padding, Color } from "../GlobalStyles";

export type KeysLayoutAlphabeticEngType = {
  /** Style props */
  keysLayoutAlphabeticEngPosition?: string;
  keysLayoutAlphabeticEngAlignSelf?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const KeysLayoutAlphabeticEng = ({
  keysLayoutAlphabeticEngPosition,
  keysLayoutAlphabeticEngAlignSelf,
}: KeysLayoutAlphabeticEngType) => {
  const keysLayoutAlphabeticEngStyle = useMemo(() => {
    return {
      ...getStyleValue("position", keysLayoutAlphabeticEngPosition),
      ...getStyleValue("alignSelf", keysLayoutAlphabeticEngAlignSelf),
    };
  }, [keysLayoutAlphabeticEngPosition, keysLayoutAlphabeticEngAlignSelf]);

  return (
    <View
      style={[styles.keysLayoutAlphabeticEng, keysLayoutAlphabeticEngStyle]}
    >
      <View style={styles.rowAlphabetic}>
        <TypeDefaultDarkModeYes
          prop="Q"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="W"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="E"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="R"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="T"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="Y"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="U"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="I"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="O"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="P"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
      </View>
      <View style={[styles.rowAlphabetic1, styles.rowFlexBox]}>
        <TypeDefaultDarkModeYes
          prop="A"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="S"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="D"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="F"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="G"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="H"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="J"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="K"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="L"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={7}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={5}
          textFlex={1}
          textFontSize={22}
          textLineHeight={28}
          textColor="#fff"
          textFontFamily="SF Pro Display"
          textHeight="unset"
        />
      </View>
      <View style={styles.rowFlexBox}>
        <TypeDefaultDarkModeYes
          prop="􀆞"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth={42}
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={11}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFlex={1}
          textFontSize={16}
          textLineHeight={21}
          textColor="#fff"
          textFontFamily="SF Pro Text"
          textHeight={20}
        />
        <View style={styles.rowAlphabetic2}>
          <TypeDefaultDarkModeYes
            prop="Z"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft="unset"
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="X"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="C"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="V"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="B"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="N"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
          <TypeDefaultDarkModeYes
            prop="M"
            typeDefaultDarkModeYesPosition="unset"
            typeDefaultDarkModeYesBackgroundColor="#434343"
            typeDefaultDarkModeYesWidth="unset"
            typeDefaultDarkModeYesHeight={42}
            typeDefaultDarkModeYesPadding={7}
            typeDefaultDarkModeYesFlex={1}
            typeDefaultDarkModeYesMarginLeft={5}
            textFlex={1}
            textFontSize={22}
            textLineHeight={28}
            textColor="#fff"
            textFontFamily="SF Pro Display"
            textHeight="unset"
          />
        </View>
        <TypeDefaultDarkModeYes
          prop="􀆛"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#202020"
          typeDefaultDarkModeYesWidth={42}
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={11}
          typeDefaultDarkModeYesMarginLeft={1}
          textFlex={1}
          textFontSize={16}
          textLineHeight={21}
          textColor="#fff"
          textFontFamily="SF Pro Text"
          textHeight={20}
        />
      </View>
      <View style={styles.rowFlexBox}>
        <TypeDefaultDarkModeYes
          prop="123"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#202020"
          typeDefaultDarkModeYesWidth={87}
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={11}
          typeDefaultDarkModeYesMarginLeft="unset"
          textFlex={1}
          textFontSize={16}
          textLineHeight={21}
          textColor="#fff"
          textFontFamily="SF Pro Text"
          textHeight={20}
        />
        <TypeDefaultDarkModeYes
          prop="space"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#434343"
          typeDefaultDarkModeYesWidth="unset"
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={11}
          typeDefaultDarkModeYesFlex={1}
          typeDefaultDarkModeYesMarginLeft={6}
          textFlex={1}
          textFontSize={16}
          textLineHeight={21}
          textColor="#fff"
          textFontFamily="SF Pro Text"
          textHeight="unset"
        />
        <TypeDefaultDarkModeYes
          prop="Go"
          typeDefaultDarkModeYesPosition="unset"
          typeDefaultDarkModeYesBackgroundColor="#202020"
          typeDefaultDarkModeYesWidth={88}
          typeDefaultDarkModeYesHeight={42}
          typeDefaultDarkModeYesPadding={11}
          typeDefaultDarkModeYesMarginLeft={6}
          textFlex={1}
          textFontSize={16}
          textLineHeight={21}
          textColor="#fff"
          textFontFamily="SF Pro Text"
          textHeight={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowFlexBox: {
    marginTop: 12,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  rowAlphabetic: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  rowAlphabetic1: {
    paddingHorizontal: Padding.p_lg,
    paddingVertical: 0,
  },
  rowAlphabetic2: {
    flex: 1,
    paddingHorizontal: Padding.p_smi,
    marginLeft: 1,
    paddingVertical: 0,
    flexDirection: "row",
  },
  keysLayoutAlphabeticEng: {
    backgroundColor: Color.iOSAlfa20202092,
    paddingHorizontal: Padding.p_10xs,
    paddingVertical: Padding.p_5xs,
    alignSelf: "stretch",
  },
});

export default KeysLayoutAlphabeticEng;
