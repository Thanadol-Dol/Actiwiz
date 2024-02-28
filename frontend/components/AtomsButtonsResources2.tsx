import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Border, Color } from "../GlobalStyles";

export type AtomsButtonsResources2Type = {
  /** Style props */
  atomsButtonsResourcesPosition?: string;
  atomsButtonsResourcesWidth?: number | string;
  atomsButtonsResourcesHeight?: number | string;
  atomsButtonsResourcesTop?: number | string;
  atomsButtonsResourcesRight?: number | string;
  atomsButtonsResourcesBottom?: number | string;
  atomsButtonsResourcesLeft?: number | string;
  rectangleViewBackgroundColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsButtonsResources2 = ({
  atomsButtonsResourcesPosition,
  atomsButtonsResourcesWidth,
  atomsButtonsResourcesHeight,
  atomsButtonsResourcesTop,
  atomsButtonsResourcesRight,
  atomsButtonsResourcesBottom,
  atomsButtonsResourcesLeft,
  rectangleViewBackgroundColor,
}: AtomsButtonsResources2Type) => {
  const atomsButtonsResources1Style = useMemo(() => {
    return {
      ...getStyleValue("position", atomsButtonsResourcesPosition),
      ...getStyleValue("width", atomsButtonsResourcesWidth),
      ...getStyleValue("height", atomsButtonsResourcesHeight),
      ...getStyleValue("top", atomsButtonsResourcesTop),
      ...getStyleValue("right", atomsButtonsResourcesRight),
      ...getStyleValue("bottom", atomsButtonsResourcesBottom),
      ...getStyleValue("left", atomsButtonsResourcesLeft),
    };
  }, [
    atomsButtonsResourcesPosition,
    atomsButtonsResourcesWidth,
    atomsButtonsResourcesHeight,
    atomsButtonsResourcesTop,
    atomsButtonsResourcesRight,
    atomsButtonsResourcesBottom,
    atomsButtonsResourcesLeft,
  ]);

  const rectangleView1Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", rectangleViewBackgroundColor),
    };
  }, [rectangleViewBackgroundColor]);

  return (
    <View style={[styles.atomsButtonsResources, atomsButtonsResources1Style]}>
      <View style={[styles.mask, styles.maskPosition]} />
      <View style={styles.maskPosition}>
        <View
          style={[styles.child, styles.maskPosition, rectangleView1Style]}
        />
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
    borderRadius: Border.br_3xl_5,
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

export default AtomsButtonsResources2;
