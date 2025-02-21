import AnimatedTextInput from "@/components/animatedTextInput";
import GoogleSignInButton from "@/components/googleSignInButton";
import PrimaryButton from "@/components/primaryButton";
import Header from "@/components/signIn/header";
import Heading from "@/components/signIn/heading";
import { useThemeContext } from "@/context/themecontext";
import { handleSignIn } from "@/utils/signin/signInHandle";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

const SignInScreen: React.FC = () => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Sign In" />
      <View style={styles.content}>
        <Heading title="ResolveX" subtitle="Complaint Management Solution" />
        <AnimatedTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <AnimatedTextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <PrimaryButton
          title="Sign In"
          textColor="white"
          iconColor="white"
          onPress={() => handleSignIn(email, password, setErrors)}
          iconName="log-in"
          iconFamily="Feather"
        />
        <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
          <Text
            style={[styles.forgotPasswordText, { color: theme.colors.primary }]}
          >
            Forgot your password?
          </Text>
        </TouchableOpacity>
        <Divider
          style={[styles.divider, { backgroundColor: theme.colors.primary }]}
        />
        <GoogleSignInButton
          title="Sign in with Google"
          onPress={() => {
            // Handle Google sign-in logic
          }}
        />
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.text }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={[styles.signUpText, { color: theme.colors.primary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPasswordText: {
    marginTop: 10,

    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "gray",
  },
  signUpText: {
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
  },
  divider: {
    marginVertical: 10,
    alignSelf: "center",
    width: "30%",
  },
});

export default SignInScreen;
