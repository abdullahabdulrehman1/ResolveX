import React from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeContext } from "@/context/themecontext";
import { useTextStyles } from "@/config/textStyles";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  const { theme } = useThemeContext();
  const textStyles = useTextStyles();

  return (
    <>
      <Text
        style={[
          styles.title,
          textStyles?.heading,
          { color: theme.colors.primary },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          textStyles?.normalText,
          { color: theme.colors.text },
        ]}
      >
        {subtitle}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
   
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Heading;
