import React, { useMemo } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AtomsButtonsResources1 from "./AtomsButtonsResources1";
import AtomsButtonsLabelsWh from "./AtomsButtonsLabelsWh";
import { Color } from "../GlobalStyles";

export type CancelButtonContainerType = {
  answerOption?: string;

  /** Style props */
  maskLeft?: number | string;
  viewBackgroundColor?: string;
  textBackgroundColor?: string;
  propLeft?: number | string;
  propColor?: string;

  /** Action props */
  onButtonPress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const CancelButtonContainer = ({
  answerOption,
  maskLeft,
  viewBackgroundColor,
  textBackgroundColor,
  propLeft,
  propColor,
  onButtonPress,
}: CancelButtonContainerType) => {
  const button1Style = useMemo(() => {
    return {
      ...getStyleValue("left", maskLeft),
    };
  }, [maskLeft]);

  const atomsButtonsResourcesStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", viewBackgroundColor),
    };
  }, [viewBackgroundColor]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", textBackgroundColor),
    };
  }, [textBackgroundColor]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("left", propLeft),
      ...getStyleValue("color", propColor),
    };
  }, [propLeft, propColor]);

  return (
    <Pressable style={[styles.button, button1Style]} onPress={onButtonPress}>
      <AtomsButtonsResources1
        atomsButtonsResourcesPosition="absolute"
        atomsButtonsResourcesWidth="97.33%"
        atomsButtonsResourcesHeight="90.91%"
        atomsButtonsResourcesTop="0%"
        atomsButtonsResourcesRight="2.67%"
        atomsButtonsResourcesBottom="9.09%"
        atomsButtonsResourcesLeft="0%"
        atomsButtonsResourcesBackgroundColor="unset"
        maskBackgroundColor="#d8d8d8"
        maskBorderRadius={4}
        rectangleViewBackgroundColor="#be2828"
      />
      <AtomsButtonsLabelsWh
        prop="Yes"
        atomsButtonsLabelsWhPosition="absolute"
        atomsButtonsLabelsWhBackgroundColor="unset"
        atomsButtonsLabelsWhMarginTop={-8.5}
        atomsButtonsLabelsWhTop="50%"
        atomsButtonsLabelsWhRight={20}
        atomsButtonsLabelsWhLeft={16}
        textLeft="32.46%"
        textMarginTop={-13.5}
        textFontSize={24}
        textColor="#fff"
        textFontFamily="Ubuntu-Regular"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 95,
    left: 20,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    width: 150,
    height: 44,
  },
});

export default CancelButtonContainer;
