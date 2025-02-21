import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeContext } from '@/context/themecontext';
import { router } from 'expo-router';

const ForgotPasswordText: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
      <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
        Forgot your password?
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'right',
  },
});

export default ForgotPasswordText;