import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageSourcePropType } from "react-native";

export type AtomsIconsSystemCheckType = {
  atomsIconsSystemCheckAtom?: ImageSourcePropType;

  /** Style props */
  atomsIconsSystemCheckPosition?: string;
  atomsIconsSystemCheckHeight?: number | string;
  atomsIconsSystemCheckWidth?: number | string;
  atomsIconsSystemCheckTop?: number | string;
  atomsIconsSystemCheckRight?: number | string;
  atomsIconsSystemCheckBottom?: number | string;
  atomsIconsSystemCheckLeft?: number | string;
  atomsIconsSystemCheckOverflow?: string;
  atomsIconsSystemCheckMaxHeight?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsIconsSystemCheck = ({
  atomsIconsSystemCheckAtom,
  atomsIconsSystemCheckPosition,
  atomsIconsSystemCheckHeight,
  atomsIconsSystemCheckWidth,
  atomsIconsSystemCheckTop,
  atomsIconsSystemCheckRight,
  atomsIconsSystemCheckBottom,
  atomsIconsSystemCheckLeft,
  atomsIconsSystemCheckOverflow,
  atomsIconsSystemCheckMaxHeight,
}: AtomsIconsSystemCheckType) => {
  const atomsIconsSystemCheckStyle = useMemo(() => {
    return {
      ...getStyleValue("position", atomsIconsSystemCheckPosition),
      ...getStyleValue("height", atomsIconsSystemCheckHeight),
      ...getStyleValue("width", atomsIconsSystemCheckWidth),
      ...getStyleValue("top", atomsIconsSystemCheckTop),
      ...getStyleValue("right", atomsIconsSystemCheckRight),
      ...getStyleValue("bottom", atomsIconsSystemCheckBottom),
      ...getStyleValue("left", atomsIconsSystemCheckLeft),
      ...getStyleValue("overflow", atomsIconsSystemCheckOverflow),
      ...getStyleValue("maxHeight", atomsIconsSystemCheckMaxHeight),
    };
  }, [
    atomsIconsSystemCheckPosition,
    atomsIconsSystemCheckHeight,
    atomsIconsSystemCheckWidth,
    atomsIconsSystemCheckTop,
    atomsIconsSystemCheckRight,
    atomsIconsSystemCheckBottom,
    atomsIconsSystemCheckLeft,
    atomsIconsSystemCheckOverflow,
    atomsIconsSystemCheckMaxHeight,
  ]);

  return (
    <Image
      style={[styles.atomsIconsSystemCheck, atomsIconsSystemCheckStyle]}
      contentFit="cover"
      source={atomsIconsSystemCheckAtom}
    />
  );
};

const styles = StyleSheet.create({
  atomsIconsSystemCheck: {
    width: 24,
    height: 24,
  },
});

export default AtomsIconsSystemCheck;
