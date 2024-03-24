import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <View style={styles.navBarChild} />
      <Image
        style={[styles.searchLightIcon, styles.lightIconPosition]}
        contentFit="cover"
        source={require("../assets/search-light.png")}
      />
      <Image
        style={[styles.homeLightIcon, styles.lightIconPosition]}
        contentFit="cover"
        source={require("../assets/home-light.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lightIconPosition: {
    height: 39,
    width: 38,
    bottom: 14,
    left: "50%",
    position: "absolute",
  },
  navBarChild: {
    marginLeft: -195,
    bottom: 0,
    backgroundColor: Color.colorDarkslategray_100,
    left: "50%",
    position: "absolute",
    height: 68,
    width: 390,
  },
  searchLightIcon: {
    marginLeft: -146,
  },
  homeLightIcon: {
    marginLeft: -14,
  },
  navBar: {
    height: 68,
    width: 390,
  },
});

export default NavBar;
