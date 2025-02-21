import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import EmployeeSignUp from "@/components/signup/employeeSignUp";
import IndividualSignUp from "@/components/signup/individualSignUp";
import OrganizationSignUp from "@/components/signup/organizationSignUp";
import { useThemeContext } from "@/context/themecontext";
import Header from "@/components/signIn/header";
import Heading from "@/components/signIn/heading";
import CustomModal from "@/utils/signUp/customModal";
import { useTextStyles } from "@/config/textStyles";
import SignInLink from "@/components/signup/signInLink";
import ErrorText from "@/components/signIn/errorText";
import { z } from "zod";
import {
  individualSignUpSchema,
  organizationSignUpSchema,
  employeeSignUpSchema,
} from "./../schema/signUpSchema";

const SignUpScreen: React.FC = () => {
  const { theme } = useThemeContext();
  const [selectedRole, setSelectedRole] = useState("individual");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const textStyles = useTextStyles();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuItems = [
    {
      title: "Individual",
      onPress: () => {
        setSelectedRole("individual");
        closeMenu();
      },
    },
    {
      title: "Organization",
      onPress: () => {
        setSelectedRole("organization");
        closeMenu();
      },
    },
    {
      title: "Employee",
      onPress: () => {
        setSelectedRole("employee");
        closeMenu();
      },
    },
  ];

  const handleSignUp = (data: any) => {
    let schema;
    switch (selectedRole) {
      case "individual":
        schema = individualSignUpSchema;
        break;
      case "organization":
        schema = organizationSignUpSchema;
        break;
      case "employee":
        schema = employeeSignUpSchema;
        break;
      default:
        schema = individualSignUpSchema;
    }

    try {
      schema.parse(data);
      // Handle successful validation
    } catch (e) {
      if (e instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        e.errors.forEach((error) => {
          if (error.path && error.path.length > 0) {
            formattedErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Header title="Sign Up" />
      <Heading title="ResolveX" subtitle="Complaint Management Solution" />
      <Button
        style={[{ marginVertical: 20 }]}
        mode="outlined"
        onPress={openMenu}
        textColor={theme.colors.text}
        icon={visible ? "chevron-up" : "chevron-down"}
      >
        <Text style={[textStyles?.boldText, { color: theme.colors.text }]}>
          {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </Text>
      </Button>
      <CustomModal visible={visible} onDismiss={closeMenu} data={menuItems} />
      {selectedRole === "individual" && (
        <IndividualSignUp onSubmit={handleSignUp} />
      )}
      {selectedRole === "organization" && (
        <OrganizationSignUp onSubmit={handleSignUp} />
      )}
      {selectedRole === "employee" && (
        <EmployeeSignUp onSubmit={handleSignUp} />
      )}
      {Object.keys(errors).map((key) => (
        <ErrorText key={key} message={errors[key]} />
      ))}
      <SignInLink />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});

export default SignUpScreen;
