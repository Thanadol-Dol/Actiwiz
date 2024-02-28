import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import IOSAlphbeticKeyboardEngli from "./IOSAlphbeticKeyboardEngli";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import PasswordSection from "../components/PasswordSection";
import EmailSection from "../components/EmailSection";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const LoginPage = () => {
  const [rectangle2Visible, setRectangle2Visible] = useState(false);
  const [rectangle4Visible, setRectangle4Visible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const openRectangle2 = useCallback(() => {
    setRectangle2Visible(true);
  }, []);

  const closeRectangle2 = useCallback(() => {
    setRectangle2Visible(false);
  }, []);

  const openRectangle4 = useCallback(() => {
    setRectangle4Visible(true);
  }, []);

  const closeRectangle4 = useCallback(() => {
    setRectangle4Visible(false);
  }, []);

  return (
    <>
      <View style={[styles.loginPage, styles.loginPageBorder]}>
        <Image
          style={styles.loginPhotoIcon}
          contentFit="cover"
          source={require("../assets/login-photo.png")}
        />
        <Pressable
          style={[styles.rectangleParent, styles.rectangleLayout]}
          onPress={() => navigation.navigate("RegisterPage")}
        >
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <Text style={[styles.signupNow, styles.loginTypo]}>Signup now</Text>
        </Pressable>
        <Text style={[styles.loginIntoYour, styles.loginTypo]}>
          Login into your account
        </Text>
        <Image
          style={[styles.loginPageChild, styles.loginPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-38.png")}
        />
        <Image
          style={[styles.loginPageItem, styles.loginPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-39.png")}
        />
        <View style={styles.lineParent}>
          <View style={[styles.groupItem, styles.groupLayout]} />
          <View style={[styles.groupInner, styles.groupLayout]} />
          <Text style={[styles.or, styles.orTypo]}>OR</Text>
        </View>
        <Text style={[styles.forgotPassword, styles.orTypo]}>
          Forgot password?
        </Text>
        <Pressable
          style={[styles.rectangleGroup, styles.rectangleLayout]}
          onPress={() => navigation.navigate("FeedPage")}
        >
          <View style={[styles.rectangleView, styles.groupChildLayout]} />
          <Text style={[styles.login, styles.loginTypo]}>Login</Text>
        </Pressable>
        <PasswordSection
          passwordLabel="Password"
          passwordPlaceholder="Enter your password"
          onRectanglePressablePress={openRectangle2}
        />
        <EmailSection onRectanglePressablePress={openRectangle4} />
      </View>

      <Modal animationType="fade" transparent visible={rectangle2Visible}>
        <View style={styles.rectangle2Overlay}>
          <Pressable style={styles.rectangle2Bg} onPress={closeRectangle2} />
          <IOSAlphbeticKeyboardEngli onClose={closeRectangle2} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={rectangle4Visible}>
        <View style={styles.rectangle4Overlay}>
          <Pressable style={styles.rectangle4Bg} onPress={closeRectangle4} />
          <IOSAlphbeticKeyboardEngli onClose={closeRectangle4} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  loginPageBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  rectangleLayout: {
    height: 50,
    left: 15,
    width: 359,
    position: "absolute",
  },
  groupChildLayout: {
    borderRadius: 8,
    left: 0,
    top: 0,
    height: 50,
    width: 359,
    position: "absolute",
  },
  loginTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base_2,
    position: "absolute",
  },
  loginPosition: {
    width: 390,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 0,
    position: "absolute",
  },
  groupLayout: {
    height: 1,
    width: 155,
    borderTopWidth: 1,
    borderColor: Color.colorSilver,
    top: 12,
    position: "absolute",
    borderStyle: "solid",
  },
  orTypo: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_mini_1,
    position: "absolute",
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
  rectangle4Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  rectangle4Bg: {
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
  groupChild: {
    borderColor: Color.colorDarkorange_200,
    borderWidth: 1,
    borderStyle: "solid",
  },
  signupNow: {
    top: 13,
    left: 133,
    color: Color.colorDarkorange_200,
    width: 102,
  },
  rectangleParent: {
    top: 690,
  },
  loginIntoYour: {
    top: 219,
    left: 99,
    color: Color.colorDimgray,
  },
  loginPageChild: {
    height: 155,
    top: 0,
  },
  loginPageItem: {
    top: 21,
    height: 167,
  },
  groupItem: {
    left: 0,
    height: 1,
    width: 155,
    borderTopWidth: 1,
    borderColor: Color.colorSilver,
    top: 12,
  },
  groupInner: {
    left: 205,
  },
  or: {
    left: 171,
    color: Color.colorSilver,
    width: 25,
    top: 0,
  },
  lineParent: {
    top: 629,
    left: 16,
    height: 21,
    width: 359,
    position: "absolute",
  },
  forgotPassword: {
    top: 487,
    left: 137,
    textDecoration: "underline",
    color: "#1e2772",
    width: 127,
  },
  rectangleView: {
    backgroundColor: Color.colorDarkorange_200,
    shadowColor: "rgba(253, 116, 1, 0.3)",
    shadowOffset: {
      width: 0,
      height: 12.116715431213379,
    },
    shadowRadius: 24.23,
    elevation: 24.23,
    shadowOpacity: 1,
  },
  login: {
    top: 14,
    left: 135,
    color: Color.iOSFFFFFF,
    width: 106,
  },
  rectangleGroup: {
    top: 539,
  },
  loginPage: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.iOSFFFFFF,
    borderColor: Color.colorBlack,
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default LoginPage;
