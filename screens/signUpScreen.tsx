import React, { useState } from "react";
import { View, StyleSheet, Picker } from "react-native";

const SignUpScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("individual");

  return (
    <View style={styles.container}>
      <Header title="Sign Up" />
      <Picker
        selectedValue={selectedRole}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Individual" value="individual" />
        <Picker.Item label="Organization" value="organization" />
        <Picker.Item label="Employee" value="employee" />
      </Picker>
      {selectedRole === "individual" && <IndividualSignUp />}
      {selectedRole === "organization" && <OrganizationSignUp />}
      {selectedRole === "employee" && <EmployeeSignUp />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    marginVertical: 16,
  },
});

export default SignUpScreen;
