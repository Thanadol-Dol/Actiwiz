import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export type AtomsFormFieldIconRiType = {
  /** Style props */
  atomsFormFieldIconRiPosition?: string;
  atomsFormFieldIconRiWidth?: number | string;
  atomsFormFieldIconRiHeight?: number | string;
  atomsFormFieldIconRiLeft?: number | string;
  atomsFormFieldIconRiTop?: number | string;

  /** Action props */
  onAtomsFormFieldDefaultPress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsFormFieldIconRi = ({
  atomsFormFieldIconRiPosition,
  atomsFormFieldIconRiWidth,
  atomsFormFieldIconRiHeight,
  atomsFormFieldIconRiLeft,
  atomsFormFieldIconRiTop,
  onAtomsFormFieldDefaultPress,
}: AtomsFormFieldIconRiType) => {
  const atomsFormFieldIconRiStyle = useMemo(() => {
    return {
      ...getStyleValue("position", atomsFormFieldIconRiPosition),
      ...getStyleValue("width", atomsFormFieldIconRiWidth),
      ...getStyleValue("height", atomsFormFieldIconRiHeight),
      ...getStyleValue("left", atomsFormFieldIconRiLeft),
      ...getStyleValue("top", atomsFormFieldIconRiTop),
    };
  }, [
    atomsFormFieldIconRiPosition,
    atomsFormFieldIconRiWidth,
    atomsFormFieldIconRiHeight,
    atomsFormFieldIconRiLeft,
    atomsFormFieldIconRiTop,
  ]);

  return (
    <Image
      style={[styles.atomsFormFieldIconRi, atomsFormFieldIconRiStyle]}
      contentFit="cover"
      source={require("../assets/atoms--form--field--icon-right.png")}
    />
  );
};

const styles = StyleSheet.create({
  atomsFormFieldIconRi: {
    width: 200,
    height: 40,
  },
});

export default AtomsFormFieldIconRi;
