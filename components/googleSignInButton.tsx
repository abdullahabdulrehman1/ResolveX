import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from "react-native";
import { useThemeContext } from "@/context/themecontext";
import { useTextStyles } from "@/config/textStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface GoogleSignInButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  const { theme } = useThemeContext();
  const scaleValue = new Animated.Value(1);
  const iconAnim = new Animated.Value(0);
  const textStyles = useTextStyles();

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.97,
        useNativeDriver: true,
      }),
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconScale = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleValue }], width: "100%" }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, { backgroundColor: theme.colors.primary }]} // Google blue color
      >
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <MaterialCommunityIcons
              name="google"
              size={24}
              color={theme.colors.border}
            />
          </Animated.View>
          <Text
            style={[
              textStyles?.boldText,
              { color: theme.colors.border, marginLeft: 8 },
            ]}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    overflow: "hidden",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GoogleSignInButton;
