import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedTextInput from '@/components/animatedTextInput';
import PrimaryButton from '@/components/primaryButton';
import ErrorText from '@/components/signIn/errorText';
import { organizationSignUpSchema } from '@/schema/signUpSchema';
import { handleSignUp } from '@/utils/signUp/signUpHandler';
import AutocompleteTextInput from './autocompleteTextInput';

interface OrganizationSignUpProps {
  onSubmit: (data: any) => void;
}

const OrganizationSignUp: React.FC<OrganizationSignUpProps> = ({ onSubmit }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filteredOrganizations, setFilteredOrganizations] = useState<string[]>([]);
  const [organizations] = useState<string[]>([
    "Organization One",
    "Organization Two",
    "Organization Three",
    // Add more organizations here
  ]);

  const handleSubmit = async () => {
    const result = await handleSignUp(organizationSignUpSchema, { organizationName, email, password, confirmPassword, address });
    if (!result.success) {
      setErrors(result.errors || {});
    } else {
      setErrors({});
      onSubmit(result.data);
    }
  };

  const findOrganization = (query: string) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredOrganizations(organizations.filter((org) => org.search(regex) >= 0));
    } else {
      setFilteredOrganizations([]);
    }
    setOrganizationName(query);
  };

  return (
    <View style={styles.container}>
      <AutocompleteTextInput
        label="Organization Name"
        value={organizationName}
        onChangeText={findOrganization}
        suggestions={filteredOrganizations}
        onSuggestionPress={(suggestion) => {
          setOrganizationName(suggestion);
          setFilteredOrganizations([]);
        }}
        error={errors.organizationName}
      />
      {errors.organizationName && <ErrorText message={errors.organizationName} />}
      <AnimatedTextInput label="Email" value={email} onChangeText={setEmail} />
      {errors.email && <ErrorText message={errors.email} />}
      <AnimatedTextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {errors.password && <ErrorText message={errors.password} />}
      <AnimatedTextInput label="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      {errors.confirmPassword && <ErrorText message={errors.confirmPassword} />}
      <AnimatedTextInput label="Address" value={address} onChangeText={setAddress} />
      {errors.address && <ErrorText message={errors.address} />}
      <PrimaryButton title="Sign Up" iconColor='white' textColor='white' onPress={handleSubmit} iconName="user-plus" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default OrganizationSignUp;