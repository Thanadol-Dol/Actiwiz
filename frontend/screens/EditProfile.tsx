import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import EditProfilePopup from "../components/EditProfilePopup";
import DetailContainer from "../components/DetailContainer";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const EditProfile = () => {
  const [rectangle1Visible, setRectangle1Visible] = useState(false);
  const [rectangle2Visible, setRectangle2Visible] = useState(false);
  const [rectangle3Visible, setRectangle3Visible] = useState(false);
  const [
    WinterImageVisible,
    setWinterImageVisible,
  ] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [rectangle5Visible, setRectangle5Visible] = useState(false);

  const openRectangle1 = useCallback(() => {
    setRectangle1Visible(true);
  }, []);

  const closeRectangle1 = useCallback(() => {
    setRectangle1Visible(false);
  }, []);

  const openRectangle2 = useCallback(() => {
    setRectangle2Visible(true);
  }, []);

  const closeRectangle2 = useCallback(() => {
    setRectangle2Visible(false);
  }, []);

  const openRectangle3 = useCallback(() => {
    setRectangle3Visible(true);
  }, []);

  const closeRectangle3 = useCallback(() => {
    setRectangle3Visible(false);
  }, []);

  const openWinterImage = useCallback(() => {
    setWinterImageVisible(true);
  }, []);

  const closeWinterImage = useCallback(() => {
    setWinterImageVisible(false);
  }, []);

  const openRectangle4 = useCallback(() => {
    setRectangle5Visible(true);
  }, []);

  const closeRectangle4 = useCallback(() => {
    setRectangle5Visible(false);
  }, []);

  return (
    <>
      <View style={styles.editProfile}>
        <Image
          style={styles.editProfileChild}
          contentFit="cover"
          source={require("../assets/ellipse-87.png")}
        />
        <View style={styles.editProfileItem} />
        <Pressable
          style={[styles.editProfileInner, styles.editChildLayout]}
          onPress={openRectangle1}
        />
        <Pressable
          style={[styles.rectanglePressable, styles.editChildLayout]}
          onPress={openRectangle2}
        />
        <Pressable
          style={[styles.editProfileChild1, styles.editChildLayout]}
          onPress={openRectangle3}
        />
        <Pressable
          style={styles.Winter}
          onPress={openWinterImage}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/ProfileWinter.png")}
          />
        </Pressable>
        <DetailContainer
          detailText="Log Out"
          propTop={650}
          propLeft={137}
          propWidth={120}
          propHeight={40}
          propElevation={4}
          propHeight1="100%"
          propWidth1="100%"
          propBackgroundColor1="#d8d8d8"
          propBorderRadius1={23}
          propBackgroundColor2="#be2828"
          propMarginTop1={-6.5}
          propRight1={16}
          propMarginTop2={-11.5}
          propLeft1="10.8%"
          propFontSize={16}
          propColor="#fff"
          propFontFamily="Poppins-Regular"
          onButtonPress={() => navigation.navigate("LoginPage")}
        />
        <Text style={[styles.name, styles.nameTypo]}>Name</Text>
        <Text style={[styles.studentId, styles.nameTypo]}>Student ID</Text>
        <Text style={[styles.year, styles.nameTypo]}>Year</Text>
        <Text style={[styles.academicId, styles.nameTypo]}>Department Of</Text>

        <Pressable
          style={styles.arrowBackIos}
          onPress={() => navigation.navigate("FeedPage")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/arrow-back-ios1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.editProfileChild2, styles.editChildLayout]}
          onPress={openRectangle4}
        />
      </View>

      <Modal animationType="fade" transparent visible={rectangle1Visible}>
        <View style={styles.rectangle1Overlay}>
          <Pressable style={styles.rectangle1Bg} onPress={closeRectangle1} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle2Visible}>
        <View style={styles.rectangle2Overlay}>
          <Pressable style={styles.rectangle2Bg} onPress={closeRectangle2} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle3Visible}>
        <View style={styles.rectangle3Overlay}>
          <Pressable style={styles.rectangle3Bg} onPress={closeRectangle3} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={WinterImageVisible}
      >
        <View style={styles.WinterImageOverlay}>
          <Pressable
            style={styles.WinterImageBg}
            onPress={closeWinterImage}
          />
          <EditProfilePopup onClose={closeWinterImage} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle5Visible}>
        <View style={styles.rectangle5Overlay}>
          <Pressable style={styles.rectangle5Bg} onPress={closeRectangle4} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  editChildLayout: {
    height: 43,
    width: 307,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkgray,
    left: 44,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  nameTypo: {
    width: 122,
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base_2,
    left: 44,
    position: "absolute",
  },
  editProfileChild: {
    top: 100,
    left: 125,
    width: 140,
    height: 140,
    position: "absolute",
  },
  editProfileItem: {
    top: 259,
    left: 20,
    backgroundColor: Color.iOSFFFFFF,
    width: 350,
    height: 466,
    position: "absolute",
    borderRadius: Border.br_3xs,
  },
  rectangle1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileInner: {
    top: 572,
  },
  rectangle2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  rectanglePressable: {
    top: 494,
  },
  rectangle3Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle3Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileChild1: {
    top: 416,
  },
  WinterImageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  WinterImageBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    borderRadius: Border.br_341xl,
  },
  Winter: {
    left: 133,
    top: 105,
    width: 124,
    height: 130,
    position: "absolute",
  },
  name: {
    top: 314,
  },
  year: {
    top: 470,
  },
  academicId: {
    top: 548,
  },
  studentId: {
    top: 392,
  },
  icon1: {
    overflow: "hidden",
  },
  arrowBackIos: {
    left: 22,
    top: 80,
    width: 24,
    height: 24,
    position: "absolute",
  },
  rectangle5Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle5Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  editProfileChild2: {
    top: 338,
  },
  editProfile: {
    backgroundColor: Color.colorDarkorange_100,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
    borderRadius: Border.br_3xs,
  },
});

export default EditProfile;
