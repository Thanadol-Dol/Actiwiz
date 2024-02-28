import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import EmailSection from "../components/EmailSection";
import PasswordSection from "../components/PasswordSection";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const RegisterPage = () => {
  const [rectangleVisible, setRectangleVisible] = useState(false);
  const [rectangle1Visible, setRectangle1Visible] = useState(false);
  const [rectangle3Visible, setRectangle3Visible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const openRectangle = useCallback(() => {
    setRectangleVisible(true);
  }, []);

  const closeRectangle = useCallback(() => {
    setRectangleVisible(false);
  }, []);

  const openRectangle1 = useCallback(() => {
    setRectangle1Visible(true);
  }, []);

  const closeRectangle1 = useCallback(() => {
    setRectangle1Visible(false);
  }, []);

  const openRectangle3 = useCallback(() => {
    setRectangle3Visible(true);
  }, []);

  const closeRectangle3 = useCallback(() => {
    setRectangle3Visible(false);
  }, []);

  return (
    <>
      <View style={[styles.registerPage, styles.iconLayout]}>
        <Image
          style={styles.loginPhotoIcon}
          contentFit="cover"
          source={require("../assets/login-photo.png")}
        />
        <Image
          style={styles.registerPageChild}
          contentFit="cover"
          source={require("../assets/rectangle-36.png")}
        />
        <Pressable
          style={styles.arrowBackIos}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/arrow-back-ios.png")}
          />
        </Pressable>
        <EmailSection propTop={255} onRectanglePressablePress={openRectangle} />
        <PasswordSection
          passwordLabel="Password"
          passwordPlaceholder="Enter your password"
          propTop={383}
          propWidth={86}
          propWidth1={147}
          onRectanglePressablePress={openRectangle1}
        />
        <PasswordSection
          passwordLabel="Confirm Password"
          passwordPlaceholder="Enter your confirm password"
          propTop={496}
          propWidth={161}
          propWidth1={215}
          onRectanglePressablePress={openRectangle3}
        />
        <Text style={[styles.createYourAccount, styles.signupNowTypo]}>
          Create your account
        </Text>
        <Pressable
          style={[styles.rectangleParent, styles.groupChildLayout]}
          onPress={() => navigation.navigate("FeedPage")}
        >
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Text style={[styles.signupNow, styles.signupNowTypo]}>
            Signup now
          </Text>
        </Pressable>
        <View style={styles.youHaveAccountParent}>
          <Text style={[styles.youHaveAccount, styles.logIn1Typo]}>
            You have account?
          </Text>
          <Pressable
            style={styles.logIn}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={[styles.logIn1, styles.logIn1Typo]}>Log in</Text>
          </Pressable>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={rectangleVisible}>
        <View style={styles.rectangleOverlay}>
          <Pressable style={styles.rectangleBg} onPress={closeRectangle} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle1Visible}>
        <View style={styles.rectangle1Overlay}>
          <Pressable style={styles.rectangle1Bg} onPress={closeRectangle1} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle3Visible}>
        <View style={styles.rectangle3Overlay}>
          <Pressable style={styles.rectangle3Bg} onPress={closeRectangle3} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  signupNowTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base_2,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 359,
    position: "absolute",
  },
  logIn1Typo: {
    fontFamily: FontFamily.nunitoBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    textAlign: "center",
  },
  rectangleOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangleBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
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
  loginPhotoIcon: {
    top: 113,
    left: 130,
    width: 130,
    height: 130,
    display: "none",
    position: "absolute",
  },
  registerPageChild: {
    marginLeft: -195,
    left: "50%",
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    width: 390,
    height: 140,
    top: 0,
    position: "absolute",
  },
  icon: {
    height: "100%",
  },
  arrowBackIos: {
    left: 22,
    top: 160,
    width: 24,
    height: 24,
    position: "absolute",
  },
  createYourAccount: {
    top: 200,
    left: 109,
    color: Color.colorDimgray,
  },
  groupChild: {
    left: 0,
    borderRadius: 8,
    borderColor: Color.colorDarkorange_200,
    top: 0,
    borderWidth: 1,
    borderStyle: "solid",
  },
  signupNow: {
    top: 13,
    left: 133,
    width: 102,
    color: Color.colorDarkorange_200,
  },
  rectangleParent: {
    top: 609,
    left: 15,
  },
  youHaveAccount: {
    color: Color.colorBlack,
  },
  logIn1: {
    textDecoration: "underline",
    color: Color.colorDarkorange_200,
  },
  logIn: {
    marginLeft: 6,
  },
  youHaveAccountParent: {
    top: 677,
    left: 123,
    flexDirection: "row",
    position: "absolute",
  },
  registerPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    borderColor: Color.colorBlack,
    flex: 1,
    height: 844,
    borderWidth: 1,
    borderStyle: "solid",
  },
});

export default RegisterPage;
