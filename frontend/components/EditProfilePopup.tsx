import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

export type EditProfilePopupType = {
  onClose?: () => void;
};

const EditProfilePopup = ({ onClose }: EditProfilePopupType) => {
  return (
    <View style={styles.editProfilePopup}>
      <View style={styles.editProfilePopupChild} />
      <Image
        style={[styles.recycleBin2RemoveDeleteEIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/recyclebin2removedeleteemptybintrashgarbage.png")}
      />
      <Image
        style={[styles.camera1PhotosPictureCamerIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/camera1photospicturecameraphotographyphotopictures.png")}
      />
      <Text style={[styles.chooseFromLibraly, styles.takePhotoTypo]}>
        Choose from libraly
      </Text>
      <Text style={[styles.takePhoto, styles.takePhotoTypo]}>take photo</Text>
      <Text style={[styles.removeCurrentPicture, styles.takePhotoTypo]}>
        remove current picture
      </Text>
      <Image
        style={[styles.picturesFolderMemoriesIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/picturesfoldermemories.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    left: "8.72%",
    right: "83.85%",
    width: "7.44%",
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  takePhotoTypo: {
    textAlign: "left",
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.iOSMediumBody_size,
    left: "23.33%",
    height: "13.14%",
    position: "absolute",
  },
  editProfilePopupChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_3xs,
    backgroundColor: "#d9d9d9",
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
    position: "absolute",
  },
  recycleBin2RemoveDeleteEIcon: {
    top: "69.14%",
    bottom: "15.43%",
    height: "15.43%",
    right: "83.85%",
    width: "7.44%",
  },
  camera1PhotosPictureCamerIcon: {
    top: "38.86%",
    bottom: "45.71%",
    height: "15.43%",
    right: "83.85%",
    width: "7.44%",
  },
  chooseFromLibraly: {
    width: "67.49%",
    top: "12.57%",
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.iOSMediumBody_size,
    left: "23.33%",
    height: "13.14%",
  },
  takePhoto: {
    width: "38.51%",
    top: "42.86%",
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.iOSMediumBody_size,
    left: "23.33%",
    height: "13.14%",
  },
  removeCurrentPicture: {
    width: "74.56%",
    top: "73.14%",
    color: "#ff0000",
    textAlign: "left",
    fontFamily: FontFamily.ubuntuRegular,
    textTransform: "uppercase",
    fontSize: FontSize.iOSMediumBody_size,
    left: "23.33%",
    height: "13.14%",
  },
  picturesFolderMemoriesIcon: {
    height: "13.71%",
    top: "10.29%",
    bottom: "76%",
  },
  editProfilePopup: {
    width: 390,
    height: 175,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});

export default EditProfilePopup;
