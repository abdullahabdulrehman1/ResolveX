import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeContext } from '@/context/themecontext';
import { router } from 'expo-router';

const SignInLink: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Already have an account?
      </Text>
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'gray',
  },
  linkText: {
    marginLeft: 5,
  },
});

export default SignInLink;