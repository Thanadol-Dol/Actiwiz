import React, { useMemo } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AtomsButtonsResources1 from "./AtomsButtonsResources1";
import AtomsButtonsLabelsWh from "./AtomsButtonsLabelsWh";

export type DetailContainerType = {
  detailText?: string;

  /** Style props */
  propTop?: number | string;
  propLeft?: number | string;
  propMarginTop?: number | string;
  propMarginLeft?: number | string;
  propBorderRadius?: number;
  propWidth?: number | string;
  propHeight?: number | string;
  propBorderStyle?: string;
  propBorderColor?: string;
  propBorderWidth?: number;
  propElevation?: number;
  propHeight1?: number | string;
  propWidth1?: number | string;
  propRight?: number | string;
  propBottom?: number | string;
  propBackgroundColor?: string;
  propBackgroundColor1?: string;
  propBorderRadius1?: number | string;
  propBackgroundColor2?: string;
  propMarginTop1?: number | string;
  propRight1?: number | string;
  propMarginTop2?: number | string;
  propLeft1?: number | string;
  propFontSize?: number;
  propColor?: string;
  propFontFamily?: string;

  /** Action props */
  onButtonPress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DetailContainer = ({
  detailText,
  propTop,
  propLeft,
  propMarginTop,
  propMarginLeft,
  propBorderRadius,
  propWidth,
  propHeight,
  propBorderStyle,
  propBorderColor,
  propBorderWidth,
  propElevation,
  propHeight1,
  propWidth1,
  propRight,
  propBottom,
  propBackgroundColor,
  propBackgroundColor1,
  propBorderRadius1,
  propBackgroundColor2,
  propMarginTop1,
  propRight1,
  propMarginTop2,
  propLeft1,
  propFontSize,
  propColor,
  propFontFamily,
  onButtonPress,
}: DetailContainerType) => {
  const buttonStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("borderRadius", propBorderRadius),
      ...getStyleValue("width", propWidth),
      ...getStyleValue("height", propHeight),
      ...getStyleValue("borderStyle", propBorderStyle),
      ...getStyleValue("borderColor", propBorderColor),
      ...getStyleValue("borderWidth", propBorderWidth),
      ...getStyleValue("elevation", propElevation),
    };
  }, [
    propTop,
    propLeft,
    propMarginTop,
    propMarginLeft,
    propBorderRadius,
    propWidth,
    propHeight,
    propBorderStyle,
    propBorderColor,
    propBorderWidth,
    propElevation,
  ]);

  const atomsButtonsResourcesStyle = useMemo(() => {
    return {
      ...getStyleValue("height", propHeight1),
      ...getStyleValue("width", propWidth1),
      ...getStyleValue("right", propRight),
      ...getStyleValue("bottom", propBottom),
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propHeight1, propWidth1, propRight, propBottom, propBackgroundColor]);

  const maskStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor1),
      ...getStyleValue("borderRadius", propBorderRadius1),
    };
  }, [propBackgroundColor1, propBorderRadius1]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor2),
    };
  }, [propBackgroundColor2]);

  const atomsButtonsLabelsWhStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop1),
      ...getStyleValue("right", propRight1),
    };
  }, [propMarginTop1, propRight1]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop2),
      ...getStyleValue("left", propLeft1),
      ...getStyleValue("fontSize", propFontSize),
      ...getStyleValue("color", propColor),
      ...getStyleValue("fontFamily", propFontFamily),
    };
  }, [propMarginTop2, propLeft1, propFontSize, propColor, propFontFamily]);

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onButtonPress}>
      <AtomsButtonsResources1
        atomsButtonsResourcesPosition="absolute"
        atomsButtonsResourcesWidth="100%"
        atomsButtonsResourcesHeight="100%"
        atomsButtonsResourcesTop="0%"
        atomsButtonsResourcesRight="0%"
        atomsButtonsResourcesBottom="0%"
        atomsButtonsResourcesLeft="0%"
        atomsButtonsResourcesBackgroundColor="unset"
        maskBackgroundColor="#d8d8d8"
        maskBorderRadius={4}
        rectangleViewBackgroundColor="#000"
      />
      <AtomsButtonsLabelsWh
        prop="Detail"
        atomsButtonsLabelsWhPosition="absolute"
        atomsButtonsLabelsWhBackgroundColor="unset"
        atomsButtonsLabelsWhMarginTop={-6.5}
        atomsButtonsLabelsWhTop="50%"
        atomsButtonsLabelsWhRight={16}
        atomsButtonsLabelsWhLeft={16}
        textLeft="21.62%"
        textMarginTop={-6.5}
        textFontSize={12}
        textColor="#fff"
        textFontFamily="Ubuntu-Regular"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 174,
    left: 248,
    width: 100,
    height: 30,
  },
});

export default DetailContainer;
