import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeContext } from '@/context/themecontext';
import { router } from 'expo-router';

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <View style={styles.footer}>
      <Text style={[styles.footerText, { color: theme.colors.text }]}>
        Don't have an account?
      </Text>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={[styles.signUpText, { color: theme.colors.primary }]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'gray',
  },
  signUpText: {
    marginLeft: 5,
  },
});

export default Footer;