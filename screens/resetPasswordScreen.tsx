import AnimatedTextInput from "@/components/animatedTextInput";
import PrimaryButton from "@/components/primaryButton";
import OtpInput from "@/components/resetPassword/otpInput";
import Header from "@/components/signIn/header";
import Heading from "@/components/signIn/heading";
import { useTextStyles } from "@/config/textStyles";
import { useThemeContext } from "@/context/themecontext";
import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";

const ResetPasswordScreen = () => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [emailSent, setEmailSent] = useState(false);
  const otpRefs = useRef<(TextInput | null)[]>([]);
  const textStyles = useTextStyles();
  const handleSendOtp = () => {
    if (validateEmail(email)) setEmailSent(true);
  };

  const handleVerify = () => {
    // Verification logic
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFocusNext = (index: number) => {
    if (index < otpRefs.current.length) {
      otpRefs.current[index]?.focus();
    }
  };

  const handleFocusPrev = (index: number) => {
    if (index >= 0) {
      otpRefs.current[index]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Reset Password" addToggleButton={false} />
        <Animated.View
          entering={FadeInUp.duration(800)}
          style={[styles.content, { backgroundColor: theme.colors.background }]}
        >
          <Heading
            title="ResolveX"
            subtitle="Enter your email to receive OTP"
          />

          {/* Email Input using AnimatedTextField */}
          <View style={styles.emailContainer}>
            <AnimatedTextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
            />

            <PrimaryButton
              title="Send OTP"
              onPress={handleSendOtp}
              disabled={!validateEmail(email)}
              iconName="send"
              iconFamily="MaterialCommunityIcons"
            />
          </View>

          {/* OTP Input */}
          {emailSent && (
            <Animated.View
              entering={FadeInUp.duration(600)}
              style={styles.otpContainer}
            >
              <Text
                style={[
                  styles.otpTitle,
                  textStyles?.normalText,
                  { color: theme.colors.text },
                ]}
              >
                Enter 6-digit OTP
              </Text>

              <View style={styles.otpInputsContainer}>
                {otp.map((digit, index) => (
                  <OtpInput
                    key={index}
                    value={digit}
                    onChangeText={(text) => {
                      const newOtp = [...otp];
                      newOtp[index] = text;
                      setOtp(newOtp);
                    }}
                    index={index}
                    onFocusNext={handleFocusNext}
                    onFocusPrev={handleFocusPrev}
                    ref={(ref: TextInput | null) =>
                      (otpRefs.current[index] = ref)
                    }
                  />
                ))}
              </View>

              <PrimaryButton
                title="Verify"
                onPress={handleVerify}
                disabled={!otp.every((d) => d)}
                iconName="check"
                iconFamily="MaterialCommunityIcons"
              />
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  content: { marginTop: 10, alignItems: "center" },
  emailContainer: { width: "100%", marginBottom: 10 },
  otpContainer: { width: "100%", alignItems: "center", marginTop: 15 },
  otpTitle: { fontSize: 16, marginBottom: 15, fontWeight: "500" },
  otpInputsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default ResetPasswordScreen;
