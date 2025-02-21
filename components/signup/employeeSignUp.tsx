import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedTextInput from '@/components/animatedTextInput';
import PrimaryButton from '@/components/primaryButton';

const EmployeeSignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <AnimatedTextInput label="Full Name" />
      <AnimatedTextInput label="Organization Name" />
      <AnimatedTextInput label="Email" />
      <AnimatedTextInput label="Password" secureTextEntry />
      <AnimatedTextInput label="Confirm Password" secureTextEntry />
      <PrimaryButton title="Sign Up" onPress={() => {}} iconName="user-plus" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default EmployeeSignUp;