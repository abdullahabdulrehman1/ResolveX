import { useThemeContext } from "@/context/themecontext";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

interface OtpInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  index: number;
  onFocusNext?: (index: number) => void;
  onFocusPrev?: (index: number) => void;
}

const OtpInput = forwardRef<TextInput, OtpInputProps>(
  ({ value, onChangeText, index, onFocusNext, onFocusPrev, ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const { theme } = useThemeContext();
    useImperativeHandle(ref, () => inputRef.current!);

    const handleChangeText = (text: string) => {
      onChangeText(text);
      if (text && onFocusNext) {
        onFocusNext(index + 1);
      }
    };

    const handleKeyPress = ({
      nativeEvent,
    }: {
      nativeEvent: { key: string };
    }) => {
      if (nativeEvent.key === "Backspace" && !value && onFocusPrev) {
        onFocusPrev(index - 1);
      }
    };

    return (
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          { borderColor: theme.colors.primary, color: theme.colors.text },
        ]}
        value={value}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        keyboardType="numeric"
        maxLength={1}
        {...props}
      />
    );
  }
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    width: width * 0.1, // 10% of screen width
    height: width * 0.15, // 15% of screen width
    borderWidth: 2,
    borderRadius: 10,
    textAlign: "center",
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "600",
    marginHorizontal: width * 0.02, // 2% of screen width
  },
});

export default OtpInput;
