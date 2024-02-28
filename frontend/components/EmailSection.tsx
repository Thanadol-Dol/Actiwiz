import React, { useMemo } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

export type EmailSectionType = {
  /** Style props */
  propTop?: number | string;

  /** Action props */
  onRectanglePressablePress?: () => void;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const EmailSection = ({
  propTop,
  onRectanglePressablePress,
}: EmailSectionType) => {
  const groupView1Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View style={[styles.rectangleParent, groupView1Style]}>
      <Pressable
        style={[styles.groupChild, styles.groupPosition]}
        onPress={onRectanglePressablePress}
      />
      <Image
        style={[styles.groupItem, styles.groupPosition]}
        contentFit="cover"
        source={require("../assets/group-4.png")}
      />
      <Text style={[styles.emailAddress, styles.emailAddressTypo]}>
        Email address
      </Text>
      <Text style={[styles.alexemailcom, styles.emailAddressTypo]}>
        alex@email.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupPosition: {
    height: 50,
    top: 32,
    position: "absolute",
  },
  emailAddressTypo: {
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    position: "absolute",
  },
  groupChild: {
    borderRadius: 8,
    backgroundColor: Color.colorWhitesmoke_100,
    left: 0,
    width: 359,
  },
  groupItem: {
    left: 303,
    width: 56,
  },
  emailAddress: {
    top: 0,
    fontSize: FontSize.size_base_2,
    width: 122,
    left: 0,
  },
  alexemailcom: {
    top: 46,
    left: 12,
    fontSize: FontSize.size_mini_1,
    width: 133,
  },
  rectangleParent: {
    top: 284,
    left: 15,
    height: 83,
    width: 359,
    position: "absolute",
  },
});

export default EmailSection;
