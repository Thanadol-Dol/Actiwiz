import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

const CircleBar = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.circleBar}>
      <Pressable
        style={[styles.wrapper, styles.framePosition]}
        onPress={() => navigation.navigate("ClubPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-89.png")}
        />
      </Pressable>
      <Image
        style={[styles.circleBarChild, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-93.png")}
      />
      <Pressable
        style={[styles.container, styles.framePosition]}
        onPress={() => navigation.navigate("ClubPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-92.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.frame, styles.framePosition]}
        onPress={() => navigation.navigate("ClubPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-91.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.ellipsePressable, styles.framePosition]}
        onPress={() => navigation.navigate("ClubPage")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-90.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  framePosition: {
    height: "100%",
    width: "16.5%",
    bottom: "0%",
    top: "0%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    height: "100%",
  },
  icon: {
    width: "100%",
  },
  wrapper: {
    left: "0%",
    right: "83.5%",
  },
  circleBarChild: {
    right: "0%",
    left: "83.5%",
    width: "16.5%",
    bottom: "0%",
    top: "0%",
    position: "absolute",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  container: {
    left: "62.62%",
    right: "20.87%",
  },
  frame: {
    left: "41.75%",
    right: "41.75%",
  },
  ellipsePressable: {
    left: "20.87%",
    right: "62.62%",
  },
  circleBar: {
    width: 709,
    height: 117,
  },
});

export default CircleBar;
