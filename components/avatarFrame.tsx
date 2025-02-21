import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface AvatarFrameProps {
  src: any;
  width: number;
  height: number;
}

export const AvatarFrame: React.FC<AvatarFrameProps> = ({ src, width, height }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={src} style={[styles.image, { width, height }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 24,
  },
});

export default AvatarFrame;