import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import AtomsIconsSystemCheck from "./AtomsIconsSystemCheck";

const CircleBar = () => {
  return (
    <View style={styles.circleBar}>
      <AtomsIconsSystemCheck
        atomsIconsSystemCheckAtom={require("../assets/check.png")}
        atomsIconsSystemCheckPosition="absolute"
        atomsIconsSystemCheckHeight="100%"
        atomsIconsSystemCheckWidth="16.5%"
        atomsIconsSystemCheckTop="0%"
        atomsIconsSystemCheckRight="83.5%"
        atomsIconsSystemCheckBottom="0%"
        atomsIconsSystemCheckLeft="0%"
        atomsIconsSystemCheckOverflow="hidden"
        atomsIconsSystemCheckMaxHeight="100%"
      />
      <AtomsIconsSystemCheck
        atomsIconsSystemCheckAtom={require("../assets/check.png")}
        atomsIconsSystemCheckPosition="absolute"
        atomsIconsSystemCheckHeight="100%"
        atomsIconsSystemCheckWidth="16.5%"
        atomsIconsSystemCheckTop="0%"
        atomsIconsSystemCheckRight="0%"
        atomsIconsSystemCheckBottom="0%"
        atomsIconsSystemCheckLeft="83.5%"
        atomsIconsSystemCheckOverflow="hidden"
        atomsIconsSystemCheckMaxHeight="100%"
      />
      <AtomsIconsSystemCheck
        atomsIconsSystemCheckAtom={require("../assets/check.png")}
        atomsIconsSystemCheckPosition="absolute"
        atomsIconsSystemCheckHeight="100%"
        atomsIconsSystemCheckWidth="16.5%"
        atomsIconsSystemCheckTop="0%"
        atomsIconsSystemCheckRight="20.87%"
        atomsIconsSystemCheckBottom="0%"
        atomsIconsSystemCheckLeft="62.62%"
        atomsIconsSystemCheckOverflow="hidden"
        atomsIconsSystemCheckMaxHeight="100%"
      />
      <AtomsIconsSystemCheck
        atomsIconsSystemCheckAtom={require("../assets/check.png")}
        atomsIconsSystemCheckPosition="absolute"
        atomsIconsSystemCheckHeight="100%"
        atomsIconsSystemCheckWidth="16.5%"
        atomsIconsSystemCheckTop="0%"
        atomsIconsSystemCheckRight="41.75%"
        atomsIconsSystemCheckBottom="0%"
        atomsIconsSystemCheckLeft="41.75%"
        atomsIconsSystemCheckOverflow="hidden"
        atomsIconsSystemCheckMaxHeight="100%"
      />
      <AtomsIconsSystemCheck
        atomsIconsSystemCheckAtom={require("../assets/check.png")}
        atomsIconsSystemCheckPosition="absolute"
        atomsIconsSystemCheckHeight="100%"
        atomsIconsSystemCheckWidth="16.5%"
        atomsIconsSystemCheckTop="0%"
        atomsIconsSystemCheckRight="62.62%"
        atomsIconsSystemCheckBottom="0%"
        atomsIconsSystemCheckLeft="20.87%"
        atomsIconsSystemCheckOverflow="hidden"
        atomsIconsSystemCheckMaxHeight="100%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleBar: {
    width: 709,
    height: 117,
  },
});

export default CircleBar;
