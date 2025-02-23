import { useThemeContext } from "@/context/themecontext";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

interface AnimatedTextInputProps {
  label: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  label,
  secureTextEntry = false,
  error,
  value,
  ...restProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderRadius: 24,
          overflow: "hidden",
        },
      ]}
    >
      <TextInput
        textColor={theme.colors.text}
        selectionColor={theme.colors.text}
        outlineStyle={{
          borderWidth: 1,
          borderColor: theme.colors.primary, // Set outline color to primary
          borderRadius: 24, // Ensure border radius is applied properly
        }}
        placeholderTextColor={theme.colors.primary} // Set placeholder text color to blue
        label={label}
        mode="outlined"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={isPasswordVisible ? "eye" : "eye-off"}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              color={theme.colors.text}
            />
          ) : null
        }
        theme={{
          colors: {
            primary: theme.colors.primary, // Blue when focused
            onSurfaceVariant: theme.colors.primary, // Ensures label is blue even when not focused
            placeholder: theme.colors.primary, // Placeholder text blue
          },
        }}
        style={[styles.input, { backgroundColor: theme.colors.background }]}
        
        value={value}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
  },
});

export default AnimatedTextInput;
