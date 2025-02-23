import React from "react";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useThemeContext } from "@/context/themecontext";
import ThemeToggleButton from "@/components/themeToggleButton";
import { useTextStyles } from "@/config/textStyles";

interface HeaderProps {
  title: string;
  addToggleButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, addToggleButton = true }) => {
  const { theme } = useThemeContext();
  const router = useRouter();
  const textStyles = useTextStyles();

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.BackAction
        onPress={() => router.back()}
        color={theme.colors.text}
      />
      <Appbar.Content
        title={title}
        titleStyle={[textStyles?.subheading, { color: theme.colors.text }]}
      />
      {addToggleButton && <ThemeToggleButton onPress={() => {}} />}
    </Appbar.Header>
  );
};

export default Header;
