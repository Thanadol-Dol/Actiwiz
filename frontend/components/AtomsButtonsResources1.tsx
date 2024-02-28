import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Border, Color } from "../GlobalStyles";

export type AtomsButtonsResources1Type = {
  /** Style props */
  atomsButtonsResourcesPosition?: string;
  atomsButtonsResourcesWidth?: number | string;
  atomsButtonsResourcesHeight?: number | string;
  atomsButtonsResourcesTop?: number | string;
  atomsButtonsResourcesRight?: number | string;
  atomsButtonsResourcesBottom?: number | string;
  atomsButtonsResourcesLeft?: number | string;
  atomsButtonsResourcesBackgroundColor?: string;
  maskBackgroundColor?: string;
  maskBorderRadius?: number | string;
  rectangleViewBackgroundColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsButtonsResources1 = ({
  atomsButtonsResourcesPosition,
  atomsButtonsResourcesWidth,
  atomsButtonsResourcesHeight,
  atomsButtonsResourcesTop,
  atomsButtonsResourcesRight,
  atomsButtonsResourcesBottom,
  atomsButtonsResourcesLeft,
  atomsButtonsResourcesBackgroundColor,
  maskBackgroundColor,
  maskBorderRadius,
  rectangleViewBackgroundColor,
}: AtomsButtonsResources1Type) => {
  const atomsButtonsResourcesStyle = useMemo(() => {
    return {
      ...getStyleValue("position", atomsButtonsResourcesPosition),
      ...getStyleValue("width", atomsButtonsResourcesWidth),
      ...getStyleValue("height", atomsButtonsResourcesHeight),
      ...getStyleValue("top", atomsButtonsResourcesTop),
      ...getStyleValue("right", atomsButtonsResourcesRight),
      ...getStyleValue("bottom", atomsButtonsResourcesBottom),
      ...getStyleValue("left", atomsButtonsResourcesLeft),
      ...getStyleValue("backgroundColor", atomsButtonsResourcesBackgroundColor),
    };
  }, [
    atomsButtonsResourcesPosition,
    atomsButtonsResourcesWidth,
    atomsButtonsResourcesHeight,
    atomsButtonsResourcesTop,
    atomsButtonsResourcesRight,
    atomsButtonsResourcesBottom,
    atomsButtonsResourcesLeft,
    atomsButtonsResourcesBackgroundColor,
  ]);

  const maskStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", maskBackgroundColor),
      ...getStyleValue("borderRadius", maskBorderRadius),
    };
  }, [maskBackgroundColor, maskBorderRadius]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", rectangleViewBackgroundColor),
    };
  }, [rectangleViewBackgroundColor]);

  return (
    <View style={[styles.atomsButtonsResources, atomsButtonsResourcesStyle]}>
      <View style={[styles.mask, styles.maskPosition, maskStyle]} />
      <View style={styles.maskPosition}>
        <View style={[styles.child, styles.maskPosition, rectangleViewStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maskPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mask: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.colorGainsboro_200,
  },
  child: {
    backgroundColor: Color.colorDarkslategray_100,
  },
  atomsButtonsResources: {
    width: 132,
    height: 45,
  },
});

export default AtomsButtonsResources1;
