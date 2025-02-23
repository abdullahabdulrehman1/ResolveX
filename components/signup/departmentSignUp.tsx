import AnimatedTextInput from "@/components/animatedTextInput";
import PrimaryButton from "@/components/primaryButton";
import ErrorText from "@/components/signIn/errorText";
import { departmentSignUpSchema } from "@/schema/signUpSchema";
import { handleSignUp } from "@/utils/signUp/signUpHandler";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import OrganizationSelect from "./organizationSelect";

interface DepartmentSignUpProps {
  onSubmit: (data: any) => void;
}

const DepartmentSignUp: React.FC<DepartmentSignUpProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [organizations] = useState<string[]>([
    "Organization One",
    "Organization Two",
    "Organization Three",
    "Organization Four",
    "Organization Five",
    "Organization Siz",
    "Organization Seven",
    "Organization Eight",
    "Organization Nine",
    // Add more organizations here
  ]);

  const handleSubmit = async () => {
    const result = await handleSignUp(departmentSignUpSchema, {
      fullName,
      organizationName,
      email,
      password,
      department,
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

      <OrganizationSelect
        label="Select Organization"
        value={organizationName}
        onSelect={setOrganizationName}
        suggestions={organizations}
        error={errors.organizationName}
      />

      {errors.organizationName && (
        <ErrorText message={errors.organizationName} />
      )}
      <AnimatedTextInput
        label="Register Department Name"
        value={department}
        onChangeText={setDepartment}
      />
      {errors.department && <ErrorText message={errors.department} />}
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
    gap: 12, // Add spacing between elements
  },
});

export default DepartmentSignUp;
