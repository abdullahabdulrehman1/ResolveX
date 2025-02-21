import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedTextInput from '@/components/animatedTextInput';
import PrimaryButton from '@/components/primaryButton';

const OrganizationSignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <AnimatedTextInput label="Organization Name" />
      <AnimatedTextInput label="Email" />
      <AnimatedTextInput label="Password" secureTextEntry />
      <AnimatedTextInput label="Confirm Password" secureTextEntry />
      <AnimatedTextInput label="Address" />
      <PrimaryButton title="Sign Up" onPress={() => {}} iconName="user-plus" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default OrganizationSignUp;