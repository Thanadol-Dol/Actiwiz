import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import AtomsMediaImage from "../components/AtomsMediaImage";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const ToSinfoPage = () => {
  return (
    <View style={styles.toSinfoPage}>
      <AtomsMediaImage
        atomsMediaImageAtomsMedia={require("../assets/feed-event-4.png")}
        atomsMediaImage2Position="absolute"
        atomsMediaImage2Height={776}
        atomsMediaImage2Top={0}
        atomsMediaImage2Left={0}
        atomsMediaImage2Width={390}
      />
      <Image
        style={styles.image1Icon}
        contentFit="cover"
        source={require("../assets/image-1.png")}
      />
      <Text style={styles.safariWwwsinfokmuttcom}>
        Safariwww.sinfo.kmutt.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image1Icon: {
    top: 105,
    left: 0,
    width: 390,
    height: 458,
    position: "absolute",
  },
  safariWwwsinfokmuttcom: {
    top: 50,
    left: 119,
    fontSize: FontSize.size_xs,
    textTransform: "uppercase",
    fontFamily: FontFamily.ubuntuRegular,
    color: Color.colorBlack,
    textAlign: "center",
    width: 152,
    height: 33,
    position: "absolute",
  },
  toSinfoPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: "#ededed",
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default ToSinfoPage;
