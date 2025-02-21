import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AnimatedTextInput from "@/components/animatedTextInput";
import PrimaryButton from "@/components/primaryButton";
import ErrorText from "@/components/signIn/errorText";
import { employeeSignUpSchema } from "@/schema/signUpSchema";
import { handleSignUp } from "@/utils/signUp/signUpHandler";

interface EmployeeSignUpProps {
  onSubmit: (data: any) => void;
}

const EmployeeSignUp: React.FC<EmployeeSignUpProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    const result = await handleSignUp(employeeSignUpSchema, {
      fullName,
      organizationName,
      email,
      password,
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
      <AnimatedTextInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <ErrorText message={errors.fullName} />}
      <AnimatedTextInput
        label="Organization Name"
        value={organizationName}
        onChangeText={setOrganizationName}
      />
      {errors.organizationName && <ErrorText message={errors.organizationName} />}
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

export default EmployeeSignUp;