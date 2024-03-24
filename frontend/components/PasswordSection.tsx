import React, { useMemo } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

export type PasswordSectionType = {
  passwordLabel?: string;
  passwordPlaceholder?: string;

  /** Style props */
  propTop?: number | string;
  propWidth?: number | string;
  propWidth1?: number | string;

  /** Action props */
  onRectanglePressablePress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const PasswordSection = ({
  passwordLabel,
  passwordPlaceholder,
  propTop,
  propWidth,
  propWidth1,
  onRectanglePressablePress,
}: PasswordSectionType) => {
  const groupViewStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const passwordStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth),
    };
  }, [propWidth]);

  const enterYourPasswordStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth1),
    };
  }, [propWidth1]);

  return (
    <View style={[styles.rectangleParent, groupViewStyle]}>
      <Pressable
        style={[styles.groupChild, styles.groupPosition]}
        onPress={onRectanglePressablePress}
      />
      <View style={[styles.groupItem, styles.groupPosition]} />
      <Image
        style={styles.frameIcon}
        contentFit="cover"
        source={require("../assets/frame.png")}
      />
      <Text style={[styles.password, styles.passwordTypo, passwordStyle]}>
        {passwordLabel}
      </Text>
      <Text
        style={[
          styles.enterYourPassword,
          styles.passwordTypo,
          enterYourPasswordStyle,
        ]}
      >
        {passwordPlaceholder}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupPosition: {
    borderRadius: 8,
    top: 29,
    position: "absolute",
  },
  passwordTypo: {
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhitesmoke_100,
    width: 359,
    height: 50,
    left: 0,
  },
  groupItem: {
    left: 304,
    backgroundColor: Color.colorDarkorange_200,
    width: 56,
    height: 51,
  },
  frameIcon: {
    top: 43,
    left: 320,
    width: 24,
    height: 24,
    overflow: "hidden",
    position: "absolute",
  },
  password: {
    top: 0,
    fontSize: FontSize.size_base_2,
    width: 86,
    left: 0,
  },
  enterYourPassword: {
    top: 44,
    left: 17,
    fontSize: FontSize.size_mini_1,
    width: 147,
  },
  rectangleParent: {
    top: 399,
    left: 15,
    width: 360,
    height: 80,
    position: "absolute",
  },
});

export default PasswordSection;
