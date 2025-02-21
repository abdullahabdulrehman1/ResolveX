import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AnimatedTextInput from "@/components/animatedTextInput";
import PrimaryButton from "@/components/primaryButton";
import ErrorText from "@/components/signIn/errorText";
import { individualSignUpSchema } from "@/schema/signUpSchema";
import { handleSignUp } from "@/utils/signUp/signUpHandler";

interface IndividualSignUpProps {
  onSubmit: (data: any) => void;
}

const IndividualSignUp: React.FC<IndividualSignUpProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    const result = await handleSignUp(individualSignUpSchema, {
      email,
      password,
      name,
      confirmPassword,
    });
    if (!result.success) {
      setErrors(result.errors || {});
    } else {
      setErrors({});
      onSubmit(result.data);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedTextInput label="Full Name" value={name} onChangeText={setName} />
      {errors.name && <ErrorText message={errors.name} />}
      <AnimatedTextInput label="Email" value={email} onChangeText={setEmail} />
      {errors.email && <ErrorText message={errors.email} />}
      <AnimatedTextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <ErrorText message={errors.password} />}
      <AnimatedTextInput
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && <ErrorText message={errors.confirmPassword} />}
      <PrimaryButton
        title="Sign Up"
        iconColor="white"
        textColor="white"
        onPress={handleSubmit}
        iconName="user-plus"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default IndividualSignUp;
