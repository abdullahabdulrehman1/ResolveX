import AnimatedTextInput from "@/components/animatedTextInput";
import GoogleSignInButton from "@/components/googleSignInButton";
import PrimaryButton from "@/components/primaryButton";
import ErrorText from "@/components/signIn/errorText";
import Footer from "@/components/signIn/footer";
import ForgotPasswordText from "@/components/signIn/forgotPasswordText";
import Header from "@/components/signIn/header";
import Heading from "@/components/signIn/heading";

import { useThemeContext } from "@/context/themecontext";
import { handleSignIn } from "@/utils/signin/signInHandle";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";

const SignInScreen: React.FC = () => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
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
        {errors.email && <ErrorText message={errors.email} />}
        <AnimatedTextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />
        {errors.password && <ErrorText message={errors.password} />}
        <PrimaryButton
          title="Sign In"
          textColor="white"
          iconColor="white"
          onPress={() => handleSignIn(email, password, setErrors)}
          iconName="log-in"
          iconFamily="Feather"
        />
        <ForgotPasswordText />
        <Divider
          style={[styles.divider, { backgroundColor: theme.colors.primary }]}
        />
        <GoogleSignInButton
          title="Sign in with Google"
          onPress={() => {
            // Handle Google sign-in logic
          }}
        />
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  divider: {
    marginVertical: 10,
    alignSelf: "center",
    width: "30%",
  },
});

export default SignInScreen;
