import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageSourcePropType } from "react-native";

export type AtomsMediaImageType = {
  atomsMediaImageAtomsMedia?: ImageSourcePropType;

  /** Style props */
  atomsMediaImage2Position?: string;
  atomsMediaImage2Height?: number | string;
  atomsMediaImage2Top?: number | string;
  atomsMediaImage2Left?: number | string;
  atomsMediaImage2Width?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AtomsMediaImage = ({
  atomsMediaImageAtomsMedia,
  atomsMediaImage2Position,
  atomsMediaImage2Height,
  atomsMediaImage2Top,
  atomsMediaImage2Left,
  atomsMediaImage2Width,
}: AtomsMediaImageType) => {
  const atomsMediaImage2Style = useMemo(() => {
    return {
      ...getStyleValue("position", atomsMediaImage2Position),
      ...getStyleValue("height", atomsMediaImage2Height),
      ...getStyleValue("top", atomsMediaImage2Top),
      ...getStyleValue("left", atomsMediaImage2Left),
      ...getStyleValue("width", atomsMediaImage2Width),
    };
  }, [
    atomsMediaImage2Position,
    atomsMediaImage2Height,
    atomsMediaImage2Top,
    atomsMediaImage2Left,
    atomsMediaImage2Width,
  ]);

  return (
    <Image
      style={[styles.atomsMediaImage2, atomsMediaImage2Style]}
      contentFit="cover"
      source={atomsMediaImageAtomsMedia}
    />
  );
};

const styles = StyleSheet.create({
  atomsMediaImage2: {
    width: 457,
    height: 344,
  },
});

export default AtomsMediaImage;
